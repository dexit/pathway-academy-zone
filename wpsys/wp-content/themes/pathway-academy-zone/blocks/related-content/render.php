<?php
if ( ! defined( 'ABSPATH' ) ) die();
$query = new WP_Query( array(
    'post_type'      => get_post_type(),
    'posts_per_page' => $attributes['limit'] ?? 3,
    'post__not_in'   => array( get_the_ID() ),
) );
?>
<div class="paz-related-content">
    <?php if ( $query->have_posts() ) : ?>
        <h3 class="font-bold text-xl mb-6">Related Content</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <?php while ( $query->have_posts() ) : $query->the_post(); ?>
                <article class="bg-card rounded-xl p-6 border border-border">
                    <h4 class="font-bold mb-2"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h4>
                    <p class="text-sm text-muted-foreground"><?php echo wp_trim_words( get_the_excerpt(), 15 ); ?></p>
                </article>
            <?php endwhile; wp_reset_postdata(); ?>
        </div>
    <?php endif; ?>
</div>
