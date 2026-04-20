<?php
/**
 * Plugin compatibility.
 */
if ( ! defined( 'ABSPATH' ) ) die();

/**
 * Filter search to include CPTs.
 */
function paz_include_cpts_in_search( $query ) {
	if ( is_admin() || ! $query->is_main_query() || ! $query->is_search ) return;
	$query->set( 'post_type', array( 'post', 'page', 'paz_team', 'paz_programme', 'paz_centre', 'paz_policy', 'paz_resource', 'paz_news', 'paz_vacancy' ) );
}
add_action( 'pre_get_posts', 'paz_include_cpts_in_search' );
