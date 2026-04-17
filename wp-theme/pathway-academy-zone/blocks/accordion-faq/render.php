<?php
if ( ! defined( 'ABSPATH' ) ) exit;
$wrapper = get_block_wrapper_attributes( array( 'class' => 'paz-accordion-faq' ) );
?>
<div <?php echo $wrapper; ?> style="max-width:800px;margin:0 auto;padding-block:2rem;">
    <details style="border-bottom: 1px solid var(--wp--preset--color--border); padding-block: 1rem;">
        <summary style="font-weight: 600; cursor: pointer; list-style: none; display: flex; justify-content: space-between; align-items: center;">
            Sample FAQ Question?
            <span style="font-size: 1.2rem;">+</span>
        </summary>
        <div style="padding-top: 1rem; color: var(--wp--preset--color--muted-foreground);">
            Sample FAQ Answer goes here. This is a placeholder for the interactive FAQ block.
        </div>
    </details>
</div>
