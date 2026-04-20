<?php
if ( ! defined( 'ABSPATH' ) ) exit;
$wrapper = get_block_wrapper_attributes( array( 'class' => 'paz-quote-card' ) );
?>
<blockquote <?php echo $wrapper; ?> style="background: var(--wp--preset--color--card); border: 1px solid var(--wp--preset--color--border); border-radius: 1rem; padding: 2rem; position: relative;">
    <p style="font-size: 1.25rem; font-style: italic; margin-bottom: 1.5rem;">"The support from Pathway Academy Zone has been life-changing for our family."</p>
    <cite style="display: block; font-style: normal;">
        <strong style="display: block; color: var(--wp--preset--color--foreground);">Parent Name</strong>
        <span style="font-size: 0.875rem; color: var(--wp--preset--color--muted-foreground);">Stoke-on-Trent</span>
    </cite>
</blockquote>
