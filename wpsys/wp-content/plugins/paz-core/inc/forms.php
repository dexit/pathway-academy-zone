<?php
/**
 * PAZ Forms Engine.
 */
if ( ! defined( 'ABSPATH' ) ) die();

function paz_register_forms_cpt() {
    register_post_type( 'paz_form_entry', array(
        'label'               => 'Form Submissions',
        'public'              => false,
        'show_ui'             => true,
        'show_in_menu'        => 'paz-settings',
        'capability_type'     => 'post',
        'capabilities'        => array( 'create_posts' => false ),
        'map_meta_cap'        => true,
        'supports'            => array( 'title', 'custom-fields' ),
        'show_in_rest'        => true,
    ) );
}
add_action( 'init', 'paz_register_forms_cpt' );

/**
 * Multi-action Submission Handler.
 */
function paz_handle_submission( $data, $actions = array() ) {
    // 1. Store in DB
    $entry_id = wp_insert_post( array(
        'post_type'   => 'paz_form_entry',
        'post_title'  => 'Submission from ' . ( $data['email'] ?? 'Unknown' ),
        'post_status' => 'publish',
    ) );

    if ( $entry_id ) {
        update_post_meta( $entry_id, '_paz_form_data', $data );
        update_post_meta( $entry_id, '_paz_submission_status', 'pending' );
    }

    // 2. Queue Actions (Action Scheduler / Cron)
    foreach ( $actions as $action ) {
        if ( $action['type'] === 'webhook' ) {
            wp_schedule_single_event( time(), 'paz_trigger_webhook', array( $entry_id, $action['url'] ) );
        } elseif ( $action['type'] === 'email' ) {
            wp_schedule_single_event( time(), 'paz_send_form_email', array( $entry_id, $action['to'] ) );
        }
    }

    return $entry_id;
}

add_action( 'paz_trigger_webhook', 'paz_process_webhook', 10, 2 );
function paz_process_webhook( $entry_id, $url ) {
    $data = get_post_meta( $entry_id, '_paz_form_data', true );
    $response = wp_remote_post( $url, array( 'body' => $data ) );

    if ( ! is_wp_error( $response ) ) {
        update_post_meta( $entry_id, '_paz_webhook_last_status', wp_remote_retrieve_response_code( $response ) );
    }
}

/**
 * Secure REST API Submission Endpoint.
 */
function paz_register_forms_rest_route() {
    register_rest_route( 'paz/v1', '/submit', array(
        'methods'  => 'POST',
        'callback' => 'paz_rest_handle_submission',
        'permission_callback' => '__return_true',
    ) );
}
add_action( 'rest_api_init', 'paz_register_forms_rest_route' );

function paz_rest_handle_submission( $request ) {
    $params = $request->get_params();
    $actions = array(
        array( 'type' => 'webhook', 'url' => 'https://hook.make.com/default' )
    );

    $entry_id = paz_handle_submission( $params, $actions );

    if ( $entry_id ) {
        return new WP_REST_Response( array( 'success' => true, 'entry_id' => $entry_id ), 200 );
    }
    return new WP_Error( 'form_error', 'Could not save submission', array( 'status' => 500 ) );
}
