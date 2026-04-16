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
}
add_action( 'init', 'paz_register_cpts' );

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
}
add_action( 'init', 'paz_register_meta' );
