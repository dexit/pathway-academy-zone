<?php
/**
 * SMTP configuration via PHPMailer.
 *
 * Set these constants in wp-config.php (or as server env vars):
 *
 *   define( 'PAZ_SMTP_HOST',     'smtp.example.com' );
 *   define( 'PAZ_SMTP_PORT',     587 );
 *   define( 'PAZ_SMTP_USER',     'noreply@pathwayacademyzone.co.uk' );
 *   define( 'PAZ_SMTP_PASS',     'your-smtp-password' );
 *   define( 'PAZ_SMTP_FROM',     'noreply@pathwayacademyzone.co.uk' );
 *   define( 'PAZ_SMTP_FROM_NAME', 'Pathway Academy Zone' );
 *   define( 'PAZ_ADMIN_EMAIL',   'info@pathwayacademyzone.co.uk' );
 *
 * Env-var fallback order: constant → getenv() → wp_mail default.
 */

defined( 'ABSPATH' ) || exit;

function paz_get_smtp_setting( string $const_name, string $env_name = '', $default = '' ) {
	if ( defined( $const_name ) ) return constant( $const_name );
	if ( $env_name && getenv( $env_name ) !== false ) return getenv( $env_name );
	return $default;
}

add_action( 'phpmailer_init', function ( PHPMailer\PHPMailer\PHPMailer $phpmailer ) {
	$host = paz_get_smtp_setting( 'PAZ_SMTP_HOST', 'PAZ_SMTP_HOST' );
	if ( ! $host ) return; // No SMTP configured — fall back to wp_mail default.

	$phpmailer->isSMTP();
	$phpmailer->Host       = $host;
	$phpmailer->Port       = (int) paz_get_smtp_setting( 'PAZ_SMTP_PORT', 'PAZ_SMTP_PORT', 587 );
	$phpmailer->SMTPAuth   = true;
	$phpmailer->Username   = paz_get_smtp_setting( 'PAZ_SMTP_USER', 'PAZ_SMTP_USER' );
	$phpmailer->Password   = paz_get_smtp_setting( 'PAZ_SMTP_PASS', 'PAZ_SMTP_PASS' );
	$phpmailer->SMTPSecure = PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_STARTTLS;
	$phpmailer->CharSet    = 'UTF-8';

	$from      = paz_get_smtp_setting( 'PAZ_SMTP_FROM',      'PAZ_SMTP_FROM',      'noreply@pathwayacademyzone.co.uk' );
	$from_name = paz_get_smtp_setting( 'PAZ_SMTP_FROM_NAME', 'PAZ_SMTP_FROM_NAME', 'Pathway Academy Zone' );

	$phpmailer->setFrom( $from, $from_name );
} );
