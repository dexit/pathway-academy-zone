<?php
/**
 * Register sidebars.
 */
if ( ! defined( 'ABSPATH' ) ) die();

function paz_register_sidebars() {
    register_sidebar( array(
        'name'          => __( 'Main Sidebar', 'pathway-academy-zone' ),
        'id'            => 'main-sidebar',
        'before_widget' => '<div id="%1$s" class="widget %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h2 class="widget-title">',
        'after_title'   => '</h2>',
    ) );
}
add_action( 'widgets_init', 'paz_register_sidebars' );
