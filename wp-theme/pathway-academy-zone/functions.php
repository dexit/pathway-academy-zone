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
add_action( 'after_setup_theme', function () {
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
		'primary'          => __( 'Primary Navigation', 'pathway-academy-zone' ),
		'footer-provision' => __( 'Footer: Our Provision', 'pathway-academy-zone' ),
		'footer-resources' => __( 'Footer: Resources', 'pathway-academy-zone' ),
		'footer-about'     => __( 'Footer: About Us', 'pathway-academy-zone' ),
		'footer-info'      => __( 'Footer: Information', 'pathway-academy-zone' ),
	) );

	add_image_size( 'paz-card',  800, 600, true );
	add_image_size( 'paz-hero', 1920, 1080, true );

	load_theme_textdomain( 'pathway-academy-zone', PAZ_THEME_DIR . 'languages' );
} );

/**
 * Enqueue theme stylesheet (and optionally web fonts).
 */
add_action( 'wp_enqueue_scripts', function () {
	wp_enqueue_style(
		'paz-theme',
		get_stylesheet_uri(),
		array(),
		wp_get_theme()->get( 'Version' )
	);
} );

/**
 * Editor assets — keep editor preview consistent with front-end.
 */
add_action( 'enqueue_block_editor_assets', function () {
	// Intentionally empty — theme.json handles design tokens in the editor.
} );

/**
 * Register a custom block pattern category.
 */
add_action( 'init', function () {
	register_block_pattern_category( 'paz', array( 'label' => __( 'Pathway Academy Zone', 'pathway-academy-zone' ) ) );
} );

/**
 * Register block styles.
 *
 * pill-button  — rounded pill shape for navigation/area links
 * card-hover   — card with lift effect on hover
 * highlight    — paragraph with left accent border
 */
add_action( 'init', function () {
	// Pill button style.
	register_block_style(
		'core/button',
		array(
			'name'         => 'pill',
			'label'        => __( 'Pill', 'pathway-academy-zone' ),
			'inline_style' => '.is-style-pill .wp-block-button__link { border-radius: 9999px; }',
		)
	);

	// Card hover style.
	register_block_style(
		'core/group',
		array(
			'name'         => 'card-hover',
			'label'        => __( 'Card (hover lift)', 'pathway-academy-zone' ),
			'inline_style' => '
				.is-style-card-hover {
					border-radius: 0.75rem;
					box-shadow: 0 1px 3px rgba(0,0,0,.08);
					transition: box-shadow .2s ease, transform .2s ease;
				}
				.is-style-card-hover:hover {
					box-shadow: 0 8px 24px rgba(0,0,0,.12);
					transform: translateY(-3px);
				}
			',
		)
	);

	// Highlight paragraph style.
	register_block_style(
		'core/paragraph',
		array(
			'name'         => 'highlight',
			'label'        => __( 'Highlight (left border)', 'pathway-academy-zone' ),
			'inline_style' => '
				.is-style-highlight {
					border-left: 4px solid var(--wp--preset--color--primary);
					padding-left: 1rem;
					background-color: var(--wp--preset--color--accent);
					border-radius: 0 0.375rem 0.375rem 0;
				}
			',
		)
	);
} );

// ---------------------------------------------------------------------------
// Optional: load additional theme inc files if they exist.
// ---------------------------------------------------------------------------
foreach ( array( 'cpts', 'taxonomies', 'blocks', 'patterns', 'sidebars', 'compat', 'demo-importer', 'schema' ) as $_paz_inc ) {
	$_paz_file = PAZ_THEME_DIR . 'inc/' . $_paz_inc . '.php';
	if ( file_exists( $_paz_file ) ) {
		require_once $_paz_file;
	}
}
unset( $_paz_inc, $_paz_file );
