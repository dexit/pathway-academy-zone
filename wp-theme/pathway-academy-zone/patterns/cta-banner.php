<?php
/**
 * Title: CTA Banner
 * Slug: pathway-academy-zone/cta-banner
 * Categories: paz, call-to-action, featured
 * Block Types: core/group
 * Description: Full-width primary background call-to-action with centred heading, paragraph, and two side-by-side buttons.
 */
?>
<!-- wp:group {"align":"full","style":{"color":{"background":"var(--wp--preset--color--primary)","text":"#ffffff"},"spacing":{"padding":{"top":"5rem","bottom":"5rem","left":"2rem","right":"2rem"}}},"layout":{"type":"constrained","wideSize":"860px"}} -->
<div class="wp-block-group alignfull has-text-color has-background" style="background-color:var(--wp--preset--color--primary);color:#ffffff;padding-top:5rem;padding-bottom:5rem;padding-left:2rem;padding-right:2rem">

    <!-- wp:heading {"textAlign":"center","level":2,"style":{"typography":{"fontSize":"clamp(1.875rem,3vw + 1rem,2.75rem)","fontWeight":"800","lineHeight":"1.15"},"color":{"text":"#ffffff"},"spacing":{"margin":{"top":"0","bottom":"1rem"}}}} -->
    <h2 class="wp-block-heading has-text-align-center has-text-color" style="color:#ffffff;font-size:clamp(1.875rem,3vw + 1rem,2.75rem);font-weight:800;line-height:1.15;margin-top:0;margin-bottom:1rem">Ready to make a referral?</h2>
    <!-- /wp:heading -->

    <!-- wp:paragraph {"align":"center","style":{"typography":{"fontSize":"1.0625rem","lineHeight":"1.65"},"color":{"text":"rgba(255,255,255,0.85)"},"spacing":{"margin":{"top":"0","bottom":"2.5rem"}}}} -->
    <p class="has-text-align-center has-text-color" style="color:rgba(255,255,255,0.85);font-size:1.0625rem;line-height:1.65;margin-top:0;margin-bottom:2.5rem">Our team can support your school or local authority with a fast, straightforward referral process. Get in touch today and we&#8217;ll guide you through every step.</p>
    <!-- /wp:paragraph -->

    <!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center","flexWrap":"wrap"},"style":{"spacing":{"blockGap":"1rem"}}} -->
    <div class="wp-block-buttons">
        <!-- wp:button {"style":{"color":{"background":"#ffffff","text":"var(--wp--preset--color--primary)"},"border":{"radius":"0.75rem"},"spacing":{"padding":{"top":"0.875rem","bottom":"0.875rem","left":"2rem","right":"2rem"}},"typography":{"fontWeight":"700"}}} -->
        <div class="wp-block-button"><a class="wp-block-button__link wp-element-button" href="/referral" style="background-color:#ffffff;color:var(--wp--preset--color--primary);border-radius:0.75rem;font-weight:700;padding:0.875rem 2rem">Make a Referral</a></div>
        <!-- /wp:button -->
        <!-- wp:button {"className":"is-style-outline","style":{"color":{"text":"#ffffff"},"border":{"radius":"0.75rem","color":"rgba(255,255,255,0.55)","width":"2px"},"spacing":{"padding":{"top":"0.875rem","bottom":"0.875rem","left":"2rem","right":"2rem"}},"typography":{"fontWeight":"600"}}} -->
        <div class="wp-block-button is-style-outline"><a class="wp-block-button__link wp-element-button" href="/contact" style="color:#ffffff;border:2px solid rgba(255,255,255,0.55);border-radius:0.75rem;font-weight:600;padding:0.875rem 2rem">Contact Us</a></div>
        <!-- /wp:button -->
    </div>
    <!-- /wp:buttons -->

</div>
<!-- /wp:group -->
