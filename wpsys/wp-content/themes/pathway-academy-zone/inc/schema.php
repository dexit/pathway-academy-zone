<?php
/**
 * Advanced Production Schema Generator.
 */
if ( ! defined( 'ABSPATH' ) ) die();

function paz_render_production_jsonld() {
    $graph = array();
    $home = home_url('/');

    // 1. Organization & LocalBusiness
    $graph[] = array(
        "@type" => array("EducationalOrganization", "LocalBusiness"),
        "@id" => $home . "#org",
        "name" => "Pathway Academy Zone",
        "url" => $home,
        "address" => array(
            "@type" => "PostalAddress",
            "addressLocality" => "Stoke-on-Trent",
            "addressRegion" => "Staffordshire",
            "addressCountry" => "GB"
        )
    );

    // 2. Specific Page Schemas
    if ( is_singular( 'paz_vacancy' ) ) {
        $graph[] = array(
            "@type" => "JobPosting",
            "title" => get_the_title(),
            "description" => get_the_excerpt(),
            "datePosted" => get_the_date('c'),
            "hiringOrganization" => array("@type" => "Organization", "name" => "Pathway Academy Zone")
        );
    }

    if ( is_singular( 'paz_programme' ) ) {
        $graph[] = array(
            "@type" => "Course",
            "name" => get_the_title(),
            "description" => get_the_excerpt(),
            "provider" => array("@type" => "Organization", "name" => "Pathway Academy Zone")
        );
    }

    if ( is_page( 'faqs' ) || is_post_type_archive( 'paz_faq' ) ) {
        $faqs = get_posts( array( 'post_type' => 'paz_faq', 'posts_per_page' => 20 ) );
        $q_items = array();
        foreach ( $faqs as $f ) {
            $ans = get_post_meta( $f->ID, 'paz_faq_answer', true ) ?: $f->post_content;
            $q_items[] = array(
                "@type" => "Question",
                "name" => $f->post_title,
                "acceptedAnswer" => array("@type" => "Answer", "text" => wp_strip_all_tags($ans))
            );
        }
        $graph[] = array("@type" => "FAQPage", "mainEntity" => $q_items);
    }

    echo '<script type="application/ld+json">' . wp_json_encode( array( "@context" => "https://schema.org", "@graph" => $graph ) ) . '</script>';
}
add_action( 'wp_head', 'paz_render_production_jsonld' );
