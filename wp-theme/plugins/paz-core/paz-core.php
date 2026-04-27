<?php
/**
 * Plugin Name: PAZ Core
 * Description: Backend logic for Pathway Academy Zone including form handling, logging, and rate limiting.
 * Version: 1.0.0
 * Author: Pathway Group
 */

if (!defined('ABSPATH')) exit;

define('PAZ_CORE_PATH', plugin_dir_path(__FILE__));

require_once PAZ_CORE_PATH . 'inc/db.php';
require_once PAZ_CORE_PATH . 'inc/api.php';
require_once PAZ_CORE_PATH . 'inc/admin.php';
require_once PAZ_CORE_PATH . 'inc/actions.php';

register_activation_hook(__FILE__, 'paz_core_activate');

function paz_core_activate() {
    paz_setup_db();
}
