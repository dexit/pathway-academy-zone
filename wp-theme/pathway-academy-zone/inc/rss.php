<?php
/**
 * WordPress RSS feed enhancements.
 *
 * - Adds media:content (featured image) to RSS 2.0 items
 * - Adds atom:link self-reference to channel
 * - Registers /feed/json endpoint (JSON Feed 1.1)
 * - Injects <link rel="alternate"> autodiscovery tags in <head>
 */
if ( ! defined( 'ABSPATH' ) ) die();

// ── Add media namespace to RSS 2.0 ────────────────────────────────────────────
add_action( 'rss2_ns', function () {
    echo 'xmlns:media="http://search.yahoo.com/mrss/" xmlns:atom="http://www.w3.org/2005/Atom"' . "\n";
} );

// ── Channel-level: atom:link self + channel image ─────────────────────────────
add_action( 'rss2_head', function () {
    $feed_url = esc_url( get_feed_link( 'rss2' ) );
    echo '<atom:link href="' . $feed_url . '" rel="self" type="application/rss+xml" />' . "\n";

    $logo = esc_url( get_site_icon_url( 144 ) ?: get_template_directory_uri() . '/assets/PAZlogo.png' );
    echo '<image>' . "\n";
    echo '  <url>' . $logo . '</url>' . "\n";
    echo '  <title>' . esc_xml( get_bloginfo( 'name' ) ) . '</title>' . "\n";
    echo '  <link>' . esc_url( home_url( '/' ) ) . '</link>' . "\n";
    echo '  <width>144</width>' . "\n";
    echo '  <height>144</height>' . "\n";
    echo '</image>' . "\n";
} );

// ── Per-item: media:content featured image ────────────────────────────────────
add_action( 'rss2_item', function () {
    global $post;
    $thumb_id  = get_post_thumbnail_id( $post );
    $thumb_url = '';
    $width     = 1200;
    $height    = 630;

    if ( $thumb_id ) {
        $img = wp_get_attachment_image_src( $thumb_id, 'large' );
        if ( $img ) {
            $thumb_url = $img[0];
            $width     = (int) $img[1];
            $height    = (int) $img[2];
        }
    }

    // Fall back to first image in post content
    if ( ! $thumb_url ) {
        preg_match( '/<img[^>]+src=["\']([^"\']+)["\']/', $post->post_content, $m );
        $thumb_url = $m[1] ?? '';
    }

    if ( $thumb_url ) {
        $thumb_url = esc_url( $thumb_url );
        echo '<media:content url="' . $thumb_url . '" medium="image" width="' . $width . '" height="' . $height . '">' . "\n";
        echo '  <media:title>' . esc_xml( get_the_title() ) . '</media:title>' . "\n";
        echo '  <media:description type="plain">' . esc_xml( wp_strip_all_tags( get_the_excerpt() ) ) . '</media:description>' . "\n";
        echo '</media:content>' . "\n";
        echo '<enclosure url="' . $thumb_url . '" type="image/jpeg" length="0" />' . "\n";
    }
} );

// ── JSON Feed 1.1 endpoint ─────────────────────────────────────────────────────
add_action( 'init', function () {
    add_feed( 'json', 'paz_json_feed' );
} );

function paz_json_feed() {
    header( 'Content-Type: application/feed+json; charset=UTF-8' );
    header( 'Cache-Control: public, max-age=3600, stale-while-revalidate=86400' );

    $posts = get_posts( array(
        'posts_per_page' => 20,
        'post_status'    => 'publish',
        'orderby'        => 'date',
        'order'          => 'DESC',
    ) );

    $items = array_map( function ( $post ) {
        $thumb = get_the_post_thumbnail_url( $post, 'large' );
        $item  = array(
            'id'             => get_permalink( $post ),
            'url'            => get_permalink( $post ),
            'title'          => get_the_title( $post ),
            'content_html'   => apply_filters( 'the_content', $post->post_content ),
            'summary'        => wp_strip_all_tags( get_the_excerpt( $post ) ),
            'date_published' => get_the_date( 'c', $post ),
            'date_modified'  => get_the_modified_date( 'c', $post ),
            'authors'        => array( array( 'name' => get_the_author_meta( 'display_name', $post->post_author ) ) ),
            'tags'           => wp_get_post_tags( $post->ID, array( 'fields' => 'names' ) ),
        );
        if ( $thumb ) {
            $item['image'] = $thumb;
            $item['banner_image'] = $thumb;
        }
        return $item;
    }, $posts );

    $feed = array(
        'version'       => 'https://jsonfeed.org/version/1.1',
        'title'         => get_bloginfo( 'name' ),
        'home_page_url' => home_url( '/' ),
        'feed_url'      => home_url( '/feed/json' ),
        'description'   => get_bloginfo( 'description' ),
        'icon'          => get_site_icon_url( 512 ) ?: '',
        'favicon'       => get_site_icon_url( 32 ) ?: '',
        'language'      => get_bloginfo( 'language' ),
        'items'         => $items,
    );

    echo wp_json_encode( $feed, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES );
}

// ── Autodiscovery <link> tags in <head> ───────────────────────────────────────
add_action( 'wp_head', function () {
    $rss  = esc_url( get_feed_link( 'rss2' ) );
    $json = esc_url( home_url( '/feed/json' ) );
    echo '<link rel="alternate" type="application/rss+xml" title="' . esc_attr( get_bloginfo( 'name' ) . ' &raquo; Feed' ) . '" href="' . $rss . '" />' . "\n";
    echo '<link rel="alternate" type="application/feed+json" title="' . esc_attr( get_bloginfo( 'name' ) . ' &raquo; JSON Feed' ) . '" href="' . $json . '" />' . "\n";
}, 2 );
