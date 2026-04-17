<?php
/**
 * Plugin Name: Pathway Academy Zone Core
 * Description: Core functionality for PAZ, including API-driven routing, settings, and MCP support.
 * Version: 1.1.0
 * Author: Pathway Academy Zone
 */

if ( ! defined( 'ABSPATH' ) ) exit;

define( 'PAZ_CORE_DIR', plugin_dir_path( __FILE__ ) );

require_once PAZ_CORE_DIR . 'inc/routing.php';
require_once PAZ_CORE_DIR . 'inc/api-extensions.php';
require_once PAZ_CORE_DIR . 'inc/settings.php';
require_once PAZ_CORE_DIR . 'inc/mcp.php';

/**
 * Initialize core functionality.
 */
function paz_core_init() {
    // Core initialization logic
}
add_action( 'init', 'paz_core_init' );
