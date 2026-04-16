<?php
/**
 * Classic widget-area fallback so plugins / legacy widgets keep working
 * inside an otherwise FSE-only block theme. Every area is also available
 * as an FSE template part (see /parts/*.html) so site editors can pick
 * either workflow.
 *
 * @package PathwayAcademyZone
 */

if ( ! defined( 'ABSPATH' ) ) exit;

function paz_register_widget_areas() {
	$common = array(
		'before_widget' => '<section id="%1$s" class="widget %2$s">',
		'after_widget'  => '</section>',
		'before_title'  => '<h2 class="widget-title">',
		'after_title'   => '</h2>',
	);

	register_sidebar( array_merge( $common, array(
		'id'          => 'paz-sidebar-main',
		'name'        => __( 'Main Sidebar', 'pathway-academy-zone' ),
		'description' => __( 'Appears on pages that use the "Page with Sidebar" template.', 'pathway-academy-zone' ),
	) ) );

	register_sidebar( array_merge( $common, array(
		'id'          => 'paz-footer-1',
		'name'        => __( 'Footer Column 1', 'pathway-academy-zone' ),
	) ) );
	register_sidebar( array_merge( $common, array(
		'id'          => 'paz-footer-2',
		'name'        => __( 'Footer Column 2', 'pathway-academy-zone' ),
	) ) );
	register_sidebar( array_merge( $common, array(
		'id'          => 'paz-footer-3',
		'name'        => __( 'Footer Column 3', 'pathway-academy-zone' ),
	) ) );

	register_sidebar( array_merge( $common, array(
		'id'          => 'paz-announcement',
		'name'        => __( 'Announcement Bar', 'pathway-academy-zone' ),
		'description' => __( 'Slim notice above the main header.', 'pathway-academy-zone' ),
	) ) );
}
add_action( 'widgets_init', 'paz_register_widget_areas' );
