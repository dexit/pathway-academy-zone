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
