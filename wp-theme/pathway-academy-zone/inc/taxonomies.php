<?php
/**
 * Taxonomies.
 *
 * @package PathwayAcademyZone
 */

if ( ! defined( 'ABSPATH' ) ) exit;

function paz_register_taxonomies() {
	register_taxonomy( 'paz_resource_category', 'paz_resource', array(
		'hierarchical' => true,
		'public'       => true,
		'show_in_rest' => true,
		'rewrite'      => array( 'slug' => 'knowledge-hub/topic' ),
		'labels'       => array(
			'name'          => __( 'Resource Categories', 'pathway-academy-zone' ),
			'singular_name' => __( 'Resource Category', 'pathway-academy-zone' ),
		),
	) );

	register_taxonomy( 'paz_programme_type', 'paz_programme', array(
		'hierarchical' => true,
		'public'       => true,
		'show_in_rest' => true,
		'labels'       => array(
			'name'          => __( 'Programme Types', 'pathway-academy-zone' ),
			'singular_name' => __( 'Programme Type', 'pathway-academy-zone' ),
		),
	) );

	register_taxonomy( 'paz_news_category', 'paz_news', array(
		'hierarchical' => true,
		'public'       => true,
		'show_in_rest' => true,
		'labels'       => array(
			'name'          => __( 'News Categories', 'pathway-academy-zone' ),
			'singular_name' => __( 'News Category', 'pathway-academy-zone' ),
		),
	) );

	register_taxonomy( 'paz_vacancy_department', 'paz_vacancy', array(
		'hierarchical' => true,
		'public'       => true,
		'show_in_rest' => true,
		'rewrite'      => array( 'slug' => 'vacancies/department' ),
		'labels'       => array(
			'name'          => __( 'Departments', 'pathway-academy-zone' ),
			'singular_name' => __( 'Department', 'pathway-academy-zone' ),
		),
	) );

	// Shared "areas we serve" taxonomy — applied to programme, resource, faq, vacancy, testimonial.
	register_taxonomy( 'paz_area_served', array( 'paz_programme', 'paz_resource', 'paz_faq', 'paz_vacancy', 'paz_testimonial' ), array(
		'hierarchical' => false,
		'public'       => true,
		'show_in_rest' => true,
		'rewrite'      => array( 'slug' => 'area-served', 'with_front' => false ),
		'labels'       => array(
			'name'          => __( 'Areas Served', 'pathway-academy-zone' ),
			'singular_name' => __( 'Area Served',  'pathway-academy-zone' ),
			'menu_name'     => __( 'Areas Served', 'pathway-academy-zone' ),
		),
	) );

	register_taxonomy( 'paz_faq_category', 'paz_faq', array(
		'hierarchical' => true,
		'public'       => true,
		'show_in_rest' => true,
		'rewrite'      => array( 'slug' => 'faq-category', 'with_front' => false ),
		'labels'       => array(
			'name'          => __( 'FAQ Categories', 'pathway-academy-zone' ),
			'singular_name' => __( 'FAQ Category',   'pathway-academy-zone' ),
		),
	) );

	register_taxonomy( 'paz_partner_type', 'paz_partner', array(
		'hierarchical' => true,
		'public'       => true,
		'show_in_rest' => true,
		'labels'       => array(
			'name'          => __( 'Partner Types', 'pathway-academy-zone' ),
			'singular_name' => __( 'Partner Type',  'pathway-academy-zone' ),
		),
	) );
}
add_action( 'init', 'paz_register_taxonomies' );

/**
 * Pre-seed the paz_area_served taxonomy with the 8 primary geographic areas.
 * Runs on init; skips insertion if terms already exist (idempotent).
 */
function paz_init_area_terms(): void {
	// Only run if the taxonomy is registered and has no terms yet.
	$count = wp_count_terms( array( 'taxonomy' => 'paz_area_served', 'hide_empty' => false ) );
	if ( is_wp_error( $count ) || $count > 0 ) {
		return;
	}

	$areas = array(
		'Stoke-on-Trent',
		'Newcastle-under-Lyme',
		'Stafford',
		'Cannock',
		'Lichfield',
		'Tamworth',
		'Wolverhampton',
		'Leek',
	);

	foreach ( $areas as $area_name ) {
		if ( ! term_exists( $area_name, 'paz_area_served' ) ) {
			wp_insert_term( $area_name, 'paz_area_served' );
		}
	}
}
add_action( 'init', 'paz_init_area_terms', 99 );
