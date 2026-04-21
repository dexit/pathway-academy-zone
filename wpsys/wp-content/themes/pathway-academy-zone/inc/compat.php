<?php
/**
 * Advanced Plugin Compatibility & ACF Local Field Groups.
 */
if ( ! defined( 'ABSPATH' ) ) die();

/**
 * Filter search to include CPTs.
 */
function paz_include_cpts_in_search( $query ) {
	if ( is_admin() || ! $query->is_main_query() || ! $query->is_search ) return;
	$query->set( 'post_type', array( 'post', 'page', 'paz_team', 'paz_programme', 'paz_centre', 'paz_policy', 'paz_resource', 'paz_news', 'paz_vacancy', 'paz_faq', 'paz_testimonial' ) );
}
add_action( 'pre_get_posts', 'paz_include_cpts_in_search' );

/**
 * Extensive ACF Field Groups for Production Parity.
 */
function paz_register_acf_fields() {
    if ( ! function_exists( 'acf_add_local_field_group' ) ) return;

    // Team Meta
    acf_add_local_field_group( array(
        'key' => 'group_paz_team',
        'title' => 'Team Member Details',
        'fields' => array(
            array( 'key' => 'field_paz_role', 'label' => 'Role', 'name' => 'paz_role', 'type' => 'text' ),
            array( 'key' => 'field_paz_email', 'label' => 'Email', 'name' => 'paz_email', 'type' => 'email' ),
        ),
        'location' => array( array( array( 'param' => 'post_type', 'operator' => '==', 'value' => 'paz_team' ) ) ),
        'show_in_rest' => 1,
    ) );

    // Programme / Course / Product Meta
    acf_add_local_field_group( array(
        'key' => 'group_paz_programme',
        'title' => 'Programme (Course/Product) Details',
        'fields' => array(
            array( 'key' => 'field_paz_subtitle', 'label' => 'Subtitle', 'name' => 'paz_subtitle', 'type' => 'text' ),
            array( 'key' => 'field_paz_duration', 'label' => 'Duration', 'name' => 'paz_duration', 'type' => 'text' ),
            array( 'key' => 'field_paz_key_stage', 'label' => 'Key Stage', 'name' => 'paz_key_stage', 'type' => 'text' ),
            array( 'key' => 'field_paz_price', 'label' => 'Price (for Product Schema)', 'name' => 'paz_price', 'type' => 'text' ),
            array( 'key' => 'field_paz_course_mode', 'label' => 'Course Mode', 'name' => 'paz_course_mode', 'type' => 'select', 'choices' => array( 'onsite' => 'On-site', 'online' => 'Online', 'blended' => 'Blended' ) ),
        ),
        'location' => array( array( array( 'param' => 'post_type', 'operator' => '==', 'value' => 'paz_programme' ) ) ),
        'show_in_rest' => 1,
    ) );

    // Vacancy / JobPosting Meta
    acf_add_local_field_group( array(
        'key' => 'group_paz_vacancy',
        'title' => 'Job Posting Details',
        'fields' => array(
            array( 'key' => 'field_paz_job_city', 'label' => 'City', 'name' => 'paz_job_city', 'type' => 'text' ),
            array( 'key' => 'field_paz_job_salary_min', 'label' => 'Salary Min', 'name' => 'paz_job_salary_min', 'type' => 'number' ),
            array( 'key' => 'field_paz_job_salary_max', 'label' => 'Salary Max', 'name' => 'paz_job_salary_max', 'type' => 'number' ),
            array( 'key' => 'field_paz_job_employment_type', 'label' => 'Employment Type', 'name' => 'paz_job_employment_type', 'type' => 'text' ),
            array( 'key' => 'field_paz_job_valid_through', 'label' => 'Closing Date', 'name' => 'paz_job_valid_through', 'type' => 'date_picker' ),
        ),
        'location' => array( array( array( 'param' => 'post_type', 'operator' => '==', 'value' => 'paz_vacancy' ) ) ),
        'show_in_rest' => 1,
    ) );

    // FAQ Meta
    acf_add_local_field_group( array(
        'key' => 'group_paz_faq',
        'title' => 'FAQ Details',
        'fields' => array(
            array( 'key' => 'field_paz_faq_answer', 'label' => 'Plain Text Answer (for Schema)', 'name' => 'paz_faq_answer', 'type' => 'textarea' ),
        ),
        'location' => array( array( array( 'param' => 'post_type', 'operator' => '==', 'value' => 'paz_faq' ) ) ),
        'show_in_rest' => 1,
    ) );

    // Testimonial / Review Meta
    acf_add_local_field_group( array(
        'key' => 'group_paz_testimonial',
        'title' => 'Testimonial / Review Details',
        'fields' => array(
            array( 'key' => 'field_paz_author_role', 'label' => 'Author Role', 'name' => 'paz_author_role', 'type' => 'text' ),
            array( 'key' => 'field_paz_rating', 'label' => 'Rating (1-5)', 'name' => 'paz_rating', 'type' => 'number', 'min' => 1, 'max' => 5 ),
        ),
        'location' => array( array( array( 'param' => 'post_type', 'operator' => '==', 'value' => 'paz_testimonial' ) ) ),
        'show_in_rest' => 1,
    ) );
}
add_action( 'acf/init', 'paz_register_acf_fields' );

/**
 * Elementor Dynamic Tags & Loop Parity.
 */
add_action( 'elementor/theme/register_locations', function( $elementor_theme_manager ) {
	$elementor_theme_manager->register_location( 'header' );
	$elementor_theme_manager->register_location( 'footer' );
	$elementor_theme_manager->register_location( 'archive' );
	$elementor_theme_manager->register_location( 'single' );
} );

/**
 * Yoast SEO Integration.
 */
add_filter( 'wpseo_sitemap_post_types', function( $post_types ) {
    return array_merge( $post_types, array( 'paz_programme', 'paz_vacancy', 'paz_team', 'paz_policy' ) );
});

/**
 * Classic Fallback / Gutenberg wide alignment support.
 */
add_theme_support( 'align-wide' );
add_theme_support( 'responsive-embeds' );

/**
 * Centre (LocalBusiness) Meta.
 */
acf_add_local_field_group( array(
    'key' => 'group_paz_centre',
    'title' => 'Centre Details',
    'fields' => array(
        array( 'key' => 'field_paz_address', 'label' => 'Full Address', 'name' => 'paz_address', 'type' => 'textarea' ),
        array( 'key' => 'field_paz_phone', 'label' => 'Phone', 'name' => 'paz_phone', 'type' => 'text' ),
    ),
    'location' => array( array( array( 'param' => 'post_type', 'operator' => '==', 'value' => 'paz_centre' ) ) ),
    'show_in_rest' => 1,
) );
