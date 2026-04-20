<?php
/**
 * Schema.
 */
if ( ! defined( 'ABSPATH' ) ) die();

function paz_render_jsonld() {
    // Basic Organization Schema
    $json = array(
        "@context" => "https://schema.org",
        "@type" => "Organization",
        "name" => "Pathway Academy Zone",
        "url" => home_url('/')
    );
    echo '<script type="application/ld+json">' . wp_json_encode($json) . '</script>';
}
add_action( 'wp_head', 'paz_render_jsonld' );
