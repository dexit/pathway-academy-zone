<?php
/**
 * Branded email sending using compiled MJML HTML templates.
 *
 * Templates live in the SPA's dist output at:
 *   /path/to/dist/email-templates/<name>.html   (if building from source)
 * OR in the theme's bundled copy:
 *   inc/email-html/<name>.html
 *
 * Mustache-style {{placeholder}} tokens are replaced at send time.
 */

defined( 'ABSPATH' ) || exit;

/**
 * Load an MJML-compiled HTML email template and replace {{tokens}}.
 *
 * @param string               $template_name  e.g. "contact-admin"
 * @param array<string,string> $vars           token => value map
 * @return string|false  Rendered HTML or false if template not found.
 */
function paz_render_email( string $template_name, array $vars = [] ) {
	// Look in the theme-bundled directory first, then the SPA dist.
	$candidates = [
		PAZ_THEME_DIR . 'inc/email-html/' . $template_name . '.html',
		ABSPATH . '../dist/email-templates/' . $template_name . '.html',
	];

	$html = false;
	foreach ( $candidates as $path ) {
		if ( file_exists( $path ) ) {
			$html = file_get_contents( $path );
			break;
		}
	}

	if ( $html === false ) return false;

	foreach ( $vars as $token => $value ) {
		$html = str_replace( '{{' . $token . '}}', esc_html( (string) $value ), $html );
	}

	return $html;
}

/**
 * Send a branded HTML email.
 *
 * @param string               $to            Recipient address(es), comma-separated.
 * @param string               $subject
 * @param string               $template_name  MJML-compiled template slug.
 * @param array<string,string> $vars           Token replacements.
 * @param array                $extra_headers  Extra wp_mail headers.
 * @return bool
 */
function paz_send_email( string $to, string $subject, string $template_name, array $vars = [], array $extra_headers = [] ): bool {
	$html = paz_render_email( $template_name, $vars );
	if ( $html === false ) {
		// Fall back to plain text summary if template missing.
		$html = '<p>' . implode( '<br>', array_map(
			fn( $k, $v ) => esc_html( $k ) . ': ' . esc_html( $v ),
			array_keys( $vars ), array_values( $vars )
		) ) . '</p>';
	}

	$headers = array_merge(
		[ 'Content-Type: text/html; charset=UTF-8' ],
		$extra_headers
	);

	return wp_mail( $to, $subject, $html, $headers );
}

/* ── REST endpoint: /wp-json/paz/v1/send-email ──────────────────────── */
add_action( 'rest_api_init', function () {
	register_rest_route( 'paz/v1', '/send-email', [
		'methods'             => 'POST',
		'callback'            => 'paz_rest_send_email',
		'permission_callback' => function ( WP_REST_Request $request ) {
			$token = $request->get_header( 'X-PAZ-Token' );
			$expected = paz_get_smtp_setting( 'PAZ_REST_TOKEN', 'PAZ_REST_TOKEN' );
			return $expected && hash_equals( $expected, (string) $token );
		},
		'args' => [
			'form'    => [ 'required' => true, 'sanitize_callback' => 'sanitize_key' ],
			'payload' => [ 'required' => true ],
		],
	] );
} );

function paz_rest_send_email( WP_REST_Request $request ): WP_REST_Response {
	$form    = $request->get_param( 'form' );
	$payload = (array) $request->get_param( 'payload' );
	$admin   = paz_get_smtp_setting( 'PAZ_ADMIN_EMAIL', 'PAZ_ADMIN_EMAIL', get_option( 'admin_email' ) );
	$ts      = wp_date( 'd M Y \a\t H:i' );
	$ip      = $_SERVER['REMOTE_ADDR'] ?? 'unknown';

	$sent = false;

	switch ( $form ) {
		case 'contact':
			$vars = array_merge( $payload, [ 'timestamp' => $ts, 'ip' => $ip, 'source' => 'SPA contact form' ] );
			paz_send_email( $admin, 'New Contact Enquiry — ' . ( $payload['name'] ?? '' ), 'contact-admin', $vars );
			$sent = paz_send_email( $payload['email'] ?? '', 'Thank you for contacting Pathway Academy Zone', 'contact-reply', array_merge( $vars, [ 'firstName' => strtok( $payload['name'] ?? '', ' ' ) ] ) );
			break;

		case 'referral':
			$vars = array_merge( $payload, [ 'timestamp' => $ts ] );
			paz_send_email( $admin, 'New Referral — ' . ( $payload['ypName'] ?? '' ), 'referral-admin', $vars );
			$sent = paz_send_email( $payload['referrerEmail'] ?? '', 'Referral Received — Pathway Academy Zone', 'referral-reply', $vars );
			break;

		case 'careers':
			$vars = array_merge( $payload, [ 'timestamp' => $ts ] );
			paz_send_email( $admin, 'Speculative Application — ' . ( $payload['name'] ?? '' ), 'careers-admin', $vars );
			$firstName = strtok( $payload['name'] ?? '', ' ' );
			$lastName  = trim( str_replace( $firstName, '', $payload['name'] ?? '' ) );
			$sent = paz_send_email( $payload['email'] ?? '', 'Application Received — Pathway Academy Zone', 'careers-reply', array_merge( $vars, [ 'firstName' => $firstName, 'lastName' => $lastName ] ) );
			break;

		default:
			return new WP_REST_Response( [ 'success' => false, 'message' => 'Unknown form type.' ], 400 );
	}

	return new WP_REST_Response( [ 'success' => true ], 200 );
}
