<?php
/**
 * Title: Testimonials Section
 * Slug: pathway-academy-zone/testimonials
 * Categories: paz
 */
?>
<!-- wp:group {"align":"full","style":{"spacing":{"padding":{"top":"5rem","bottom":"5rem"}}},"backgroundColor":"muted","layout":{"type":"constrained"}} -->
<div class="wp-block-group alignfull has-muted-background-color has-background" style="padding-top:5rem;padding-bottom:5rem">
    <!-- wp:heading {"textAlign":"center"} -->
    <h2 class="wp-block-heading has-text-align-center">What People Say</h2>
    <!-- /wp:heading -->
    <!-- wp:query {"queryId":3,"query":{"postType":"paz_testimonial","postsPerPage":3}} -->
    <div class="wp-block-query">
        <!-- wp:post-template {"layout":{"type":"grid","columnCount":3}} -->
        <!-- wp:pazone/quote-card -->
        <!-- wp:post-content /-->
        <!-- /wp:pazone/quote-card -->
        <!-- /wp:post-template -->
    </div>
    <!-- /wp:query -->
</div>
<!-- /wp:group -->
