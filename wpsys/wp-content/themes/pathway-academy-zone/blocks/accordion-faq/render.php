<?php
if ( ! defined( 'ABSPATH' ) ) die();
$query = new WP_Query( array( 'post_type' => 'paz_faq', 'posts_per_page' => $attributes['limit'] ?? 10 ) );
?>
<div class="paz-accordion-faq container mx-auto max-w-3xl">
    <?php if ( $query->have_posts() ) : ?>
        <div class="space-y-4">
            <?php while ( $query->have_posts() ) : $query->the_post(); ?>
                <details class="bg-card border border-border rounded-xl group overflow-hidden">
                    <summary class="p-6 cursor-pointer font-bold flex items-center justify-between list-none">
                        <?php the_title(); ?>
                        <span class="transition-transform group-open:rotate-180">▼</span>
                    </summary>
                    <div class="p-6 pt-0 text-muted-foreground border-t border-border/50">
                        <?php the_content(); ?>
                    </div>
                </details>
            <?php endwhile; wp_reset_postdata(); ?>
        </div>
    <?php endif; ?>
</div>
