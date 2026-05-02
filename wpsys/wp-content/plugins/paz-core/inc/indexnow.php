<?php
/**
 * IndexNow integration for Pathway Academy Zone.
 *
 * Automatically submits URLs to Bing, Yandex and the IndexNow hub whenever
 * a post, page, or CPT is published or updated.
 *
 * Requires the key file to be accessible at:
 *   https://example.com/{PAZ_INDEXNOW_KEY}.txt
 *
 * Set via wp-config.php:
 *   define( 'PAZ_INDEXNOW_KEY', '0a91f3c8e29d4d6b9c6f4e5b3a8d7c2f' );
 *
 * Or as a WordPress option:  paz_indexnow_key
 */
if ( ! defined( 'ABSPATH' ) ) die();

// ── Helpers ───────────────────────────────────────────────────────────────────

function paz_indexnow_key(): string {
    if ( defined( 'PAZ_INDEXNOW_KEY' ) && PAZ_INDEXNOW_KEY ) {
        return (string) PAZ_INDEXNOW_KEY;
    }
    $env = getenv( 'PAZ_INDEXNOW_KEY' );
    if ( $env ) return $env;
    return (string) get_option( 'paz_indexnow_key', '' );
}

/**
 * Submit one or more URLs to IndexNow.
 * Uses the batch endpoint so multiple URLs cost one request.
 *
 * @param string[] $urls
 */
function paz_indexnow_submit( array $urls ): void {
    $key = paz_indexnow_key();
    if ( ! $key || empty( $urls ) ) return;

    $host     = wp_parse_url( home_url(), PHP_URL_HOST );
    $key_url  = home_url( '/' . $key . '.txt' );

    // Deduplicate and validate
    $urls = array_values( array_unique( array_filter( $urls, 'esc_url_raw' ) ) );
    if ( empty( $urls ) ) return;

    $body = wp_json_encode( array(
        'host'    => $host,
        'key'     => $key,
        'keyLocation' => $key_url,
        'urlList' => $urls,
    ) );

    // IndexNow accepted engines
    $endpoints = array(
        'https://api.indexnow.org/indexnow',
        'https://www.bing.com/indexnow',
        'https://yandex.com/indexnow',
    );

    foreach ( $endpoints as $endpoint ) {
        wp_remote_post( $endpoint, array(
            'headers'   => array( 'Content-Type' => 'application/json; charset=utf-8' ),
            'body'      => $body,
            'timeout'   => 8,
            'blocking'  => false, // fire-and-forget
            'sslverify' => true,
        ) );
    }
}

// ── Trigger on publish / update ───────────────────────────────────────────────

/**
 * Hook fires when post transitions to "publish" state,
 * or when an already-published post is saved.
 */
add_action( 'transition_post_status', function ( $new_status, $old_status, $post ) {
    if ( 'publish' !== $new_status ) return;
    if ( wp_is_post_revision( $post ) || wp_is_post_autosave( $post ) ) return;

    $urls = array( get_permalink( $post ) );

    // Also submit archive/taxonomy URLs that list this post
    $terms = wp_get_post_terms( $post->ID, get_object_taxonomies( $post->post_type ) );
    foreach ( $terms as $term ) {
        $term_link = get_term_link( $term );
        if ( ! is_wp_error( $term_link ) ) {
            $urls[] = $term_link;
        }
    }

    // Submit homepage and post-type archive
    $urls[] = home_url( '/' );
    $pt_archive = get_post_type_archive_link( $post->post_type );
    if ( $pt_archive ) $urls[] = $pt_archive;

    // Debounce: don't re-submit within 60 s for the same URL
    $cache_key = 'paz_indexnow_' . md5( $post->ID . $new_status );
    if ( get_transient( $cache_key ) ) return;
    set_transient( $cache_key, 1, 60 );

    paz_indexnow_submit( $urls );
}, 10, 3 );

// ── Admin: manual "Submit to IndexNow" button ─────────────────────────────────

add_action( 'post_submitbox_misc_actions', function () {
    global $post;
    if ( ! paz_indexnow_key() ) return;
    ?>
    <div class="misc-pub-section">
        <?php
        $nonce = wp_create_nonce( 'paz_indexnow_manual_' . $post->ID );
        $url   = admin_url( 'post.php?post=' . $post->ID . '&action=paz_indexnow&_wpnonce=' . $nonce );
        ?>
        <a href="<?php echo esc_url( $url ); ?>" class="button button-small">
            &#128269; Submit to IndexNow
        </a>
    </div>
    <?php
} );

add_action( 'admin_action_paz_indexnow', function () {
    $post_id = absint( $_GET['post'] ?? 0 );
    check_admin_referer( 'paz_indexnow_manual_' . $post_id );

    if ( ! current_user_can( 'edit_post', $post_id ) ) wp_die( 'Unauthorized' );

    paz_indexnow_submit( array( get_permalink( $post_id ) ) );

    wp_redirect( add_query_arg(
        array( 'message' => 'paz_indexnow_ok', 'post' => $post_id ),
        admin_url( 'post.php' )
    ) );
    exit;
} );

add_action( 'admin_notices', function () {
    if ( isset( $_GET['message'] ) && 'paz_indexnow_ok' === $_GET['message'] ) {
        echo '<div class="notice notice-success is-dismissible"><p>URL submitted to IndexNow.</p></div>';
    }
} );

// ── REST: submit arbitrary URL list ──────────────────────────────────────────

add_action( 'rest_api_init', function () {
    register_rest_route( 'paz/v1', '/indexnow', array(
        'methods'             => 'POST',
        'callback'            => function ( WP_REST_Request $req ) {
            $urls = $req->get_json_params()['urls'] ?? array();
            if ( ! is_array( $urls ) ) {
                return new WP_Error( 'bad_request', 'urls must be an array', array( 'status' => 400 ) );
            }
            paz_indexnow_submit( array_slice( $urls, 0, 100 ) );
            return array( 'submitted' => count( $urls ) );
        },
        'permission_callback' => function () {
            return current_user_can( 'manage_options' );
        },
    ) );
} );
