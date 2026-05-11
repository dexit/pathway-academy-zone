<?php
/**
 * Enhanced Job Board with Caching & Filters.
 */
if ( ! defined( 'ABSPATH' ) ) die();

$cache_key = 'paz_vacancies_list';
$vacancies = get_transient( $cache_key );

if ( false === $vacancies ) {
    $vacancies = array();
    $query = new WP_Query( array( 'post_type' => 'paz_vacancy', 'posts_per_page' => 50 ) );
    if ( $query->have_posts() ) {
        while ( $query->have_posts() ) {
            $query->the_post();
            $vacancies[] = array(
                'title' => get_the_title(),
                'city' => get_post_meta( get_the_ID(), 'paz_job_city', true ),
                'type' => get_post_meta( get_the_ID(), 'paz_job_employment_type', true ),
                'url' => get_permalink()
            );
        }
        wp_reset_postdata();
    }
    set_transient( $cache_key, $vacancies, HOUR_IN_SECONDS );
}
?>
<div class="paz-job-board" data-vacancies='<?php echo esc_attr( wp_json_encode($vacancies) ); ?>'>
    <div class="flex gap-4 mb-8">
        <select class="paz-filter" data-filter="city"><option value="">All Cities</option></select>
        <select class="paz-filter" data-filter="type"><option value="">All Types</option></select>
    </div>
    <div class="paz-results space-y-4">
        <!-- JS will populate based on initial data -->
    </div>
</div>
