<?php
/**
 * Register every theme-bundled dynamic block via block.json.
 *
 * v1 feature blocks: key-policies, referral-journey, stat-grid, team-grid,
 * values-timeline, approach-cards.
 *
 * v2 enhancement + SEO/UX blocks: accordion-faq, icon-grid, quote-card,
 * timeline, breadcrumbs, summary, reading-time, related-content,
 * webhook-form, skeleton-loader.
 *
 * @package PathwayAcademyZone
 */

if ( ! defined( 'ABSPATH' ) ) exit;

function paz_register_blocks() {
	$blocks = array(
		// v1 feature blocks
		'key-policies',
		'referral-journey',
		'stat-grid',
		'team-grid',
		'values-timeline',
		'approach-cards',
		// v2 enhancement blocks
		'accordion-faq',
		'icon-grid',
		'quote-card',
		'timeline',
		'breadcrumbs',
		// SEO / UX blocks (v22 review)
		'summary',
		'reading-time',
		'related-content',
		'webhook-form',
		'skeleton-loader',
	);
	foreach ( $blocks as $block ) {
		$dir = PAZ_THEME_DIR . 'blocks/' . $block;
		if ( file_exists( $dir . '/block.json' ) ) {
			register_block_type( $dir );
		}
	}
}
add_action( 'init', 'paz_register_blocks' );

/**
 * Dedicated inserter category.
 */
function paz_block_categories( $categories ) {
	return array_merge(
		array(
			array(
				'slug'  => 'pazone',
				'title' => __( 'Pathway Academy Zone', 'pathway-academy-zone' ),
				'icon'  => 'welcome-learn-more',
			),
		),
		$categories
	);
}
add_filter( 'block_categories_all', 'paz_block_categories' );

/**
 * Shared block stylesheet kept in sync between front-end and editor.
 */
function paz_enqueue_block_styles() {
	$rel  = 'assets/blocks.css';
	$path = PAZ_THEME_DIR . $rel;
	if ( ! file_exists( $path ) ) return;
	wp_enqueue_style( 'paz-blocks', PAZ_THEME_URI . $rel, array(), filemtime( $path ) );
}
add_action( 'wp_enqueue_scripts', 'paz_enqueue_block_styles' );
add_action( 'enqueue_block_editor_assets', 'paz_enqueue_block_styles' );

/**
 * Server-side handler for the pazone/webhook-form block. Supports POST/GET
 * with url-encoded, JSON, or query-string payloads. The action URL is
 * forwarded to any external endpoint (Make.com, Zapier, HubSpot, n8n,
 * custom Cloudflare Worker, etc.). Returns JSON.
 */
function paz_handle_webhook_form() {
	check_ajax_referer( 'paz_webhook_form', '_nonce' );

	$target   = isset( $_POST['_target'] )   ? esc_url_raw( wp_unslash( $_POST['_target'] ) )   : '';
	$method   = isset( $_POST['_method'] )   ? strtoupper( sanitize_key( $_POST['_method'] ) )  : 'POST';
	$encoding = isset( $_POST['_encoding'] ) ? sanitize_key( $_POST['_encoding'] )              : 'form';
	if ( ! $target ) wp_send_json_error( array( 'message' => 'Missing target URL.' ), 400 );
	if ( ! in_array( $method, array( 'POST', 'GET', 'PUT', 'PATCH', 'DELETE' ), true ) ) {
		wp_send_json_error( array( 'message' => 'Unsupported method.' ), 400 );
	}

	// Collect only the actual form fields (strip our underscore-prefixed ones).
	$payload = array();
	foreach ( $_POST as $k => $v ) {
		if ( '_' === substr( $k, 0, 1 ) ) continue;
		$payload[ sanitize_key( $k ) ] = is_array( $v ) ? array_map( 'sanitize_text_field', wp_unslash( $v ) ) : sanitize_text_field( wp_unslash( $v ) );
	}
	$payload['_source']    = home_url( $_SERVER['REQUEST_URI'] ?? '/' );
	$payload['_timestamp'] = current_time( 'c' );

	$args = array( 'method' => $method, 'timeout' => 15, 'headers' => array( 'Accept' => 'application/json' ) );

	if ( 'GET' === $method ) {
		$target = add_query_arg( array_map( 'urlencode', $payload ), $target );
	} elseif ( 'json' === $encoding ) {
		$args['headers']['Content-Type'] = 'application/json';
		$args['body'] = wp_json_encode( $payload );
	} elseif ( 'query' === $encoding ) {
		$target = add_query_arg( array_map( 'urlencode', $payload ), $target );
	} else {
		$args['headers']['Content-Type'] = 'application/x-www-form-urlencoded';
		$args['body'] = $payload;
	}

	$response = wp_remote_request( $target, $args );
	if ( is_wp_error( $response ) ) {
		wp_send_json_error( array( 'message' => $response->get_error_message() ), 502 );
	}
	$code = wp_remote_retrieve_response_code( $response );
	if ( $code >= 400 ) {
		wp_send_json_error( array( 'message' => 'Upstream error', 'code' => $code ), 502 );
	}
	wp_send_json_success( array( 'ok' => true, 'code' => $code ) );
}
add_action( 'wp_ajax_paz_webhook_form',        'paz_handle_webhook_form' );
add_action( 'wp_ajax_nopriv_paz_webhook_form', 'paz_handle_webhook_form' );
