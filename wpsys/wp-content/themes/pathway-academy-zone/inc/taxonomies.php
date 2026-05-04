<?php
/**
 * Taxonomies.
 *
 * @package PathwayAcademyZone
 */

if ( ! defined( 'ABSPATH' ) ) die();

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

	register_taxonomy( 'paz_faq_category', 'paz_faq', array(
		'hierarchical' => true,
		'public'       => true,
		'show_in_rest' => true,
		'labels'       => array(
			'name'          => __( 'FAQ Categories', 'pathway-academy-zone' ),
			'singular_name' => __( 'FAQ Category', 'pathway-academy-zone' ),
		),
	) );
}
add_action( 'init', 'paz_register_taxonomies' );
