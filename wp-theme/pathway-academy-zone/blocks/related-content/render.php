<?php
if ( ! defined( 'ABSPATH' ) ) exit;
$related = get_posts( array( 'post_type' => 'post', 'posts_per_page' => 2, 'post__not_in' => array( get_the_ID() ) ) );
$wrapper = get_block_wrapper_attributes( array( 'class' => 'paz-related-content' ) );
?>
<section <?php echo $wrapper; ?> style="padding: 2rem; border: 1px solid var(--wp--preset--color--border); border-radius: 1.5rem; background: var(--wp--preset--color--card);">
    <h3 style="margin-bottom: 1.5rem;">Related Reading</h3>
    <div style="display: grid; gap: 1rem; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));">
        <?php foreach ( $related as $post ) : ?>
            <a href="<?php echo get_permalink( $post ); ?>" style="display: block; padding: 1rem; border: 1px solid var(--wp--preset--color--border); border-radius: 1rem; text-decoration: none; color: inherit;">
                <h4 style="margin: 0; font-size: 1rem;"><?php echo get_the_title( $post ); ?></h4>
            </a>
        <?php endforeach; ?>
    </div>
</section>
