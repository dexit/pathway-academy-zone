<?php
/**
 * Title: Partners Grid
 * Slug: pathway-academy-zone/partners-grid
 * Categories: paz
 * Keywords: partners, schools, organisations, logos
 * Description: Grid of partner organisations pulled from the paz_partner CPT.
 */
?>
<!-- wp:group {"style":{"spacing":{"padding":{"top":"5rem","bottom":"5rem"}}},"backgroundColor":"muted","layout":{"type":"constrained"}} -->
<div class="wp-block-group has-muted-background-color has-background" style="padding-top:5rem;padding-bottom:5rem">

	<!-- wp:heading {"textAlign":"center","level":2,"style":{"typography":{"fontWeight":"800","fontSize":"clamp(1.75rem,3vw,2.5rem)"}}} -->
	<h2 class="wp-block-heading has-text-align-center" style="font-weight:800;font-size:clamp(1.75rem,3vw,2.5rem)"><?php esc_html_e( 'Our Partners', 'pathway-academy-zone' ); ?></h2>
	<!-- /wp:heading -->

	<!-- wp:paragraph {"align":"center","textColor":"muted-foreground","style":{"spacing":{"margin":{"bottom":"3rem"}}}} -->
	<p class="has-text-align-center has-muted-foreground-color has-text-color" style="margin-bottom:3rem"><?php esc_html_e( 'Working alongside schools, local authorities, and specialist services to support young people across Staffordshire.', 'pathway-academy-zone' ); ?></p>
	<!-- /wp:paragraph -->

	<!-- wp:query {"query":{"postType":"paz_partner","perPage":12,"order":"asc","orderBy":"title"},"layout":{"type":"default"}} -->
	<div class="wp-block-query">
		<!-- wp:post-template {"layout":{"type":"grid","columnCount":4}} -->
			<!-- wp:group {"style":{"border":{"radius":"0.75rem","width":"1px","color":"var(--wp--preset--color--border)"},"spacing":{"padding":{"top":"1.5rem","right":"1.5rem","bottom":"1.5rem","left":"1.5rem"}}},"backgroundColor":"card","className":"is-style-card-hover"} -->
			<div class="wp-block-group has-card-background-color has-background is-style-card-hover" style="border-color:var(--wp--preset--color--border);border-width:1px;border-radius:0.75rem;padding:1.5rem">
				<!-- wp:post-featured-image {"style":{"border":{"radius":"0.5rem"}},"height":"80px"} /-->
				<!-- wp:post-title {"level":4,"isLink":true,"style":{"typography":{"fontWeight":"600","fontSize":"0.875rem"},"spacing":{"margin":{"top":"1rem"}}}} /-->
				<!-- wp:post-excerpt {"moreText":"","excerptLength":15} /-->
			</div>
			<!-- /wp:group -->
		<!-- /wp:post-template -->
	</div>
	<!-- /wp:query -->

</div>
<!-- /wp:group -->
