<?php
if ( ! defined( 'ABSPATH' ) ) exit;
$content = get_post_field( 'post_content', get_the_ID() );
$word_count = str_word_count( strip_tags( $content ) );
$reading_time = max( 1, ceil( $word_count / 230 ) );
$wrapper = get_block_wrapper_attributes( array( 'class' => 'paz-reading-time' ) );
?>
<div <?php echo $wrapper; ?> style="display: inline-flex; align-items: center; gap: 0.5rem; font-size: 0.875rem; color: var(--wp--preset--color--muted-foreground);">
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
    <span><?php echo $reading_time; ?> min read</span>
</div>
