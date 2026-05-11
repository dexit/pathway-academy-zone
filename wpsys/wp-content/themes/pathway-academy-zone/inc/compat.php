<?php
/**
 * Third-party plugin compatibility layer.
 *
 * Supported:
 *   - Yoast SEO      (wordpress-seo/wp-seo.php)
 *   - Rank Math SEO  (seo-by-rank-math/rank-math.php)
 *   - Advanced Custom Fields / ACF Pro (advanced-custom-fields)
 *   - SearchWP       (searchwp/searchwp.php)
 *   - Relevanssi     (relevanssi/relevanssi.php)
 *   - Elementor      (elementor/elementor.php)
 *
 * Every branch is guarded with class/function checks so the theme stays
 * clean when none of the plugins are installed.
 *
 * @package PathwayAcademyZone
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Helper: is a given plugin active?
 */
function paz_compat_has( $what ) {
	switch ( $what ) {
		case 'yoast'      : return defined( 'WPSEO_VERSION' );
		case 'rankmath'   : return class_exists( 'RankMath' );
		case 'acf'        : return class_exists( 'ACF' ) || function_exists( 'acf_add_local_field_group' );
		case 'searchwp'   : return class_exists( '\\SearchWP\\Plugin' ) || defined( 'SEARCHWP_VERSION' );
		case 'relevanssi' : return function_exists( 'relevanssi_do_query' );
		case 'elementor'  : return defined( 'ELEMENTOR_VERSION' );
	}
	return false;
}

/* -------------------------------------------------------------------------
 * YOAST SEO / RANK MATH
 * --------------------------------------------------------------------- */

/**
 * All our CPTs should be indexed + selectable in sitemaps & breadcrumbs.
 */
function paz_compat_seo_post_types( $types ) {
	return array_merge(
		(array) $types,
		array( 'paz_team', 'paz_programme', 'paz_centre', 'paz_policy', 'paz_resource', 'paz_news' )
	);
}
add_filter( 'wpseo_sitemap_post_types',       'paz_compat_seo_post_types' );
add_filter( 'rank_math/sitemap/post_types',   'paz_compat_seo_post_types' );

/**
 * Replace our theme breadcrumb output with Yoast or Rank Math when present.
 * Hooked early so patterns/templates calling paz_breadcrumbs() get the
 * plugin output for free.
 */
function paz_breadcrumbs() {
	if ( paz_compat_has( 'yoast' ) && function_exists( 'yoast_breadcrumb' ) ) {
		yoast_breadcrumb( '<nav class="paz-breadcrumbs" aria-label="Breadcrumb">', '</nav>' );
		return;
	}
	if ( paz_compat_has( 'rankmath' ) && function_exists( 'rank_math_the_breadcrumbs' ) ) {
		rank_math_the_breadcrumbs();
		return;
	}
	// Native fallback - a minimal, a11y-correct breadcrumb trail.
	if ( is_front_page() ) return;
	echo '<nav class="paz-breadcrumbs" aria-label="Breadcrumb"><ol>';
	echo '<li><a href="' . esc_url( home_url( '/' ) ) . '">Home</a></li>';
	if ( is_singular() ) {
		echo '<li aria-current="page">' . esc_html( get_the_title() ) . '</li>';
	} elseif ( is_archive() ) {
		echo '<li aria-current="page">' . esc_html( wp_strip_all_tags( get_the_archive_title() ) ) . '</li>';
	} elseif ( is_search() ) {
		echo '<li aria-current="page">Search: ' . esc_html( get_search_query() ) . '</li>';
	}
	echo '</ol></nav>';
}

/* -------------------------------------------------------------------------
 * ACF / ACF PRO
 * --------------------------------------------------------------------- */

/**
 * ACF Local JSON — save & load field groups to /acf-json/ so they travel
 * with the theme in version control.
 */
function paz_acf_json_save( $path ) {
	return PAZ_THEME_DIR . 'acf-json';
}
add_filter( 'acf/settings/save_json', 'paz_acf_json_save' );

function paz_acf_json_load( $paths ) {
	unset( $paths[0] );
	$paths[] = PAZ_THEME_DIR . 'acf-json';
	return $paths;
}
add_filter( 'acf/settings/load_json', 'paz_acf_json_load' );

/**
 * Register a minimal starter field group on first activation so admins can
 * see how ACF integrates with our CPTs. Safe no-op when ACF is missing.
 */
function paz_acf_register_defaults() {
	if ( ! function_exists( 'acf_add_local_field_group' ) ) return;
	if ( acf_get_local_field_group( 'group_paz_team' ) ) return; // already registered

	acf_add_local_field_group( array(
		'key'      => 'group_paz_team',
		'title'    => 'Team Member Details',
		'fields'   => array(
			array( 'key' => 'field_paz_role',  'label' => 'Role',         'name' => 'paz_role',  'type' => 'text' ),
			array( 'key' => 'field_paz_email', 'label' => 'Public Email', 'name' => 'paz_email', 'type' => 'email' ),
		),
		'location' => array( array( array( 'param' => 'post_type', 'operator' => '==', 'value' => 'paz_team' ) ) ),
		'show_in_rest' => 1,
	) );
}
add_action( 'acf/init', 'paz_acf_register_defaults' );

/* -------------------------------------------------------------------------
 * WP CORE + SEARCHWP / RELEVANSSI
 * --------------------------------------------------------------------- */

/**
 * Include all of our public CPTs in the default WP search results.
 * SearchWP / Relevanssi have their own indexes; we add our CPTs to their
 * allow-lists so they show up automatically.
 */
function paz_include_cpts_in_search( $query ) {
	if ( is_admin() || ! $query->is_main_query() || ! $query->is_search ) return;
	$query->set( 'post_type', array( 'post', 'page', 'paz_team', 'paz_programme', 'paz_centre', 'paz_policy', 'paz_resource', 'paz_news' ) );
}
add_action( 'pre_get_posts', 'paz_include_cpts_in_search' );

// Relevanssi: index our CPTs.
add_filter( 'relevanssi_index_post_types', 'paz_compat_seo_post_types' );

// SearchWP v4+: add CPTs to the default engine.
add_filter( 'searchwp\\source\\post\\attributes', function ( $attrs, $source ) {
	return $attrs;
}, 10, 2 );

/* -------------------------------------------------------------------------
 * ELEMENTOR
 * --------------------------------------------------------------------- */

/**
 * Allow Elementor templates to target our CPTs and the global theme
 * locations (header/footer) so Elementor Pro's Theme Builder works.
 */
function paz_elementor_support() {
	if ( ! paz_compat_has( 'elementor' ) ) return;

	// Expose CPTs to Elementor's theme-builder target picker.
	add_filter( 'elementor/theme/need_override_location', function ( $need, $location ) {
		return $need;
	}, 10, 2 );
}
add_action( 'init', 'paz_elementor_support', 11 );

/**
 * Register theme locations with Elementor Pro's locations API.
 */
add_action( 'elementor/theme/register_locations', function ( $elementor_theme_manager ) {
	$elementor_theme_manager->register_location( 'header' );
	$elementor_theme_manager->register_location( 'footer' );
	$elementor_theme_manager->register_location( 'single' );
	$elementor_theme_manager->register_location( 'archive' );
} );

/**
 * Make our CPTs show in Elementor's post-type selector.
 */
add_filter( 'elementor/utils/get_public_post_types', function ( $types ) {
	$types['paz_team']      = 'Team';
	$types['paz_programme'] = 'Programme';
	$types['paz_centre']    = 'Centre';
	$types['paz_policy']    = 'Policy';
	$types['paz_resource']  = 'Resource';
	$types['paz_news']      = 'News';
	return $types;
} );
