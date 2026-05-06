<?php
/**
 * Pathway Academy Zone — Production FSE Bootstrap.
 */
if ( ! defined( 'ABSPATH' ) ) die();

function paz_theme_setup() {
    add_theme_support( 'title-tag' );
    add_theme_support( 'post-thumbnails' );
    add_theme_support( 'editor-styles' );
    add_theme_support( 'wp-block-styles' );
    add_theme_support( 'align-wide' );
    add_theme_support( 'responsive-embeds' );
}
add_action( 'after_setup_theme', 'paz_theme_setup' );

require_once get_template_directory() . '/inc/cpts.php';
require_once get_template_directory() . '/inc/taxonomies.php';
require_once get_template_directory() . '/inc/blocks.php';
require_once get_template_directory() . '/inc/schema.php';
require_once get_template_directory() . '/inc/compat.php';
require_once get_template_directory() . '/inc/demo-importer.php';
