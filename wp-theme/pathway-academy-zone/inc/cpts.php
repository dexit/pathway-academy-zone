<?php
/**
 * Custom Post Types for Pathway Academy Zone.
 *
 * @package PathwayAcademyZone
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Shared defaults to keep each CPT FSE-friendly.
 */
function paz_cpt_defaults( $overrides = array() ) {
	return array_merge(
		array(
			'public'              => true,
			'publicly_queryable'  => true,
			'show_ui'             => true,
			'show_in_menu'        => true,
			'show_in_rest'        => true,
			'show_in_nav_menus'   => true,
			'menu_position'       => 20,
			'hierarchical'        => false,
			'has_archive'         => true,
			'rewrite'             => array( 'with_front' => false ),
			'capability_type'     => 'post',
			'supports'            => array( 'title', 'editor', 'excerpt', 'thumbnail', 'custom-fields', 'revisions', 'page-attributes' ),
			'template_lock'       => false,
		),
		$overrides
	);
}

function paz_register_cpts() {
	register_post_type( 'paz_team', paz_cpt_defaults( array(
		'labels' => array(
			'name'               => __( 'Team', 'pathway-academy-zone' ),
			'singular_name'      => __( 'Team Member', 'pathway-academy-zone' ),
			'add_new_item'       => __( 'Add New Team Member', 'pathway-academy-zone' ),
			'edit_item'          => __( 'Edit Team Member', 'pathway-academy-zone' ),
			'menu_name'          => __( 'Team', 'pathway-academy-zone' ),
		),
		'menu_icon' => 'dashicons-groups',
		'rewrite'   => array( 'slug' => 'team', 'with_front' => false ),
	) ) );

	register_post_type( 'paz_programme', paz_cpt_defaults( array(
		'labels' => array(
			'name'          => __( 'Programmes', 'pathway-academy-zone' ),
			'singular_name' => __( 'Programme', 'pathway-academy-zone' ),
			'menu_name'     => __( 'Programmes', 'pathway-academy-zone' ),
		),
		'menu_icon' => 'dashicons-welcome-learn-more',
		'rewrite'   => array( 'slug' => 'programmes', 'with_front' => false ),
	) ) );

	register_post_type( 'paz_centre', paz_cpt_defaults( array(
		'labels' => array(
			'name'          => __( 'Centres', 'pathway-academy-zone' ),
			'singular_name' => __( 'Centre', 'pathway-academy-zone' ),
			'menu_name'     => __( 'Centres', 'pathway-academy-zone' ),
		),
		'menu_icon' => 'dashicons-location-alt',
		'rewrite'   => array( 'slug' => 'centres', 'with_front' => false ),
	) ) );

	register_post_type( 'paz_policy', paz_cpt_defaults( array(
		'labels' => array(
			'name'          => __( 'Policies', 'pathway-academy-zone' ),
			'singular_name' => __( 'Policy', 'pathway-academy-zone' ),
			'menu_name'     => __( 'Policies', 'pathway-academy-zone' ),
		),
		'menu_icon' => 'dashicons-shield-alt',
		'rewrite'   => array( 'slug' => 'policies', 'with_front' => false ),
	) ) );

	register_post_type( 'paz_resource', paz_cpt_defaults( array(
		'labels' => array(
			'name'          => __( 'Resources', 'pathway-academy-zone' ),
			'singular_name' => __( 'Resource', 'pathway-academy-zone' ),
			'menu_name'     => __( 'Knowledge Hub', 'pathway-academy-zone' ),
		),
		'menu_icon' => 'dashicons-book-alt',
		'rewrite'   => array( 'slug' => 'knowledge-hub', 'with_front' => false ),
	) ) );

	register_post_type( 'paz_news', paz_cpt_defaults( array(
		'labels' => array(
			'name'          => __( 'News', 'pathway-academy-zone' ),
			'singular_name' => __( 'News Item', 'pathway-academy-zone' ),
			'menu_name'     => __( 'News', 'pathway-academy-zone' ),
		),
		'menu_icon' => 'dashicons-megaphone',
		'rewrite'   => array( 'slug' => 'news', 'with_front' => false ),
	) ) );

	/**
	 * Vacancies / Careers — job postings with full Google JobPosting schema
	 * support via paz_* meta fields (see paz_register_meta below).
	 */
	register_post_type( 'paz_vacancy', paz_cpt_defaults( array(
		'labels' => array(
			'name'               => __( 'Vacancies', 'pathway-academy-zone' ),
			'singular_name'      => __( 'Vacancy', 'pathway-academy-zone' ),
			'add_new_item'       => __( 'Add New Vacancy', 'pathway-academy-zone' ),
			'edit_item'          => __( 'Edit Vacancy', 'pathway-academy-zone' ),
			'menu_name'          => __( 'Careers', 'pathway-academy-zone' ),
		),
		'menu_icon' => 'dashicons-businessperson',
		'rewrite'   => array( 'slug' => 'vacancies', 'with_front' => false ),
	) ) );

	register_post_type( 'paz_area', paz_cpt_defaults( array(
		'labels'   => array( 'name' => __( 'Areas', 'pathway-academy-zone' ), 'singular_name' => __( 'Area', 'pathway-academy-zone' ), 'menu_name' => __( 'Areas', 'pathway-academy-zone' ) ),
		'menu_icon'=> 'dashicons-location-alt',
		'rewrite'  => array( 'slug' => 'alternative-provision', 'with_front' => false ),
		'supports' => array( 'title', 'editor', 'excerpt', 'thumbnail', 'custom-fields', 'revisions', 'page-attributes' ),
	) ) );

	register_post_type( 'paz_faq', paz_cpt_defaults( array(
		'labels'   => array( 'name' => __( 'FAQs', 'pathway-academy-zone' ), 'singular_name' => __( 'FAQ', 'pathway-academy-zone' ), 'menu_name' => __( 'FAQs', 'pathway-academy-zone' ) ),
		'menu_icon'=> 'dashicons-editor-help',
		'rewrite'  => array( 'slug' => 'faqs', 'with_front' => false ),
		'has_archive' => true,
		'supports' => array( 'title', 'editor', 'custom-fields', 'page-attributes' ),
	) ) );

	register_post_type( 'paz_testimonial', paz_cpt_defaults( array(
		'labels'   => array( 'name' => __( 'Testimonials', 'pathway-academy-zone' ), 'singular_name' => __( 'Testimonial', 'pathway-academy-zone' ), 'menu_name' => __( 'Testimonials', 'pathway-academy-zone' ) ),
		'menu_icon'=> 'dashicons-format-quote',
		'rewrite'  => array( 'slug' => 'testimonials', 'with_front' => false ),
		'supports' => array( 'title', 'editor', 'thumbnail', 'custom-fields', 'page-attributes' ),
	) ) );

	register_post_type( 'paz_partner', paz_cpt_defaults( array(
		'labels'   => array( 'name' => __( 'Partners', 'pathway-academy-zone' ), 'singular_name' => __( 'Partner', 'pathway-academy-zone' ), 'menu_name' => __( 'Partners', 'pathway-academy-zone' ) ),
		'menu_icon'=> 'dashicons-networking',
		'rewrite'  => array( 'slug' => 'partners', 'with_front' => false ),
		'has_archive' => true,
		'supports' => array( 'title', 'editor', 'excerpt', 'thumbnail', 'custom-fields' ),
	) ) );
}
add_action( 'init', 'paz_register_cpts' );

// ---------------------------------------------------------------------------
// Admin columns for paz_area
// ---------------------------------------------------------------------------

/**
 * Add custom columns to the paz_area list table.
 *
 * @param array $columns Existing columns.
 * @return array Modified columns.
 */
function paz_area_columns( array $columns ): array {
	$columns['paz_region']      = __( 'Region', 'pathway-academy-zone' );
	$columns['paz_nearby_areas'] = __( 'Nearby Areas', 'pathway-academy-zone' );
	return $columns;
}
add_filter( 'manage_paz_area_posts_columns', 'paz_area_columns' );

/**
 * Render custom column cells for paz_area.
 *
 * @param string $column  Column slug.
 * @param int    $post_id Post ID.
 */
function paz_area_column_content( string $column, int $post_id ): void {
	if ( 'paz_region' === $column ) {
		echo esc_html( get_post_meta( $post_id, 'paz_region', true ) ?: '—' );
	}
	if ( 'paz_nearby_areas' === $column ) {
		echo esc_html( get_post_meta( $post_id, 'paz_nearby_areas', true ) ?: '—' );
	}
}
add_action( 'manage_paz_area_posts_custom_column', 'paz_area_column_content', 10, 2 );

// ---------------------------------------------------------------------------
// Admin columns for paz_faq
// ---------------------------------------------------------------------------

/**
 * Add custom columns to the paz_faq list table.
 *
 * @param array $columns Existing columns.
 * @return array Modified columns.
 */
function paz_faq_columns( array $columns ): array {
	$columns['paz_faq_categories']  = __( 'Categories', 'pathway-academy-zone' );
	$columns['paz_faq_programme']   = __( 'Related Programme', 'pathway-academy-zone' );
	return $columns;
}
add_filter( 'manage_paz_faq_posts_columns', 'paz_faq_columns' );

/**
 * Render custom column cells for paz_faq.
 *
 * @param string $column  Column slug.
 * @param int    $post_id Post ID.
 */
function paz_faq_column_content( string $column, int $post_id ): void {
	if ( 'paz_faq_categories' === $column ) {
		$terms = get_the_terms( $post_id, 'paz_faq_category' );
		if ( $terms && ! is_wp_error( $terms ) ) {
			echo esc_html( implode( ', ', wp_list_pluck( $terms, 'name' ) ) );
		} else {
			echo '—';
		}
	}
	if ( 'paz_faq_programme' === $column ) {
		$programme_id = absint( get_post_meta( $post_id, 'paz_programme_id', true ) );
		if ( $programme_id ) {
			echo esc_html( get_the_title( $programme_id ) ?: '#' . $programme_id );
		} else {
			echo '—';
		}
	}
}
add_action( 'manage_paz_faq_posts_custom_column', 'paz_faq_column_content', 10, 2 );

/**
 * Meta fields (exposed to REST + the block editor).
 */
function paz_register_meta() {
	$string = array( 'type' => 'string', 'single' => true, 'show_in_rest' => true, 'auth_callback' => '__return_true' );

	register_post_meta( 'paz_team',     'paz_role',     $string );
	register_post_meta( 'paz_team',     'paz_email',    $string );

	register_post_meta( 'paz_programme','paz_subtitle', $string );
	register_post_meta( 'paz_programme','paz_duration', $string );
	register_post_meta( 'paz_programme','paz_key_stage',$string );

	register_post_meta( 'paz_centre',   'paz_address',  $string );
	register_post_meta( 'paz_centre',   'paz_phone',    $string );
	register_post_meta( 'paz_centre',   'paz_map_url',  $string );

	register_post_meta( 'paz_policy',   'paz_document', $string );
	register_post_meta( 'paz_policy',   'paz_version',  $string );
	register_post_meta( 'paz_policy',   'paz_reviewed', $string );

	register_post_meta( 'paz_resource', 'paz_read_time',$string );
	register_post_meta( 'paz_resource', 'paz_summary',  $string );

	// paz_area fields
	register_post_meta( 'paz_area', 'paz_lat',           $string );
	register_post_meta( 'paz_area', 'paz_lng',           $string );
	register_post_meta( 'paz_area', 'paz_hero_headline', $string );
	register_post_meta( 'paz_area', 'paz_hero_body',     $string );
	register_post_meta( 'paz_area', 'paz_region',        $string ); // e.g. "Staffordshire"
	register_post_meta( 'paz_area', 'paz_nearby_areas',  // comma-separated area slugs
		array_merge( $string, array( 'description' => 'Comma-separated area slugs for cross-links.' ) ) );

	// paz_programme extra fields
	register_post_meta( 'paz_programme', 'paz_icon_name',      $string ); // dashicon or lucide name
	register_post_meta( 'paz_programme', 'paz_colour',         $string ); // hex or CSS var
	register_post_meta( 'paz_programme', 'paz_age_range',      $string ); // e.g. "11-16"
	register_post_meta( 'paz_programme', 'paz_outcomes',       $string ); // JSON array of strings
	register_post_meta( 'paz_programme', 'paz_certifications', $string ); // JSON array of strings
	register_post_meta( 'paz_programme', 'paz_key_stages',     $string ); // e.g. "KS3,KS4"

	// paz_testimonial fields
	register_post_meta( 'paz_testimonial', 'paz_author_name',  $string );
	register_post_meta( 'paz_testimonial', 'paz_author_role',  $string );
	register_post_meta( 'paz_testimonial', 'paz_school',       $string );
	register_post_meta( 'paz_testimonial', 'paz_programme_id', $string ); // post ID as string
	register_post_meta( 'paz_testimonial', 'paz_rating',       $string ); // 1-5

	// paz_partner fields
	register_post_meta( 'paz_partner', 'paz_website_url',  $string );
	register_post_meta( 'paz_partner', 'paz_partner_type', $string ); // "school" | "ngo" | "employer" | "la"
	register_post_meta( 'paz_partner', 'paz_logo_url',     $string );

	// paz_team extra fields
	register_post_meta( 'paz_team', 'paz_centre_id',    $string ); // post ID
	register_post_meta( 'paz_team', 'paz_linkedin_url', $string );
	register_post_meta( 'paz_team', 'paz_bio_short',    $string );

	// paz_centre extra fields
	register_post_meta( 'paz_centre', 'paz_lat',           $string );
	register_post_meta( 'paz_centre', 'paz_lng',           $string );
	register_post_meta( 'paz_centre', 'paz_opening_hours', $string ); // JSON array of {day, opens, closes}

	// JobPosting schema fields — all optional, all REST-exposed.
	register_post_meta( 'paz_vacancy',  'paz_job_location_type', $string ); // "TELECOMMUTE" | "" (on-site)
	register_post_meta( 'paz_vacancy',  'paz_job_city',          $string );
	register_post_meta( 'paz_vacancy',  'paz_job_region',        $string );
	register_post_meta( 'paz_vacancy',  'paz_job_postcode',      $string );
	register_post_meta( 'paz_vacancy',  'paz_job_country',       $string );
	register_post_meta( 'paz_vacancy',  'paz_job_employment_type', $string ); // FULL_TIME | PART_TIME | CONTRACTOR | TEMPORARY | INTERN | VOLUNTEER | PER_DIEM | OTHER
	register_post_meta( 'paz_vacancy',  'paz_job_salary_min',    $string );
	register_post_meta( 'paz_vacancy',  'paz_job_salary_max',    $string );
	register_post_meta( 'paz_vacancy',  'paz_job_salary_currency', $string ); // e.g. "GBP"
	register_post_meta( 'paz_vacancy',  'paz_job_salary_unit',   $string ); // HOUR | DAY | WEEK | MONTH | YEAR
	register_post_meta( 'paz_vacancy',  'paz_job_valid_through', $string ); // ISO-8601 date
	register_post_meta( 'paz_vacancy',  'paz_job_apply_url',     $string );
}
add_action( 'init', 'paz_register_meta' );
