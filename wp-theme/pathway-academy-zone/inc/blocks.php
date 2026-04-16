<?php
/**
 * Register theme-bundled dynamic blocks via block.json.
 *
 * @package PathwayAcademyZone
 */

if ( ! defined( 'ABSPATH' ) ) exit;

function paz_register_blocks() {
	$blocks = array(
		'key-policies',
		'referral-journey',
		'stat-grid',
		'team-grid',
		'values-timeline',
		'approach-cards',
	);
	foreach ( $blocks as $block ) {
		$dir = PAZ_THEME_DIR . 'blocks/' . $block;
		if ( file_exists( $dir . '/block.json' ) ) {
			register_block_type( $dir );
		}
	}
}
add_action( 'init', 'paz_register_blocks' );
