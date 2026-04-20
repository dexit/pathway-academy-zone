<?php
/**
 * Server-side render for the pazone/job-board block.
 */
if ( ! defined( 'ABSPATH' ) ) die();

$show_internal = $attributes['showInternal'] ?? true;
$vacancies = array();

if ( $show_internal ) {
    $query = new WP_Query( array(
        'post_type'      => 'paz_vacancy',
        'posts_per_page' => 10,
        'post_status'    => 'publish',
    ) );
    if ( $query->have_posts() ) {
        while ( $query->have_posts() ) {
            $query->the_post();
            $vacancies[] = array(
                'title'    => get_the_title(),
                'type'     => get_post_meta( get_the_ID(), 'paz_job_employment_type', true ) ?: 'Full-time',
                'location' => get_post_meta( get_the_ID(), 'paz_job_city', true ) ?: 'Stafford',
                'salary'   => get_post_meta( get_the_ID(), 'paz_job_salary_min', true ) . ' - ' . get_post_meta( get_the_ID(), 'paz_job_salary_max', true ),
                'closing'  => get_post_meta( get_the_ID(), 'paz_job_valid_through', true ),
                'url'      => get_permalink(),
            );
        }
        wp_reset_postdata();
    }
}

// Minimal placeholder for the React-like vacancy list.
?>
<div class="paz-job-board bg-background py-12">
    <div class="container mx-auto px-4 max-w-4xl">
        <div class="space-y-6">
            <?php if ( empty( $vacancies ) ) : ?>
                <p class="text-center text-muted-foreground">No current vacancies. Please check back soon.</p>
            <?php else : ?>
                <?php foreach ( $vacancies as $v ) : ?>
                    <article class="bg-card rounded-2xl p-8 shadow-sm border border-border/50 hover:shadow-md transition-shadow">
                        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                                <h3 class="font-display text-xl font-bold text-foreground mb-2"><?php echo esc_html( $v['title'] ); ?></h3>
                                <div class="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                                    <span class="flex items-center gap-1"><?php echo esc_html( $v['type'] ); ?></span>
                                    <span class="flex items-center gap-1"><?php echo esc_html( $v['location'] ); ?></span>
                                </div>
                                <p class="text-primary font-semibold mt-2"><?php echo esc_html( $v['salary'] ); ?></p>
                                <?php if ( $v['closing'] ) : ?>
                                    <p class="text-sm text-muted-foreground mt-1">Closing: <?php echo esc_html( date( 'j F Y', strtotime( $v['closing'] ) ) ); ?></p>
                                <?php endif; ?>
                            </div>
                            <a href="<?php echo esc_url( $v['url'] ); ?>" class="wp-block-button__link wp-element-button shrink-0 rounded-full">View Details & Apply</a>
                        </div>
                    </article>
                <?php endforeach; ?>
            <?php endif; ?>
        </div>
    </div>
</div>
