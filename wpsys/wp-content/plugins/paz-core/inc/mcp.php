<?php
/**
 * PAZ MCP REST API endpoint.
 */
if ( ! defined( 'ABSPATH' ) ) die();

function paz_register_mcp_route() {
    register_rest_route( 'paz/v1', '/mcp', array(
        'methods' => 'GET',
        'callback' => 'paz_get_mcp_schema',
        'permission_callback' => '__return_true',
    ) );
}
add_action( 'rest_api_init', 'paz_register_mcp_route' );

function paz_get_mcp_schema() {
    return array(
        'name' => 'Pathway Academy Zone',
        'version' => '1.0.0',
        'resources' => array(
            'vacancies' => array( 'type' => 'post_type', 'slug' => 'paz_vacancy' ),
            'programmes' => array( 'type' => 'post_type', 'slug' => 'paz_programme' ),
            'team' => array( 'type' => 'post_type', 'slug' => 'paz_team' ),
        )
    );
}
