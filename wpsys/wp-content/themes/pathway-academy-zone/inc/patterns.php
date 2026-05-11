<?php
/**
 * Block patterns are auto-loaded from /patterns via WordPress core's pattern
 * discovery, but this file is the right place to register programmatic
 * patterns and to ensure the theme's pattern category is available early.
 *
 * @package PathwayAcademyZone
 */

if ( ! defined( 'ABSPATH' ) ) exit;

// WordPress 6.x automatically registers .php files in the theme's /patterns
// directory as block patterns using the file header comments. No extra
// registration is required here — this file exists so the theme
// deliberately documents where patterns live and can be extended later.
