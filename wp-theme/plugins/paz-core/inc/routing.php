<?php
/**
 * Routing logic to support React SPA routes via WP API.
 */

function paz_register_custom_routes() {
    register_rest_route( 'paz/v1', '/route', array(
        'methods' => 'GET',
        'callback' => 'paz_handle_routing_request',
        'permission_callback' => '__return_true',
    ) );
}
add_action( 'rest_api_init', 'paz_register_custom_routes' );

/**
 * Maps a URL path to a WordPress object or template hint.
 */
function paz_handle_routing_request( $request ) {
    $path = $request->get_param( 'path' );
    if ( ! $path ) return new WP_Error( 'missing_path', 'Path parameter is required', array( 'status' => 400 ) );

    $path = untrailingslashit( ltrim( $path, '/' ) );

    // 1. Direct Page/Post match
    $post_id = url_to_postid( home_url( $path ) );
    if ( $post_id ) {
        return array(
            'id' => $post_id,
            'type' => get_post_type( $post_id ),
            'template' => get_page_template_slug( $post_id ) ?: 'default',
        );
    }

    // 2. Nested routes for Knowledge Hub / Categories
    if ( preg_match( '/^knowledge-hub\/([^\/]+)$/', $path, $matches ) ) {
        $term = get_term_by( 'slug', $matches[1], 'paz_resource_category' );
        if ( $term ) {
            return array( 'type' => 'taxonomy', 'taxonomy' => 'paz_resource_category', 'id' => $term->term_id );
        }
    }

    // 3. Fallback to common archives
    $archives = array(
        'news' => 'paz_news',
        'programmes' => 'paz_programme',
        'centres' => 'paz_centre',
        'team' => 'paz_team',
        'vacancies' => 'paz_vacancy',
        'knowledge-hub' => 'paz_resource',
    );

    if ( isset( $archives[$path] ) ) {
        return array( 'type' => 'archive', 'post_type' => $archives[$path] );
    }

    return new WP_Error( 'not_found', 'No route found for this path', array( 'status' => 404 ) );
}
