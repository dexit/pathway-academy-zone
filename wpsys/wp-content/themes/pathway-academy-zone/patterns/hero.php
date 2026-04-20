<?php
/**
 * Title: Hero
 * Slug: pathway-academy-zone/hero
 * Categories: paz, featured
 * Keywords: hero, banner, front-page
 * Block Types: core/post-content
 * Description: Full-bleed homepage hero with image overlay, eyebrow, headline, sub-headline and dual CTAs.
 */
?>
<!-- wp:cover {"url":"https://pathwayacademyzone.co.uk/assets/hero-classroom-DbPVpPfr.jpg","dimRatio":60,"minHeight":82,"minHeightUnit":"vh","contentPosition":"center center","isDark":true,"align":"full"} -->
<div class="wp-block-cover alignfull is-light" style="min-height:82vh">
	<span aria-hidden="true" class="wp-block-cover__background has-background-dim-60 has-background-dim"></span>
	<img class="wp-block-cover__image-background" alt="Students in an Alternative Provision classroom in Stoke-on-Trent" src="https://pathwayacademyzone.co.uk/assets/hero-classroom-DbPVpPfr.jpg" data-object-fit="cover"/>
	<div class="wp-block-cover__inner-container">
		<!-- wp:group {"layout":{"type":"constrained"},"style":{"spacing":{"padding":{"top":"6rem","bottom":"6rem"}}}} -->
		<div class="wp-block-group" style="padding-top:6rem;padding-bottom:6rem">
			<!-- wp:paragraph {"style":{"typography":{"fontSize":"0.875rem","letterSpacing":"0.2em","textTransform":"uppercase","fontWeight":"600"}},"textColor":"primary-soft"} -->
			<p class="has-primary-soft-color has-text-color" style="font-size:0.875rem;font-weight:600;letter-spacing:0.2em;text-transform:uppercase">Alternative Provision · Stoke-on-Trent</p>
			<!-- /wp:paragraph -->

			<!-- wp:heading {"level":1,"style":{"typography":{"fontSize":"clamp(2.5rem, 5vw + 1rem, 4.5rem)","lineHeight":"1.05","fontWeight":"800"}}} -->
			<h1 class="wp-block-heading" style="font-size:clamp(2.5rem, 5vw + 1rem, 4.5rem);font-weight:800;line-height:1.05">Helping young people thrive through relational education.</h1>
			<!-- /wp:heading -->

			<!-- wp:paragraph {"style":{"typography":{"fontSize":"1.125rem","lineHeight":"1.6"}}} -->
			<p style="font-size:1.125rem;line-height:1.6">Trauma-informed, small-group provision for learners aged 11&#8211;16 across Stoke-on-Trent and Staffordshire. Referrals welcome from schools, Local Authorities and family workers.</p>
			<!-- /wp:paragraph -->

			<!-- wp:buttons {"layout":{"type":"flex","flexWrap":"wrap"}} -->
			<div class="wp-block-buttons">
				<!-- wp:button --><div class="wp-block-button"><a class="wp-block-button__link wp-element-button" href="/referral">Make a Referral</a></div><!-- /wp:button -->
				<!-- wp:button {"className":"is-style-outline"} --><div class="wp-block-button is-style-outline"><a class="wp-block-button__link wp-element-button" href="/programmes">Our Programmes</a></div><!-- /wp:button -->
			</div>
			<!-- /wp:buttons -->
		</div>
		<!-- /wp:group -->
	</div>
</div>
<!-- /wp:cover -->
