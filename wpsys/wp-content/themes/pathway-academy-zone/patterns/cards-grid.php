<?php
/**
 * Title: Cards Grid
 * Slug: pathway-academy-zone/cards-grid
 * Categories: paz, featured, text
 * Block Types: core/columns
 * Description: 3-column card grid with icon placeholder, heading, description, and read-more link — for programmes or features.
 */
?>
<!-- wp:group {"align":"full","style":{"spacing":{"padding":{"top":"5rem","bottom":"5rem","left":"2rem","right":"2rem"}}},"backgroundColor":"background","layout":{"type":"constrained","wideSize":"1200px"}} -->
<div class="wp-block-group alignfull has-background-background-color has-background" style="padding-top:5rem;padding-bottom:5rem;padding-left:2rem;padding-right:2rem">

    <!-- wp:group {"style":{"spacing":{"margin":{"bottom":"3rem"}}},"layout":{"type":"constrained"}} -->
    <div class="wp-block-group" style="margin-bottom:3rem">
        <!-- wp:heading {"textAlign":"center","level":2,"style":{"typography":{"fontSize":"var(--wp--preset--font-size--4xl)","fontWeight":"700","lineHeight":"1.15"}}} -->
        <h2 class="wp-block-heading has-text-align-center" style="font-size:var(--wp--preset--font-size--4xl);font-weight:700;line-height:1.15">Our Programmes</h2>
        <!-- /wp:heading -->
        <!-- wp:paragraph {"align":"center","style":{"typography":{"fontSize":"1.0625rem","lineHeight":"1.65"},"color":{"text":"var(--wp--preset--color--muted-foreground)"},"spacing":{"margin":{"top":"0.75rem"}}}} -->
        <p class="has-text-align-center has-text-color" style="color:var(--wp--preset--color--muted-foreground);font-size:1.0625rem;line-height:1.65;margin-top:0.75rem">Tailored provision pathways designed to re-engage young people with education and their future.</p>
        <!-- /wp:paragraph -->
    </div>
    <!-- /wp:group -->

    <!-- wp:columns {"style":{"spacing":{"blockGap":{"left":"1.5rem","top":"1.5rem"}}}} -->
    <div class="wp-block-columns">

        <!-- wp:column -->
        <div class="wp-block-column">
            <!-- wp:group {"className":"is-style-card-hover","style":{"border":{"radius":"0.75rem","color":"var(--wp--preset--color--border)","width":"1px"},"spacing":{"padding":{"top":"2rem","bottom":"2rem","left":"1.75rem","right":"1.75rem"}},"color":{"background":"var(--wp--preset--color--card)"}},"layout":{"type":"flex","orientation":"vertical"}} -->
            <div class="wp-block-group is-style-card-hover" style="border:1px solid var(--wp--preset--color--border);border-radius:0.75rem;padding:2rem 1.75rem;background-color:var(--wp--preset--color--card)">
                <!-- wp:html -->
                <div style="width:48px;height:48px;border-radius:12px;background:var(--wp--preset--color--accent);display:flex;align-items:center;justify-content:center;margin-bottom:1.25rem;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--wp--preset--color--primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
                </div>
                <!-- /wp:html -->
                <!-- wp:heading {"level":3,"style":{"typography":{"fontSize":"1.25rem","fontWeight":"700"},"spacing":{"margin":{"top":"0","bottom":"0.75rem"}}}} -->
                <h3 class="wp-block-heading" style="font-size:1.25rem;font-weight:700;margin-top:0;margin-bottom:0.75rem">Core Curriculum</h3>
                <!-- /wp:heading -->
                <!-- wp:paragraph {"style":{"typography":{"fontSize":"0.9375rem","lineHeight":"1.6"},"color":{"text":"var(--wp--preset--color--muted-foreground)"},"spacing":{"margin":{"top":"0","bottom":"1.5rem"}}}} -->
                <p class="has-text-color" style="color:var(--wp--preset--color--muted-foreground);font-size:0.9375rem;line-height:1.6;margin-top:0;margin-bottom:1.5rem">Accredited qualifications in English, maths, and vocational subjects delivered in a nurturing small-group environment.</p>
                <!-- /wp:paragraph -->
                <!-- wp:paragraph {"style":{"typography":{"fontSize":"0.9375rem","fontWeight":"600"},"color":{"text":"var(--wp--preset--color--primary)"}}} -->
                <p class="has-text-color" style="color:var(--wp--preset--color--primary);font-size:0.9375rem;font-weight:600"><a href="/programmes/core-curriculum" style="color:inherit;text-decoration:none;">Read more &#8594;</a></p>
                <!-- /wp:paragraph -->
            </div>
            <!-- /wp:group -->
        </div>
        <!-- /wp:column -->

        <!-- wp:column -->
        <div class="wp-block-column">
            <!-- wp:group {"className":"is-style-card-hover","style":{"border":{"radius":"0.75rem","color":"var(--wp--preset--color--border)","width":"1px"},"spacing":{"padding":{"top":"2rem","bottom":"2rem","left":"1.75rem","right":"1.75rem"}},"color":{"background":"var(--wp--preset--color--card)"}},"layout":{"type":"flex","orientation":"vertical"}} -->
            <div class="wp-block-group is-style-card-hover" style="border:1px solid var(--wp--preset--color--border);border-radius:0.75rem;padding:2rem 1.75rem;background-color:var(--wp--preset--color--card)">
                <!-- wp:html -->
                <div style="width:48px;height:48px;border-radius:12px;background:var(--wp--preset--color--accent);display:flex;align-items:center;justify-content:center;margin-bottom:1.25rem;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--wp--preset--color--primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                </div>
                <!-- /wp:html -->
                <!-- wp:heading {"level":3,"style":{"typography":{"fontSize":"1.25rem","fontWeight":"700"},"spacing":{"margin":{"top":"0","bottom":"0.75rem"}}}} -->
                <h3 class="wp-block-heading" style="font-size:1.25rem;font-weight:700;margin-top:0;margin-bottom:0.75rem">Therapeutic Support</h3>
                <!-- /wp:heading -->
                <!-- wp:paragraph {"style":{"typography":{"fontSize":"0.9375rem","lineHeight":"1.6"},"color":{"text":"var(--wp--preset--color--muted-foreground)"},"spacing":{"margin":{"top":"0","bottom":"1.5rem"}}}} -->
                <p class="has-text-color" style="color:var(--wp--preset--color--muted-foreground);font-size:0.9375rem;line-height:1.6;margin-top:0;margin-bottom:1.5rem">Trauma-informed mentoring, pastoral care, and specialist SEMH support embedded into every learner's journey.</p>
                <!-- /wp:paragraph -->
                <!-- wp:paragraph {"style":{"typography":{"fontSize":"0.9375rem","fontWeight":"600"},"color":{"text":"var(--wp--preset--color--primary)"}}} -->
                <p class="has-text-color" style="color:var(--wp--preset--color--primary);font-size:0.9375rem;font-weight:600"><a href="/programmes/therapeutic-support" style="color:inherit;text-decoration:none;">Read more &#8594;</a></p>
                <!-- /wp:paragraph -->
            </div>
            <!-- /wp:group -->
        </div>
        <!-- /wp:column -->

        <!-- wp:column -->
        <div class="wp-block-column">
            <!-- wp:group {"className":"is-style-card-hover","style":{"border":{"radius":"0.75rem","color":"var(--wp--preset--color--border)","width":"1px"},"spacing":{"padding":{"top":"2rem","bottom":"2rem","left":"1.75rem","right":"1.75rem"}},"color":{"background":"var(--wp--preset--color--card)"}},"layout":{"type":"flex","orientation":"vertical"}} -->
            <div class="wp-block-group is-style-card-hover" style="border:1px solid var(--wp--preset--color--border);border-radius:0.75rem;padding:2rem 1.75rem;background-color:var(--wp--preset--color--card)">
                <!-- wp:html -->
                <div style="width:48px;height:48px;border-radius:12px;background:var(--wp--preset--color--accent);display:flex;align-items:center;justify-content:center;margin-bottom:1.25rem;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--wp--preset--color--primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
                </div>
                <!-- /wp:html -->
                <!-- wp:heading {"level":3,"style":{"typography":{"fontSize":"1.25rem","fontWeight":"700"},"spacing":{"margin":{"top":"0","bottom":"0.75rem"}}}} -->
                <h3 class="wp-block-heading" style="font-size:1.25rem;font-weight:700;margin-top:0;margin-bottom:0.75rem">Vocational Pathways</h3>
                <!-- /wp:heading -->
                <!-- wp:paragraph {"style":{"typography":{"fontSize":"0.9375rem","lineHeight":"1.6"},"color":{"text":"var(--wp--preset--color--muted-foreground)"},"spacing":{"margin":{"top":"0","bottom":"1.5rem"}}}} -->
                <p class="has-text-color" style="color:var(--wp--preset--color--muted-foreground);font-size:0.9375rem;line-height:1.6;margin-top:0;margin-bottom:1.5rem">Industry-linked programmes in construction, catering, hair &amp; beauty, and digital skills to build real-world confidence.</p>
                <!-- /wp:paragraph -->
                <!-- wp:paragraph {"style":{"typography":{"fontSize":"0.9375rem","fontWeight":"600"},"color":{"text":"var(--wp--preset--color--primary)"}}} -->
                <p class="has-text-color" style="color:var(--wp--preset--color--primary);font-size:0.9375rem;font-weight:600"><a href="/programmes/vocational" style="color:inherit;text-decoration:none;">Read more &#8594;</a></p>
                <!-- /wp:paragraph -->
            </div>
            <!-- /wp:group -->
        </div>
        <!-- /wp:column -->

    </div>
    <!-- /wp:columns -->

</div>
<!-- /wp:group -->
