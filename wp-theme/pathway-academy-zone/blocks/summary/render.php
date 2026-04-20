<?php
if ( ! defined( 'ABSPATH' ) ) exit;
$wrapper = get_block_wrapper_attributes( array( 'class' => 'paz-summary' ) );
?>
<aside <?php echo $wrapper; ?> style="background: var(--wp--preset--color--primary-soft); border: 1px solid var(--wp--preset--color--primary); border-radius: 1rem; padding: 1.5rem; margin-bottom: 2.5rem;">
    <p style="text-transform: uppercase; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.05em; color: var(--wp--preset--color--primary); margin-bottom: 0.5rem;">Summary</p>
    <p style="margin: 0; font-size: 1.1rem; line-height: 1.5; color: var(--wp--preset--color--foreground);">
        <?php echo has_excerpt() ? get_the_excerpt() : 'Summary of the article content goes here. It provides a quick overview for readers.'; ?>
    </p>
</aside>
