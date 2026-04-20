<?php
/**
 * Extend WP REST API with custom fields and data.
 */

function paz_extend_api() {
    $post_types = array( 'post', 'page', 'paz_news', 'paz_resource', 'paz_team', 'paz_programme', 'paz_centre', 'paz_policy', 'paz_vacancy', 'paz_testimonial', 'paz_partner', 'paz_faq', 'paz_glossary' );

    register_rest_field( $post_types, 'paz_meta', array(
        'get_callback' => function( $post_arr ) {
            $meta = get_post_meta( $post_arr['id'] );
            $clean_meta = array();
            foreach ( $meta as $key => $values ) {
                if ( strpos( $key, 'paz_' ) === 0 ) {
                    $clean_meta[$key] = $values[0];
                }
            }
            return $clean_meta;
        },
    ) );

    // Add thumbnail URL to API
    register_rest_field( $post_types, 'featured_image_url', array(
        'get_callback' => function( $post_arr ) {
            $img = get_the_post_thumbnail_url( $post_arr['id'], 'large' );
            return $img ?: null;
        },
    ) );
}
add_action( 'rest_api_init', 'paz_extend_api' );

/**
 * Custom endpoints for Settings and Abilities.
 */
function paz_register_custom_endpoints() {
    register_rest_route( 'paz/v1', '/settings', array(
        'methods' => 'GET',
        'callback' => 'paz_get_api_settings',
        'permission_callback' => '__return_true',
    ) );

    register_rest_route( 'paz/v1', '/abilities', array(
        'methods' => 'GET',
        'callback' => 'paz_get_user_abilities',
        'permission_callback' => '__return_true',
    ) );
}
add_action( 'rest_api_init', 'paz_register_custom_endpoints' );

function paz_get_api_settings() {
    return array(
        'phone' => get_option( 'paz_contact_phone' ),
        'email' => get_option( 'paz_contact_email' ),
        'address' => get_option( 'paz_contact_address' ),
        'announcement' => get_option( 'paz_announcement_text' ),
        'site_name' => get_bloginfo( 'name' ),
        'description' => get_bloginfo( 'description' ),
    );
}

function paz_get_user_abilities() {
    $current_user = wp_get_current_user();
    if ( 0 === $current_user->ID ) {
        return array( 'is_logged_in' => false, 'capabilities' => array() );
    }
    return array(
        'is_logged_in' => true,
        'id' => $current_user->ID,
        'user_login' => $current_user->user_login,
        'capabilities' => $current_user->allcaps,
    );
}
