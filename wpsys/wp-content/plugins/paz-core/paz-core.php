<?php
/**
 * Plugin Name: Pathway Academy Zone Core
 * Description: Core functionality for PAZ WordPress site including settings, MCP and REST API extensions.
 * Version: 1.0.0
 * Author: Pathway Academy Zone
 */

if ( ! defined( 'ABSPATH' ) ) die();

require_once plugin_dir_path( __FILE__ ) . 'inc/settings.php';
require_once plugin_dir_path( __FILE__ ) . 'inc/mcp.php';
