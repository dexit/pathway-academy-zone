<?php
/**
 * Plugin Name: Pathway Academy Zone Core
 * Description: Core functionality for PAZ, including API-driven routing and advanced block support.
 * Version: 1.0.0
 * Author: Pathway Academy Zone
 */

if ( ! defined( 'ABSPATH' ) ) exit;

define( 'PAZ_CORE_DIR', plugin_dir_path( __FILE__ ) );

require_once PAZ_CORE_DIR . 'inc/routing.php';
require_once PAZ_CORE_DIR . 'inc/api-extensions.php';

/**
 * Register a "Shadow" route handler. This allows WordPress to respond to
 * frontend-only routes (like /knowledge-hub/category/slug) by mapping them
 * to the correct REST API endpoint or a virtual page, ensuring the
 * WP-as-a-backend architecture stays in sync with React SPA routing.
 */
function paz_core_init() {
    // Initialization logic
}
add_action( 'init', 'paz_core_init' );
