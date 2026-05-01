<?php
/**
 * Title: Hero Primary
 * Slug: pathway-academy-zone/hero-primary
 * Categories: paz, featured, call-to-action
 * Block Types: core/group
 * Description: Full-width hero section with primary background, H1 heading, subheading, dual CTA buttons, and breadcrumb row.
 */
?>
<!-- wp:group {"align":"full","style":{"color":{"background":"var(--wp--preset--color--primary)","text":"#ffffff"},"spacing":{"padding":{"top":"5rem","bottom":"5rem","left":"2rem","right":"2rem"}}},"layout":{"type":"constrained","wideSize":"1200px"}} -->
<div class="wp-block-group alignfull has-text-color has-background" style="background-color:var(--wp--preset--color--primary);color:#ffffff;padding-top:5rem;padding-bottom:5rem;padding-left:2rem;padding-right:2rem">

    <!-- wp:paragraph {"style":{"typography":{"fontSize":"0.8125rem","letterSpacing":"0.15em","textTransform":"uppercase","fontWeight":"600"},"color":{"text":"rgba(255,255,255,0.7)"},"spacing":{"margin":{"bottom":"0.75rem","top":"0"}}}} -->
    <p class="has-text-color" style="color:rgba(255,255,255,0.7);font-size:0.8125rem;font-weight:600;letter-spacing:0.15em;text-transform:uppercase;margin-top:0;margin-bottom:0.75rem">Home &rsaquo; Alternative Provision</p>
    <!-- /wp:paragraph -->

    <!-- wp:heading {"level":1,"style":{"typography":{"fontSize":"clamp(2.5rem, 5vw + 1rem, 4.5rem)","lineHeight":"1.05","fontWeight":"800"},"color":{"text":"#ffffff"},"spacing":{"margin":{"top":"0","bottom":"1.25rem"}}}} -->
    <h1 class="wp-block-heading has-text-color" style="color:#ffffff;font-size:clamp(2.5rem, 5vw + 1rem, 4.5rem);font-weight:800;line-height:1.05;margin-top:0;margin-bottom:1.25rem">Helping young people thrive through relational education.</h1>
    <!-- /wp:heading -->

    <!-- wp:paragraph {"style":{"typography":{"fontSize":"1.125rem","lineHeight":"1.65"},"color":{"text":"rgba(255,255,255,0.85)"},"spacing":{"margin":{"top":"0","bottom":"2rem"}}}} -->
    <p class="has-text-color" style="color:rgba(255,255,255,0.85);font-size:1.125rem;line-height:1.65;margin-top:0;margin-bottom:2rem">Trauma-informed, small-group alternative provision for learners aged 11–16 across Staffordshire &amp; the West Midlands. Referrals welcome from schools, Local Authorities, and family workers.</p>
    <!-- /wp:paragraph -->

    <!-- wp:buttons {"layout":{"type":"flex","flexWrap":"wrap"},"style":{"spacing":{"blockGap":"1rem"}}} -->
    <div class="wp-block-buttons">
        <!-- wp:button {"style":{"color":{"background":"var(--wp--preset--color--accent)","text":"var(--wp--preset--color--accent-foreground)"},"border":{"radius":"0.75rem"},"spacing":{"padding":{"top":"0.875rem","bottom":"0.875rem","left":"2rem","right":"2rem"}},"typography":{"fontWeight":"600"}}} -->
        <div class="wp-block-button"><a class="wp-block-button__link wp-element-button" href="/referral" style="background-color:var(--wp--preset--color--accent);color:var(--wp--preset--color--accent-foreground);border-radius:0.75rem;font-weight:600;padding:0.875rem 2rem">Make a Referral</a></div>
        <!-- /wp:button -->
        <!-- wp:button {"className":"is-style-outline","style":{"color":{"text":"#ffffff"},"border":{"radius":"0.75rem","color":"rgba(255,255,255,0.6)","width":"2px"},"spacing":{"padding":{"top":"0.875rem","bottom":"0.875rem","left":"2rem","right":"2rem"}},"typography":{"fontWeight":"600"}}} -->
        <div class="wp-block-button is-style-outline"><a class="wp-block-button__link wp-element-button" href="/about" style="color:#ffffff;border:2px solid rgba(255,255,255,0.6);border-radius:0.75rem;font-weight:600;padding:0.875rem 2rem">Learn More</a></div>
        <!-- /wp:button -->
    </div>
    <!-- /wp:buttons -->

</div>
<!-- /wp:group -->
