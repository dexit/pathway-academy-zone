<?php
/**
 * Advanced Plugin Compatibility & ACF Local Field Groups.
 */
if ( ! defined( 'ABSPATH' ) ) die();

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
        'title' => 'Programme Details',
        'fields' => array(
            array( 'key' => 'field_paz_subtitle', 'label' => 'Subtitle', 'name' => 'paz_subtitle', 'type' => 'text' ),
            array( 'key' => 'field_paz_duration', 'label' => 'Duration', 'name' => 'paz_duration', 'type' => 'text' ),
            array( 'key' => 'field_paz_key_stage', 'label' => 'Key Stage', 'name' => 'paz_key_stage', 'type' => 'text' ),
            array( 'key' => 'field_paz_price', 'label' => 'Price', 'name' => 'paz_price', 'type' => 'text', 'default_value' => '0.00' ),
            array( 'key' => 'field_paz_course_mode', 'label' => 'Course Mode', 'name' => 'paz_course_mode', 'type' => 'select', 'choices' => array( 'onsite' => 'On-site', 'online' => 'Online', 'blended' => 'Blended' ) ),
        ),
        'location' => array( array( array( 'param' => 'post_type', 'operator' => '==', 'value' => 'paz_programme' ) ) ),
        'show_in_rest' => 1,
    ) );

    // Knowledge Hub Meta
    acf_add_local_field_group( array(
        'key' => 'group_paz_resource',
        'title' => 'Resource Details',
        'fields' => array(
            array( 'key' => 'field_paz_read_time', 'label' => 'Read Time', 'name' => 'paz_read_time', 'type' => 'text' ),
            array( 'key' => 'field_paz_summary', 'label' => 'Summary', 'name' => 'paz_summary', 'type' => 'textarea' ),
        ),
        'location' => array( array( array( 'param' => 'post_type', 'operator' => '==', 'value' => 'paz_resource' ) ) ),
        'show_in_rest' => 1,
    ) );

    // Vacancy Meta
    acf_add_local_field_group( array(
        'key' => 'group_paz_vacancy',
        'title' => 'Job Details',
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

    // Testimonial Meta
    acf_add_local_field_group( array(
        'key' => 'group_paz_testimonial',
        'title' => 'Testimonial Details',
        'fields' => array(
            array( 'key' => 'field_paz_author_role', 'label' => 'Author Role', 'name' => 'paz_author_role', 'type' => 'text' ),
            array( 'key' => 'field_paz_rating', 'label' => 'Rating', 'name' => 'paz_rating', 'type' => 'number', 'min' => 1, 'max' => 5, 'default_value' => 5 ),
        ),
        'location' => array( array( array( 'param' => 'post_type', 'operator' => '==', 'value' => 'paz_testimonial' ) ) ),
        'show_in_rest' => 1,
    ) );
}
add_action( 'acf/init', 'paz_register_acf_fields' );

/**
 * Yoast & Elementor Parity.
 */
add_action( 'elementor/theme/register_locations', function( $elementor_theme_manager ) {
	$elementor_theme_manager->register_location( 'header' );
	$elementor_theme_manager->register_location( 'footer' );
	$elementor_theme_manager->register_location( 'archive' );
	$elementor_theme_manager->register_location( 'single' );
} );

add_filter( 'wpseo_sitemap_post_types', function( $types ) {
    return array_merge( $types, array( 'paz_team', 'paz_programme', 'paz_policy', 'paz_resource', 'paz_vacancy' ) );
});
