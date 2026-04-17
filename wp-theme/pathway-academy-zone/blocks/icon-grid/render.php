<?php
if ( ! defined( 'ABSPATH' ) ) exit;
$wrapper = get_block_wrapper_attributes( array( 'class' => 'paz-icon-grid' ) );
?>
<div <?php echo $wrapper; ?> style="display:grid; gap:2rem; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); padding-block: 3rem;">
    <div style="text-align: center;">
        <div style="width: 3rem; height: 3rem; background: var(--wp--preset--color--primary-soft); color: var(--wp--preset--color--primary); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem;">
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
        </div>
        <h4 style="margin-bottom: 0.5rem;">Feature One</h4>
        <p style="font-size: 0.9rem; color: var(--wp--preset--color--muted-foreground);">Description of the first feature in the icon grid.</p>
    </div>
</div>
