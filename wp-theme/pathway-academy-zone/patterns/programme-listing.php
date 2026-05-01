<?php
/**
 * Title: Programme Listing
 * Slug: pathway-academy-zone/programme-listing
 * Categories: paz, featured
 * Keywords: programmes, courses, AP, listing
 * Description: Full-width programme cards grid using the pazone/programme-card block.
 */
?>
<!-- wp:group {"style":{"spacing":{"padding":{"top":"5rem","bottom":"5rem"}}},"layout":{"type":"constrained"}} -->
<div class="wp-block-group" style="padding-top:5rem;padding-bottom:5rem">

	<!-- wp:heading {"textAlign":"center","level":2,"style":{"typography":{"fontWeight":"800","fontSize":"clamp(1.75rem,3vw,2.5rem)"}}} -->
	<h2 class="wp-block-heading has-text-align-center" style="font-weight:800;font-size:clamp(1.75rem,3vw,2.5rem)"><?php esc_html_e( 'Our Programmes', 'pathway-academy-zone' ); ?></h2>
	<!-- /wp:heading -->

	<!-- wp:paragraph {"align":"center","textColor":"muted-foreground","style":{"spacing":{"margin":{"bottom":"3rem"}}}} -->
	<p class="has-text-align-center has-muted-foreground-color has-text-color" style="margin-bottom:3rem"><?php esc_html_e( 'Specialist provision tailored to every young person's needs — academic, therapeutic, vocational, and beyond.', 'pathway-academy-zone' ); ?></p>
	<!-- /wp:paragraph -->

	<!-- wp:pazone/programme-card {"mode":"grid","columns":3,"limit":6,"showAreaFilter":false} /-->

	<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"},"style":{"spacing":{"margin":{"top":"2.5rem"}}}} -->
	<div class="wp-block-buttons">
		<!-- wp:button {"className":"is-style-pill"} --><div class="wp-block-button is-style-pill"><a class="wp-block-button__link wp-element-button" href="/programmes"><?php esc_html_e( 'View All Programmes', 'pathway-academy-zone' ); ?></a></div><!-- /wp:button -->
	</div>
	<!-- /wp:buttons -->

</div>
<!-- /wp:group -->
