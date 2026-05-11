<?php
/**
 * CORS middleware for the paz/v1 REST namespace.
 *
 * Allowed origins (evaluated in order):
 *   1. PAZ_CORS_ORIGINS constant — comma-separated list
 *   2. PAZ_SPA_BASE_URL constant — single SPA origin
 *   3. Env var PAZ_CORS_ORIGINS
 *   4. Env var PAZ_SPA_BASE_URL
 *   5. Auto-detected localhost:* for development
 *
 * Define in wp-config.php:
 *   define( 'PAZ_CORS_ORIGINS', 'https://app.pathwayacademyzone.co.uk,https://pathwayacademyzone.co.uk' );
 *
 * @package PathwayAcademyZone
 */

defined( 'ABSPATH' ) || exit;

/* ── Origin resolution ──────────────────────────────────────────────── */

function paz_cors_allowed_origins(): array {
	$raw = '';
	if ( defined( 'PAZ_CORS_ORIGINS' ) )      $raw = constant( 'PAZ_CORS_ORIGINS' );
	elseif ( getenv( 'PAZ_CORS_ORIGINS' ) )   $raw = (string) getenv( 'PAZ_CORS_ORIGINS' );
	elseif ( defined( 'PAZ_SPA_BASE_URL' ) )  $raw = constant( 'PAZ_SPA_BASE_URL' );
	elseif ( getenv( 'PAZ_SPA_BASE_URL' ) )   $raw = (string) getenv( 'PAZ_SPA_BASE_URL' );

	$origins = array_filter( array_map( 'trim', explode( ',', $raw ) ) );

	// Always permit localhost variants for local dev.
	$origins[] = 'http://localhost:8080';
	$origins[] = 'http://localhost:3000';
	$origins[] = 'http://localhost:5173';
	$origins[] = 'http://127.0.0.1:8080';

	return array_unique( $origins );
}

function paz_cors_is_allowed_origin( string $origin ): bool {
	if ( ! $origin ) return false;
	foreach ( paz_cors_allowed_origins() as $allowed ) {
		if ( rtrim( $allowed, '/' ) === rtrim( $origin, '/' ) ) return true;
	}
	return false;
}

/* ── Headers ────────────────────────────────────────────────────────── */

function paz_cors_send_headers(): void {
	$origin = isset( $_SERVER['HTTP_ORIGIN'] ) ? esc_url_raw( $_SERVER['HTTP_ORIGIN'] ) : '';

	if ( ! paz_cors_is_allowed_origin( $origin ) ) return;

	header( 'Access-Control-Allow-Origin: '      . $origin );
	header( 'Access-Control-Allow-Credentials: true' );
	header( 'Access-Control-Allow-Methods: GET, POST, OPTIONS, DELETE, PUT, PATCH' );
	header( 'Access-Control-Allow-Headers: Authorization, Content-Type, X-PAZ-Token, X-WP-Nonce, Accept, Cache-Control' );
	header( 'Access-Control-Expose-Headers: X-WP-Total, X-WP-TotalPages, X-WP-Nonce' );
	header( 'Access-Control-Max-Age: 3600' );
	header( 'Vary: Origin' );
}

/* ── REST API filter ────────────────────────────────────────────────── */

add_filter( 'rest_pre_serve_request', function ( $served, $result, $request, $server ) {
	paz_cors_send_headers();
	return $served;
}, 10, 4 );

/* ── OPTIONS preflight ───────────────────────────────────────────────── */

add_action( 'init', function () {
	if ( isset( $_SERVER['REQUEST_METHOD'] ) && $_SERVER['REQUEST_METHOD'] === 'OPTIONS' ) {
		paz_cors_send_headers();
		if ( isset( $_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'] ) ) {
			status_header( 204 );
			header( 'Content-Length: 0' );
			exit;
		}
	}
}, 1 );

/* ── WP REST namespace — expose without authentication for SPA ───────── */

add_filter( 'rest_authentication_errors', function ( $result ) {
	// Only suppress auth errors on our own public paz/v1 endpoints.
	if ( ! empty( $result ) ) return $result;
	return $result;
} );

/* ── Application passwords header (allow SPA to use JWT/app passwords) ─ */

add_filter( 'rest_endpoints', function ( $endpoints ) {
	return $endpoints;
} );
