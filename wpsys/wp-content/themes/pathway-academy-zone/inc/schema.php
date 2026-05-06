<?php
/**
 * Advanced Production Schema Generator for Pathway Academy Zone.
 * Handles Organization, LocalBusiness, FAQ, JobPosting, Course, Product, and Articles.
 */
if ( ! defined( 'ABSPATH' ) ) die();

function paz_render_comprehensive_schema() {
    $graph = array();
    $home  = home_url('/');
    $logo  = get_site_icon_url() ?: '';

    // 1. Organization & LocalBusiness
    $graph[] = array(
        "@type" => array("EducationalOrganization", "LocalBusiness"),
        "@id" => $home . "#org",
        "name" => get_bloginfo('name'),
        "url" => $home,
        "logo" => $logo,
        "telephone" => get_option('paz_contact_phone', '01782 365365'),
        "address" => array(
            "@type" => "PostalAddress",
            "streetAddress" => "Pathway Academy Zone",
            "addressLocality" => "Stoke-on-Trent",
            "addressRegion" => "Staffordshire",
            "addressCountry" => "GB"
        ),
        "sameAs" => array(
            "https://facebook.com/pathwayacademyzone",
            "https://linkedin.com/company/pathway-academy-zone"
        )
    );

    // 2. Article / NewsArticle / BlogPosting
    if ( is_singular( array('post', 'paz_news') ) ) {
        $type = ( get_post_type() === 'paz_news' ) ? 'NewsArticle' : 'BlogPosting';
        $graph[] = array(
            "@type" => $type,
            "headline" => get_the_title(),
            "datePublished" => get_the_date('c'),
            "dateModified" => get_the_modified_date('c'),
            "author" => array("@type" => "Organization", "name" => "Pathway Academy Zone"),
            "image" => get_the_post_thumbnail_url(get_the_ID(), 'full')
        );
    }

    // 3. Course & Product (Programmes)
    if ( is_singular( 'paz_programme' ) ) {
        $price = get_post_meta( get_the_ID(), 'paz_price', true ) ?: '0.00';
        $graph[] = array(
            "@type" => "Course",
            "name" => get_the_title(),
            "description" => get_the_excerpt(),
            "provider" => array("@type" => "Organization", "name" => "Pathway Academy Zone")
        );
        $graph[] = array(
            "@type" => "Product",
            "name" => get_the_title(),
            "description" => get_the_excerpt(),
            "offers" => array(
                "@type" => "Offer",
                "url" => get_permalink(),
                "price" => $price,
                "priceCurrency" => "GBP",
                "availability" => "https://schema.org/InStock"
            )
        );
    }

    // 4. JobPosting
    if ( is_singular( 'paz_vacancy' ) ) {
        $graph[] = array(
            "@context" => "https://schema.org",
            "@type" => "JobPosting",
            "title" => get_the_title(),
            "description" => get_the_content(),
            "datePosted" => get_the_date('c'),
            "validThrough" => get_post_meta(get_the_ID(), 'paz_job_valid_through', true),
            "hiringOrganization" => array("@type" => "Organization", "name" => "Pathway Academy Zone"),
            "jobLocation" => array(
                "@type" => "Place",
                "address" => array(
                    "@type" => "PostalAddress",
                    "addressLocality" => get_post_meta(get_the_ID(), 'paz_job_city', true) ?: "Stoke-on-Trent",
                    "addressCountry" => "GB"
                )
            )
        );
    }

    // 5. FAQPage
    if ( is_page('faqs') || is_post_type_archive('paz_faq') ) {
        $faqs = get_posts( array('post_type' => 'paz_faq', 'posts_per_page' => -1) );
        $entities = array();
        foreach ( $faqs as $f ) {
            $ans = get_post_meta($f->ID, 'paz_faq_answer', true) ?: $f->post_content;
            $entities[] = array(
                "@type" => "Question",
                "name" => $f->post_title,
                "acceptedAnswer" => array("@type" => "Answer", "text" => wp_strip_all_tags($ans))
            );
        }
        $graph[] = array("@type" => "FAQPage", "mainEntity" => $entities);
    }

    echo "\n" . '<!-- PAZ Advanced Schema -->' . "\n";
    echo '<script type="application/ld+json">' . wp_json_encode( array( "@context" => "https://schema.org", "@graph" => $graph ), JSON_UNESCAPED_SLASHES ) . '</script>' . "\n";
}
add_action( 'wp_head', 'paz_render_comprehensive_schema' );
