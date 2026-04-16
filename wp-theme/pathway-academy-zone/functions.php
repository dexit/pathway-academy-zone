<?php
/**
 * Pathway Academy Zone — FSE block theme bootstrap.
 *
 * @package PathwayAcademyZone
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! defined( 'PAZ_THEME_VERSION' ) ) {
	define( 'PAZ_THEME_VERSION', '1.0.0' );
}
if ( ! defined( 'PAZ_THEME_DIR' ) ) {
	define( 'PAZ_THEME_DIR', trailingslashit( get_stylesheet_directory() ) );
}
if ( ! defined( 'PAZ_THEME_URI' ) ) {
	define( 'PAZ_THEME_URI', trailingslashit( get_stylesheet_directory_uri() ) );
}

/**
 * Theme supports, nav menus, and image sizes.
 */
function paz_theme_setup() {
	add_theme_support( 'title-tag' );
	add_theme_support( 'post-thumbnails' );
	add_theme_support( 'automatic-feed-links' );
	add_theme_support( 'html5', array( 'search-form', 'comment-form', 'comment-list', 'gallery', 'caption', 'script', 'style', 'navigation-widgets' ) );
	add_theme_support( 'responsive-embeds' );
	add_theme_support( 'editor-styles' );
	add_theme_support( 'wp-block-styles' );
	add_theme_support( 'align-wide' );
	add_theme_support( 'custom-logo', array(
		'height'      => 60,
		'width'       => 200,
		'flex-height' => true,
		'flex-width'  => true,
	) );

	register_nav_menus( array(
		'primary'   => __( 'Primary Menu', 'pathway-academy-zone' ),
		'footer'    => __( 'Footer Menu', 'pathway-academy-zone' ),
		'resources' => __( 'Resources Dropdown', 'pathway-academy-zone' ),
	) );

	add_image_size( 'paz-card',  800, 600, true );
	add_image_size( 'paz-hero', 1920, 1080, true );

	load_theme_textdomain( 'pathway-academy-zone', PAZ_THEME_DIR . 'languages' );
}
add_action( 'after_setup_theme', 'paz_theme_setup' );

/**
 * Enqueue Plus Jakarta Sans + theme stylesheet.
 */
function paz_theme_assets() {
	wp_enqueue_style(
		'paz-fonts',
		'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap',
		array(),
		null
	);
	wp_enqueue_style(
		'paz-style',
		get_stylesheet_uri(),
		array( 'paz-fonts' ),
		PAZ_THEME_VERSION
	);
}
add_action( 'wp_enqueue_scripts', 'paz_theme_assets' );

/**
 * Editor assets match front-end assets so FSE previews are accurate.
 */
function paz_editor_assets() {
	wp_enqueue_style(
		'paz-fonts-editor',
		'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap',
		array(),
		null
	);
}
add_action( 'enqueue_block_editor_assets', 'paz_editor_assets' );

require_once PAZ_THEME_DIR . 'inc/cpts.php';
require_once PAZ_THEME_DIR . 'inc/taxonomies.php';
require_once PAZ_THEME_DIR . 'inc/blocks.php';
require_once PAZ_THEME_DIR . 'inc/patterns.php';
require_once PAZ_THEME_DIR . 'inc/sidebars.php';
require_once PAZ_THEME_DIR . 'inc/compat.php';
require_once PAZ_THEME_DIR . 'inc/demo-importer.php';
require_once PAZ_THEME_DIR . 'inc/schema.php';

/**
 * Convenience: give block patterns their own category.
 */
function paz_register_pattern_categories() {
	register_block_pattern_category( 'paz', array( 'label' => __( 'Pathway Academy Zone', 'pathway-academy-zone' ) ) );
}
add_action( 'init', 'paz_register_pattern_categories' );
