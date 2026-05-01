<?php
/**
 * Custom REST API endpoints under the paz/v1 namespace.
 *
 * GET /wp-json/paz/v1/programmes   — programmes, ?area= filter
 * GET /wp-json/paz/v1/areas        — areas with programme count
 * GET /wp-json/paz/v1/faqs         — FAQs, ?area= / ?programme_id= filters
 * GET /wp-json/paz/v1/team         — team members
 * GET /wp-json/paz/v1/testimonials — testimonials
 * GET /wp-json/paz/v1/news         — news articles
 * GET /wp-json/paz/v1/vacancies    — job listings
 * GET /wp-json/paz/v1/partners     — partner organisations
 * GET /wp-json/paz/v1/centres      — centre locations
 * GET /wp-json/paz/v1/settings     — public site settings
 * GET /wp-json/paz/v1/search       — cross-CPT full-text search
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

	// ── Team ──────────────────────────────────────────────────────────────────
	register_rest_route( 'paz/v1', '/team', array(
		'methods'             => WP_REST_Server::READABLE,
		'callback'            => 'paz_rest_get_team',
		'permission_callback' => '__return_true',
		'args'                => array(
			'per_page' => array( 'type' => 'integer', 'default' => 20, 'sanitize_callback' => 'absint' ),
		),
	) );

	// ── Testimonials ───────────────────────────────────────────────────────────
	register_rest_route( 'paz/v1', '/testimonials', array(
		'methods'             => WP_REST_Server::READABLE,
		'callback'            => 'paz_rest_get_testimonials',
		'permission_callback' => '__return_true',
		'args'                => array(
			'per_page' => array( 'type' => 'integer', 'default' => 20, 'sanitize_callback' => 'absint' ),
		),
	) );

	// ── News ───────────────────────────────────────────────────────────────────
	register_rest_route( 'paz/v1', '/news', array(
		'methods'             => WP_REST_Server::READABLE,
		'callback'            => 'paz_rest_get_news',
		'permission_callback' => '__return_true',
		'args'                => array(
			'per_page' => array( 'type' => 'integer', 'default' => 9, 'maximum' => 50, 'sanitize_callback' => 'absint' ),
		),
	) );

	// ── Vacancies ──────────────────────────────────────────────────────────────
	register_rest_route( 'paz/v1', '/vacancies', array(
		'methods'             => WP_REST_Server::READABLE,
		'callback'            => 'paz_rest_get_vacancies',
		'permission_callback' => '__return_true',
	) );

	// ── Partners ───────────────────────────────────────────────────────────────
	register_rest_route( 'paz/v1', '/partners', array(
		'methods'             => WP_REST_Server::READABLE,
		'callback'            => 'paz_rest_get_partners',
		'permission_callback' => '__return_true',
	) );

	// ── Centres ────────────────────────────────────────────────────────────────
	register_rest_route( 'paz/v1', '/centres', array(
		'methods'             => WP_REST_Server::READABLE,
		'callback'            => 'paz_rest_get_centres',
		'permission_callback' => '__return_true',
	) );

	// ── Settings (public) ──────────────────────────────────────────────────────
	register_rest_route( 'paz/v1', '/settings', array(
		'methods'             => WP_REST_Server::READABLE,
		'callback'            => 'paz_rest_get_settings',
		'permission_callback' => '__return_true',
	) );

	// ── Search ─────────────────────────────────────────────────────────────────
	register_rest_route( 'paz/v1', '/search', array(
		'methods'             => WP_REST_Server::READABLE,
		'callback'            => 'paz_rest_search',
		'permission_callback' => '__return_true',
		'args'                => array(
			'q'        => array( 'type' => 'string', 'required' => true, 'sanitize_callback' => 'sanitize_text_field' ),
			'per_page' => array( 'type' => 'integer', 'default' => 10, 'maximum' => 50, 'sanitize_callback' => 'absint' ),
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

/* ── Helper: thumbnail URL ────────────────────────────────────────────── */

function paz_rest_thumbnail( int $post_id, string $size = 'paz-card' ): ?string {
	$url = get_the_post_thumbnail_url( $post_id, $size );
	return $url ?: null;
}

/**
 * GET /paz/v1/team
 */
function paz_rest_get_team( WP_REST_Request $req ): WP_REST_Response {
	$posts = get_posts( array(
		'post_type'      => 'paz_team',
		'posts_per_page' => $req->get_param( 'per_page' ),
		'post_status'    => 'publish',
		'orderby'        => 'menu_order title',
		'order'          => 'ASC',
		'no_found_rows'  => true,
	) );
	$data = array();
	foreach ( $posts as $p ) {
		$data[] = array(
			'id'        => $p->ID,
			'name'      => $p->post_title,
			'slug'      => $p->post_name,
			'role'      => (string) get_post_meta( $p->ID, 'paz_role', true ),
			'bio'       => wp_strip_all_tags( (string) $p->post_excerpt ),
			'image'     => paz_rest_thumbnail( $p->ID, 'medium' ),
			'is_exec'   => (bool) get_post_meta( $p->ID, 'paz_is_exec', true ),
			'permalink' => get_permalink( $p->ID ),
		);
	}
	return new WP_REST_Response( $data, 200 );
}

/**
 * GET /paz/v1/testimonials
 */
function paz_rest_get_testimonials( WP_REST_Request $req ): WP_REST_Response {
	$posts = get_posts( array(
		'post_type'      => 'paz_testimonial',
		'posts_per_page' => $req->get_param( 'per_page' ),
		'post_status'    => 'publish',
		'orderby'        => 'menu_order date',
		'order'          => 'DESC',
		'no_found_rows'  => true,
	) );
	$data = array();
	foreach ( $posts as $p ) {
		$data[] = array(
			'id'           => $p->ID,
			'author'       => $p->post_title,
			'slug'         => $p->post_name,
			'role'         => (string) get_post_meta( $p->ID, 'paz_role',         true ),
			'organisation' => (string) get_post_meta( $p->ID, 'paz_organisation', true ),
			'quote'        => wp_strip_all_tags( apply_filters( 'the_content', $p->post_content ) ),
			'rating'       => (int)    get_post_meta( $p->ID, 'paz_rating',       true ) ?: 5,
		);
	}
	return new WP_REST_Response( $data, 200 );
}

/**
 * GET /paz/v1/news
 */
function paz_rest_get_news( WP_REST_Request $req ): WP_REST_Response {
	$posts = get_posts( array(
		'post_type'      => 'paz_news',
		'posts_per_page' => $req->get_param( 'per_page' ),
		'post_status'    => 'publish',
		'orderby'        => 'date',
		'order'          => 'DESC',
		'no_found_rows'  => false,
	) );
	$data = array();
	foreach ( $posts as $p ) {
		$cats  = get_the_terms( $p->ID, 'paz_news_category' );
		$data[] = array(
			'id'         => $p->ID,
			'title'      => $p->post_title,
			'slug'       => $p->post_name,
			'excerpt'    => wp_strip_all_tags( $p->post_excerpt ),
			'date'       => get_the_date( 'Y-m-d', $p ),
			'image'      => paz_rest_thumbnail( $p->ID ),
			'permalink'  => get_permalink( $p->ID ),
			'categories' => ( $cats && ! is_wp_error( $cats ) ) ? wp_list_pluck( $cats, 'name' ) : array(),
		);
	}
	return new WP_REST_Response( $data, 200 );
}

/**
 * GET /paz/v1/vacancies
 */
function paz_rest_get_vacancies( WP_REST_Request $req ): WP_REST_Response {
	$posts = get_posts( array(
		'post_type'      => 'paz_vacancy',
		'posts_per_page' => 20,
		'post_status'    => 'publish',
		'orderby'        => 'date',
		'order'          => 'DESC',
		'no_found_rows'  => true,
	) );
	$data = array();
	foreach ( $posts as $p ) {
		$data[] = array(
			'id'           => $p->ID,
			'title'        => $p->post_title,
			'slug'         => $p->post_name,
			'department'   => (string) get_post_meta( $p->ID, 'paz_department',   true ),
			'location'     => (string) get_post_meta( $p->ID, 'paz_location',     true ) ?: 'Stoke-on-Trent',
			'type'         => (string) get_post_meta( $p->ID, 'paz_type',         true ) ?: 'Full Time',
			'salary'       => (string) get_post_meta( $p->ID, 'paz_salary',       true ),
			'closing_date' => (string) get_post_meta( $p->ID, 'paz_closing_date', true ),
			'excerpt'      => wp_strip_all_tags( $p->post_excerpt ),
			'permalink'    => get_permalink( $p->ID ),
		);
	}
	return new WP_REST_Response( $data, 200 );
}

/**
 * GET /paz/v1/partners
 */
function paz_rest_get_partners( WP_REST_Request $req ): WP_REST_Response {
	$posts = get_posts( array(
		'post_type'      => 'paz_partner',
		'posts_per_page' => 50,
		'post_status'    => 'publish',
		'orderby'        => 'menu_order title',
		'order'          => 'ASC',
		'no_found_rows'  => true,
	) );
	$data = array();
	foreach ( $posts as $p ) {
		$data[] = array(
			'id'       => $p->ID,
			'title'    => $p->post_title,
			'slug'     => $p->post_name,
			'category' => (string) get_post_meta( $p->ID, 'paz_category', true ),
			'website'  => (string) get_post_meta( $p->ID, 'paz_website',  true ),
			'logo'     => paz_rest_thumbnail( $p->ID, 'thumbnail' ),
			'excerpt'  => wp_strip_all_tags( $p->post_excerpt ),
		);
	}
	return new WP_REST_Response( $data, 200 );
}

/**
 * GET /paz/v1/centres
 */
function paz_rest_get_centres( WP_REST_Request $req ): WP_REST_Response {
	$posts = get_posts( array(
		'post_type'      => 'paz_centre',
		'posts_per_page' => 10,
		'post_status'    => 'publish',
		'orderby'        => 'menu_order title',
		'order'          => 'ASC',
		'no_found_rows'  => true,
	) );
	$data = array();
	foreach ( $posts as $p ) {
		$data[] = array(
			'id'        => $p->ID,
			'title'     => $p->post_title,
			'slug'      => $p->post_name,
			'address'   => (string) get_post_meta( $p->ID, 'paz_address', true ),
			'phone'     => (string) get_post_meta( $p->ID, 'paz_phone',   true ),
			'lat'       => (string) get_post_meta( $p->ID, 'paz_lat',     true ),
			'lng'       => (string) get_post_meta( $p->ID, 'paz_lng',     true ),
			'image'     => paz_rest_thumbnail( $p->ID ),
			'permalink' => get_permalink( $p->ID ),
		);
	}
	return new WP_REST_Response( $data, 200 );
}

/**
 * GET /paz/v1/settings
 */
function paz_rest_get_settings( WP_REST_Request $req ): WP_REST_Response {
	$ai_key   = defined( 'PAZ_OPENROUTER_API_KEY' ) ? (bool) constant( 'PAZ_OPENROUTER_API_KEY' ) : (bool) getenv( 'PAZ_OPENROUTER_API_KEY' );
	$local_ai = defined( 'PAZ_LOCAL_AI_URL' )       ? (bool) constant( 'PAZ_LOCAL_AI_URL' )       : (bool) getenv( 'PAZ_LOCAL_AI_URL' );
	$providers = array();
	if ( $ai_key )   $providers[] = 'openrouter';
	if ( $local_ai ) $providers[] = 'local-ai';

	return new WP_REST_Response( array(
		'contact_phone'      => (string) get_option( 'paz_contact_phone',      '01782 365365' ),
		'contact_email'      => (string) get_option( 'paz_contact_email',      'info@pathwayacademyzone.co.uk' ),
		'announcement_text'  => (string) get_option( 'paz_announcement_text',  '' ),
		'announcement_link'  => (string) get_option( 'paz_announcement_link',  '' ),
		'spa_base_url'       => defined( 'PAZ_SPA_BASE_URL' ) ? constant( 'PAZ_SPA_BASE_URL' ) : ( (string) getenv( 'PAZ_SPA_BASE_URL' ) ?: '' ),
		'ai_enabled'         => ! empty( $providers ),
		'ai_providers'       => $providers,
	), 200 );
}

/**
 * GET /paz/v1/search?q=
 */
function paz_rest_search( WP_REST_Request $req ): WP_REST_Response {
	$q        = $req->get_param( 'q' );
	$per_page = $req->get_param( 'per_page' );

	if ( strlen( $q ) < 2 ) {
		return new WP_REST_Response( array(), 200 );
	}

	$post_types = array( 'paz_programme', 'paz_faq', 'paz_resource', 'paz_news', 'paz_area', 'paz_team', 'page' );
	$posts = get_posts( array(
		'post_type'      => $post_types,
		'posts_per_page' => $per_page,
		'post_status'    => 'publish',
		's'              => $q,
		'no_found_rows'  => false,
	) );

	$data = array();
	foreach ( $posts as $p ) {
		$data[] = array(
			'id'        => $p->ID,
			'type'      => $p->post_type,
			'title'     => $p->post_title,
			'excerpt'   => wp_strip_all_tags( $p->post_excerpt ?: wp_trim_words( $p->post_content, 30 ) ),
			'permalink' => get_permalink( $p->ID ),
			'slug'      => $p->post_name,
		);
	}
	return new WP_REST_Response( $data, 200 );
}

/* ── Helper (used by areas endpoint) ────────────────────────────────── */

if ( ! function_exists( 'paz_get_programmes_for_area' ) ) {
	function paz_get_programmes_for_area( string $area_slug ): array {
		return get_posts( array(
			'post_type'      => 'paz_programme',
			'posts_per_page' => -1,
			'post_status'    => 'publish',
			'fields'         => 'ids',
			'no_found_rows'  => true,
			'tax_query'      => array( // phpcs:ignore
				array( 'taxonomy' => 'paz_area_served', 'field' => 'slug', 'terms' => $area_slug ),
			),
		) );
	}
}
