<?php
/**
 * Render handler for pazone/job-board.
 */
$show_external = $attributes['showExternal'] ?? true;
$default_query = $attributes['query'] ?? 'Education';

// In a real WP environment, we'd enqueue a small script to handle the frontend fetch
// mirroring src/lib/jobs-api.ts logic.
?>
<div <?php echo get_block_wrapper_attributes( array( 'class' => 'paz-job-board' ) ); ?>
     data-external="<?php echo $show_external ? '1' : '0'; ?>"
     data-query="<?php echo esc_attr( $default_query ); ?>">

    <div class="paz-job-board__search mb-8">
        <input type="search" placeholder="Search vacancies..." class="w-full h-14 px-6 rounded-full border border-border bg-card">
    </div>

    <div class="paz-job-board__filters mb-8 flex gap-2 overflow-x-auto pb-2">
        <button class="px-4 py-2 rounded-full bg-primary text-white text-sm font-medium">All</button>
        <button class="px-4 py-2 rounded-full bg-muted text-muted-foreground text-sm font-medium">Local</button>
        <?php if ( $show_external ) : ?>
            <button class="px-4 py-2 rounded-full bg-muted text-muted-foreground text-sm font-medium">Reed</button>
            <button class="px-4 py-2 rounded-full bg-muted text-muted-foreground text-sm font-medium">Adzuna</button>
            <button class="px-4 py-2 rounded-full bg-muted text-muted-foreground text-sm font-medium">CV-Library</button>
        <?php endif; ?>
    </div>

    <div class="paz-job-board__results space-y-6">
        <!-- Local vacancies query -->
        <?php
        $local_query = new WP_Query( array(
            'post_type'      => 'paz_vacancy',
            'posts_per_page' => 10,
        ) );
        if ( $local_query->have_posts() ) :
            while ( $local_query->have_posts() ) : $local_query->the_post();
                ?>
                <article class="bg-card rounded-2xl p-8 border border-border shadow-sm">
                    <div class="flex justify-between items-start">
                        <div>
                            <span class="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-1 rounded">Local</span>
                            <h3 class="text-xl font-bold mt-2"><?php the_title(); ?></h3>
                            <div class="text-sm text-muted-foreground mt-2 flex gap-4">
                                <span><?php echo get_post_meta( get_the_ID(), 'paz_job_employment_type', true ) ?: 'Full-time'; ?></span>
                                <span><?php echo get_post_meta( get_the_ID(), 'paz_job_city', true ) ?: 'Stafford'; ?></span>
                            </div>
                        </div>
                        <a href="<?php the_permalink(); ?>" class="px-6 py-2 bg-primary text-white rounded-full text-sm font-bold">View Details</a>
                    </div>
                </article>
                <?php
            endwhile;
            wp_reset_postdata();
        endif;
        ?>

        <!-- Placeholder for external jobs (hydrated via JS) -->
        <div id="paz-external-jobs-root"></div>
    </div>
</div>
