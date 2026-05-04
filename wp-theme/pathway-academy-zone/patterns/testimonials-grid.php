<?php
/**
 * Title: Testimonials Grid
 * Slug: pathway-academy-zone/testimonials-grid
 * Categories: paz, featured
 * Keywords: testimonials, reviews, quotes, social proof
 * Description: A masonry-style grid of testimonial quote cards pulled from the paz_testimonial CPT.
 */
?>
<!-- wp:group {"style":{"spacing":{"padding":{"top":"5rem","bottom":"5rem"}}},"layout":{"type":"constrained"}} -->
<div class="wp-block-group" style="padding-top:5rem;padding-bottom:5rem">

	<!-- wp:heading {"textAlign":"center","level":2,"style":{"typography":{"fontWeight":"800","fontSize":"clamp(1.75rem,3vw,2.5rem)"}}} -->
	<h2 class="wp-block-heading has-text-align-center" style="font-weight:800;font-size:clamp(1.75rem,3vw,2.5rem)"><?php esc_html_e( 'What People Say About Us', 'pathway-academy-zone' ); ?></h2>
	<!-- /wp:heading -->

	<!-- wp:paragraph {"align":"center","textColor":"muted-foreground","style":{"spacing":{"margin":{"bottom":"3rem"}}}} -->
	<p class="has-text-align-center has-muted-foreground-color has-text-color" style="margin-bottom:3rem"><?php esc_html_e( 'Real feedback from the schools, families, and young people we work with every day.', 'pathway-academy-zone' ); ?></p>
	<!-- /wp:paragraph -->

	<!-- wp:query {"query":{"postType":"paz_testimonial","perPage":9,"order":"desc","orderBy":"date"},"layout":{"type":"default"}} -->
	<div class="wp-block-query">
		<!-- wp:post-template {"layout":{"type":"grid","columnCount":3}} -->
			<!-- wp:group {"style":{"border":{"radius":"1rem","width":"1px","color":"var(--wp--preset--color--border)"},"spacing":{"padding":{"top":"1.75rem","right":"1.75rem","bottom":"1.75rem","left":"1.75rem"}}},"backgroundColor":"card"} -->
			<div class="wp-block-group has-card-background-color has-background" style="border-color:var(--wp--preset--color--border);border-width:1px;border-radius:1rem;padding:1.75rem">
				<!-- wp:paragraph {"style":{"typography":{"fontStyle":"italic","fontSize":"0.95rem"},"spacing":{"margin":{"bottom":"1.25rem"}}}} -->
				<p class="wp-block-paragraph" style="font-style:italic;font-size:0.95rem;margin-bottom:1.25rem"><!-- wp:post-excerpt {"moreText":"","excerptLength":60} /--></p>
				<!-- /wp:paragraph -->
				<!-- wp:post-title {"level":5,"isLink":false,"style":{"typography":{"fontWeight":"600","fontSize":"0.9rem"}}} /-->
			</div>
			<!-- /wp:group -->
		<!-- /wp:post-template -->

		<!-- wp:query-pagination {"layout":{"type":"flex","justifyContent":"center"},"style":{"spacing":{"margin":{"top":"3rem"}}}} -->
			<!-- wp:query-pagination-previous /-->
			<!-- wp:query-pagination-numbers /-->
			<!-- wp:query-pagination-next /-->
		<!-- /wp:query-pagination -->
	</div>
	<!-- /wp:query -->

</div>
<!-- /wp:group -->
