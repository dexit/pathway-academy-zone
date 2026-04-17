<?php
/**
 * MCP (Model Context Protocol) support for Pathway Academy Zone.
 * Exposes the site schema for AI agents.
 */

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
        'version' => '1.0.0',
        'site_name' => get_bloginfo( 'name' ),
        'base_url' => home_url(),
        'api_root' => rest_url( 'paz/v1' ),
        'resources' => array(
            'paz_team' => array(
                'label' => 'Team Members',
                'endpoint' => rest_url( 'wp/v2/paz_team' ),
                'fields' => array( 'paz_role', 'paz_email' ),
            ),
            'paz_programme' => array(
                'label' => 'Educational Programmes',
                'endpoint' => rest_url( 'wp/v2/paz_programme' ),
                'fields' => array( 'paz_subtitle', 'paz_duration', 'paz_key_stage' ),
            ),
            'paz_centre' => array(
                'label' => 'Learning Centres',
                'endpoint' => rest_url( 'wp/v2/paz_centre' ),
                'fields' => array( 'paz_address', 'paz_phone', 'paz_map_url' ),
            ),
            'paz_resource' => array(
                'label' => 'Knowledge Hub Resources',
                'endpoint' => rest_url( 'wp/v2/paz_resource' ),
                'fields' => array( 'paz_read_time', 'paz_summary' ),
            ),
            'paz_news' => array(
                'label' => 'News Updates',
                'endpoint' => rest_url( 'wp/v2/paz_news' ),
                'fields' => array(),
            ),
            'paz_vacancy' => array(
                'label' => 'Careers and Vacancies',
                'endpoint' => rest_url( 'wp/v2/paz_vacancy' ),
                'fields' => array( 'paz_job_salary_min', 'paz_job_salary_max', 'paz_job_apply_url' ),
            ),
        ),
        'tools' => array(
            'get_settings' => rest_url( 'paz/v1/settings' ),
            'resolve_route' => rest_url( 'paz/v1/route' ),
            'check_abilities' => rest_url( 'paz/v1/abilities' ),
        )
    );
}
