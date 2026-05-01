<?php
/**
 * Title: Area Cards Grid
 * Slug: pathway-academy-zone/area-cards
 * Categories: paz
 * Keywords: areas, locations, alternative provision, geographic
 * Description: A card grid for the areas served, linking to each paz_area CPT page.
 */
?>
<!-- wp:group {"style":{"spacing":{"padding":{"top":"5rem","bottom":"5rem"}}},"backgroundColor":"muted","layout":{"type":"constrained"}} -->
<div class="wp-block-group has-muted-background-color has-background" style="padding-top:5rem;padding-bottom:5rem">

	<!-- wp:heading {"textAlign":"center","level":2,"style":{"typography":{"fontWeight":"800","fontSize":"clamp(1.75rem,3vw,2.5rem)"}}} -->
	<h2 class="wp-block-heading has-text-align-center" style="font-weight:800;font-size:clamp(1.75rem,3vw,2.5rem)"><?php esc_html_e( 'Areas We Serve', 'pathway-academy-zone' ); ?></h2>
	<!-- /wp:heading -->

	<!-- wp:paragraph {"align":"center","textColor":"muted-foreground","style":{"spacing":{"margin":{"bottom":"3rem"}}}} -->
	<p class="has-text-align-center has-muted-foreground-color has-text-color" style="margin-bottom:3rem"><?php esc_html_e( 'Delivering specialist Alternative Provision across Staffordshire and the West Midlands.', 'pathway-academy-zone' ); ?></p>
	<!-- /wp:paragraph -->

	<!-- wp:query {"query":{"postType":"paz_area","perPage":12,"order":"asc","orderBy":"title"},"layout":{"type":"default"}} -->
	<div class="wp-block-query">
		<!-- wp:post-template {"layout":{"type":"grid","columnCount":4}} -->
			<!-- wp:group {"style":{"border":{"radius":"0.75rem","width":"1px","color":"var(--wp--preset--color--border)"},"spacing":{"padding":{"top":"1.25rem","right":"1.25rem","bottom":"1.25rem","left":"1.25rem"}}},"backgroundColor":"card","className":"is-style-card-hover"} -->
			<div class="wp-block-group has-card-background-color has-background is-style-card-hover" style="border-color:var(--wp--preset--color--border);border-width:1px;border-radius:0.75rem;padding:1.25rem">
				<!-- wp:post-title {"level":4,"isLink":true,"style":{"typography":{"fontWeight":"700","fontSize":"1rem"}}} /-->
				<!-- wp:post-excerpt {"moreText":"","excerptLength":18} /-->
				<!-- wp:read-more {"content":"View AP in this area →","style":{"color":{"text":"var(--wp--preset--color--primary)"},"typography":{"fontSize":"0.8rem","fontWeight":"600"}}} /-->
			</div>
			<!-- /wp:group -->
		<!-- /wp:post-template -->
	</div>
	<!-- /wp:query -->

</div>
<!-- /wp:group -->
