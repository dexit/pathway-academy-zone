<?php
/**
 * Custom REST API endpoints under the paz/v1 namespace.
 *
 * GET /wp-json/paz/v1/programmes  — list programmes, optional ?area= filter
 * GET /wp-json/paz/v1/areas       — list all areas with programme count
 * GET /wp-json/paz/v1/faqs        — list FAQs, optional ?area= / ?programme_id= filter
 *
 * @package PathwayAcademyZone
 */

if ( ! defined( 'ABSPATH' ) ) exit;

add_action( 'rest_api_init', 'paz_register_rest_routes' );

function paz_register_rest_routes(): void {

	// ── Programmes ────────────────────────────────────────────────────────────
	register_rest_route( 'paz/v1', '/programmes', array(
		'methods'             => WP_REST_Server::READABLE,
		'callback'            => 'paz_rest_get_programmes',
		'permission_callback' => '__return_true',
		'args'                => array(
			'area'     => array(
				'type'              => 'string',
				'default'           => '',
				'sanitize_callback' => 'sanitize_title',
			),
			'per_page' => array(
				'type'              => 'integer',
				'default'           => 10,
				'minimum'           => 1,
				'maximum'           => 100,
				'sanitize_callback' => 'absint',
			),
		),
	) );

	// ── Areas ─────────────────────────────────────────────────────────────────
	register_rest_route( 'paz/v1', '/areas', array(
		'methods'             => WP_REST_Server::READABLE,
		'callback'            => 'paz_rest_get_areas',
		'permission_callback' => '__return_true',
	) );

	// ── FAQs ──────────────────────────────────────────────────────────────────
	register_rest_route( 'paz/v1', '/faqs', array(
		'methods'             => WP_REST_Server::READABLE,
		'callback'            => 'paz_rest_get_faqs',
		'permission_callback' => '__return_true',
		'args'                => array(
			'area'         => array(
				'type'              => 'string',
				'default'           => '',
				'sanitize_callback' => 'sanitize_title',
			),
			'programme_id' => array(
				'type'              => 'integer',
				'default'           => 0,
				'sanitize_callback' => 'absint',
			),
			'per_page'     => array(
				'type'              => 'integer',
				'default'           => 20,
				'minimum'           => 1,
				'maximum'           => 100,
				'sanitize_callback' => 'absint',
			),
		),
	) );
}

/**
 * GET /paz/v1/programmes
 */
function paz_rest_get_programmes( WP_REST_Request $req ): WP_REST_Response {
	$area     = $req->get_param( 'area' );
	$per_page = $req->get_param( 'per_page' );

	$args = array(
		'post_type'      => 'paz_programme',
		'posts_per_page' => $per_page,
		'post_status'    => 'publish',
		'orderby'        => 'menu_order title',
		'order'          => 'ASC',
		'no_found_rows'  => true,
	);
	if ( $area ) {
		$args['tax_query'] = array( // phpcs:ignore WordPress.DB.SlowDBQuery
			array(
				'taxonomy' => 'paz_area_served',
				'field'    => 'slug',
				'terms'    => $area,
			),
		);
	}

	$posts = get_posts( $args );
	$data  = array();
	foreach ( $posts as $p ) {
		$data[] = array(
			'id'        => $p->ID,
			'title'     => $p->post_title,
			'slug'      => $p->post_name,
			'subtitle'  => get_post_meta( $p->ID, 'paz_subtitle',  true ),
			'duration'  => get_post_meta( $p->ID, 'paz_duration',  true ),
			'key_stage' => get_post_meta( $p->ID, 'paz_key_stage', true ),
			'icon_name' => get_post_meta( $p->ID, 'paz_icon_name', true ),
			'colour'    => get_post_meta( $p->ID, 'paz_colour',    true ),
			'permalink' => get_permalink( $p->ID ),
		);
	}
	return new WP_REST_Response( $data, 200 );
}

/**
 * GET /paz/v1/areas
 */
function paz_rest_get_areas( WP_REST_Request $req ): WP_REST_Response {
	$posts = get_posts( array(
		'post_type'      => 'paz_area',
		'posts_per_page' => -1,
		'post_status'    => 'publish',
		'orderby'        => 'menu_order title',
		'order'          => 'ASC',
		'no_found_rows'  => true,
	) );

	$data = array();
	foreach ( $posts as $p ) {
		$programmes = paz_get_programmes_for_area( $p->post_name );
		$data[] = array(
			'id'              => $p->ID,
			'title'           => $p->post_title,
			'slug'            => $p->post_name,
			'region'          => get_post_meta( $p->ID, 'paz_region', true ),
			'lat'             => get_post_meta( $p->ID, 'paz_lat',    true ),
			'lng'             => get_post_meta( $p->ID, 'paz_lng',    true ),
			'permalink'       => get_permalink( $p->ID ),
			'programme_count' => count( $programmes ),
		);
	}
	return new WP_REST_Response( $data, 200 );
}

/**
 * GET /paz/v1/faqs
 */
function paz_rest_get_faqs( WP_REST_Request $req ): WP_REST_Response {
	$area         = $req->get_param( 'area' );
	$programme_id = $req->get_param( 'programme_id' );
	$per_page     = $req->get_param( 'per_page' );

	$args = array(
		'post_type'      => 'paz_faq',
		'posts_per_page' => $per_page,
		'post_status'    => 'publish',
		'orderby'        => 'menu_order title',
		'order'          => 'ASC',
		'no_found_rows'  => true,
	);

	$tax_query  = array();
	$meta_query = array();

	if ( $area ) {
		$tax_query[] = array(
			'taxonomy' => 'paz_area_served',
			'field'    => 'slug',
			'terms'    => $area,
		);
	}
	if ( $programme_id ) {
		$meta_query[] = array(
			'key'   => 'paz_programme_id',
			'value' => $programme_id,
		);
	}
	if ( $tax_query )  $args['tax_query']  = $tax_query;  // phpcs:ignore
	if ( $meta_query ) $args['meta_query'] = $meta_query; // phpcs:ignore

	$posts = get_posts( $args );
	$data  = array();
	foreach ( $posts as $p ) {
		$cats   = get_the_terms( $p->ID, 'paz_faq_category' );
		$data[] = array(
			'id'         => $p->ID,
			'question'   => $p->post_title,
			'answer'     => wp_strip_all_tags( apply_filters( 'the_content', $p->post_content ) ),
			'categories' => ( $cats && ! is_wp_error( $cats ) ) ? wp_list_pluck( $cats, 'name' ) : array(),
		);
	}
	return new WP_REST_Response( $data, 200 );
}
