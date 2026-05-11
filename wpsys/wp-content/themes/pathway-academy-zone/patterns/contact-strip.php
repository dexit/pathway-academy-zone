<?php
/**
 * Title: Contact Strip
 * Slug: pathway-academy-zone/contact-strip
 * Categories: paz, text, call-to-action
 * Block Types: core/columns
 * Description: 3-column contact bar showing address, phone, and email — each with an icon and link where appropriate.
 */
?>
<!-- wp:group {"align":"full","style":{"color":{"background":"var(--wp--preset--color--accent)"},"spacing":{"padding":{"top":"3rem","bottom":"3rem","left":"2rem","right":"2rem"}}},"layout":{"type":"constrained","wideSize":"1200px"}} -->
<div class="wp-block-group alignfull has-background" style="background-color:var(--wp--preset--color--accent);padding-top:3rem;padding-bottom:3rem;padding-left:2rem;padding-right:2rem">

    <!-- wp:columns {"style":{"spacing":{"blockGap":{"left":"2rem"}}}} -->
    <div class="wp-block-columns">

        <!-- wp:column -->
        <div class="wp-block-column">
            <!-- wp:group {"layout":{"type":"flex","flexWrap":"nowrap","verticalAlignment":"top"},"style":{"spacing":{"blockGap":"1rem"}}} -->
            <div class="wp-block-group">
                <!-- wp:html -->
                <div style="flex-shrink:0;width:44px;height:44px;border-radius:50%;background:var(--wp--preset--color--primary);display:flex;align-items:center;justify-content:center;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                </div>
                <!-- /wp:html -->
                <!-- wp:group {"layout":{"type":"flex","orientation":"vertical"},"style":{"spacing":{"blockGap":"0.25rem"}}} -->
                <div class="wp-block-group">
                    <!-- wp:heading {"level":4,"style":{"typography":{"fontSize":"0.8125rem","fontWeight":"700","letterSpacing":"0.08em","textTransform":"uppercase"},"color":{"text":"var(--wp--preset--color--accent-foreground)"},"spacing":{"margin":{"top":"0","bottom":"0"}}}} -->
                    <h4 class="wp-block-heading has-text-color" style="color:var(--wp--preset--color--accent-foreground);font-size:0.8125rem;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;margin:0">Our Address</h4>
                    <!-- /wp:heading -->
                    <!-- wp:paragraph {"style":{"typography":{"fontSize":"0.9375rem","lineHeight":"1.55"},"color":{"text":"var(--wp--preset--color--accent-foreground)"},"spacing":{"margin":{"top":"0.25rem","bottom":"0"}}}} -->
                    <p class="has-text-color" style="color:var(--wp--preset--color--accent-foreground);font-size:0.9375rem;line-height:1.55;margin-top:0.25rem;margin-bottom:0">Duncalf St, Burslem,<br/>Stoke-on-Trent ST6 3LJ</p>
                    <!-- /wp:paragraph -->
                </div>
                <!-- /wp:group -->
            </div>
            <!-- /wp:group -->
        </div>
        <!-- /wp:column -->

        <!-- wp:column -->
        <div class="wp-block-column">
            <!-- wp:group {"layout":{"type":"flex","flexWrap":"nowrap","verticalAlignment":"top"},"style":{"spacing":{"blockGap":"1rem"}}} -->
            <div class="wp-block-group">
                <!-- wp:html -->
                <div style="flex-shrink:0;width:44px;height:44px;border-radius:50%;background:var(--wp--preset--color--primary);display:flex;align-items:center;justify-content:center;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.18 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21.73 16z"/></svg>
                </div>
                <!-- /wp:html -->
                <!-- wp:group {"layout":{"type":"flex","orientation":"vertical"},"style":{"spacing":{"blockGap":"0.25rem"}}} -->
                <div class="wp-block-group">
                    <!-- wp:heading {"level":4,"style":{"typography":{"fontSize":"0.8125rem","fontWeight":"700","letterSpacing":"0.08em","textTransform":"uppercase"},"color":{"text":"var(--wp--preset--color--accent-foreground)"},"spacing":{"margin":{"top":"0","bottom":"0"}}}} -->
                    <h4 class="wp-block-heading has-text-color" style="color:var(--wp--preset--color--accent-foreground);font-size:0.8125rem;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;margin:0">Call Us</h4>
                    <!-- /wp:heading -->
                    <!-- wp:paragraph {"style":{"typography":{"fontSize":"0.9375rem","lineHeight":"1.55"},"color":{"text":"var(--wp--preset--color--accent-foreground)"},"spacing":{"margin":{"top":"0.25rem","bottom":"0"}}}} -->
                    <p class="has-text-color" style="color:var(--wp--preset--color--accent-foreground);font-size:0.9375rem;line-height:1.55;margin-top:0.25rem;margin-bottom:0"><a href="tel:01782365365" style="color:inherit;font-weight:600;text-decoration:none;">01782 365365</a><br/><span style="font-size:0.8125rem;opacity:0.75;">Mon–Fri, 8:30am–4:30pm</span></p>
                    <!-- /wp:paragraph -->
                </div>
                <!-- /wp:group -->
            </div>
            <!-- /wp:group -->
        </div>
        <!-- /wp:column -->

        <!-- wp:column -->
        <div class="wp-block-column">
            <!-- wp:group {"layout":{"type":"flex","flexWrap":"nowrap","verticalAlignment":"top"},"style":{"spacing":{"blockGap":"1rem"}}} -->
            <div class="wp-block-group">
                <!-- wp:html -->
                <div style="flex-shrink:0;width:44px;height:44px;border-radius:50%;background:var(--wp--preset--color--primary);display:flex;align-items:center;justify-content:center;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                </div>
                <!-- /wp:html -->
                <!-- wp:group {"layout":{"type":"flex","orientation":"vertical"},"style":{"spacing":{"blockGap":"0.25rem"}}} -->
                <div class="wp-block-group">
                    <!-- wp:heading {"level":4,"style":{"typography":{"fontSize":"0.8125rem","fontWeight":"700","letterSpacing":"0.08em","textTransform":"uppercase"},"color":{"text":"var(--wp--preset--color--accent-foreground)"},"spacing":{"margin":{"top":"0","bottom":"0"}}}} -->
                    <h4 class="wp-block-heading has-text-color" style="color:var(--wp--preset--color--accent-foreground);font-size:0.8125rem;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;margin:0">Email Us</h4>
                    <!-- /wp:heading -->
                    <!-- wp:paragraph {"style":{"typography":{"fontSize":"0.9375rem","lineHeight":"1.55"},"color":{"text":"var(--wp--preset--color--accent-foreground)"},"spacing":{"margin":{"top":"0.25rem","bottom":"0"}}}} -->
                    <p class="has-text-color" style="color:var(--wp--preset--color--accent-foreground);font-size:0.9375rem;line-height:1.55;margin-top:0.25rem;margin-bottom:0"><a href="mailto:info@pathwayacademyzone.co.uk" style="color:inherit;font-weight:600;text-decoration:none;word-break:break-all;">info@pathwayacademyzone.co.uk</a><br/><span style="font-size:0.8125rem;opacity:0.75;">We aim to reply within 24 hours</span></p>
                    <!-- /wp:paragraph -->
                </div>
                <!-- /wp:group -->
            </div>
            <!-- /wp:group -->
        </div>
        <!-- /wp:column -->

    </div>
    <!-- /wp:columns -->

</div>
<!-- /wp:group -->
