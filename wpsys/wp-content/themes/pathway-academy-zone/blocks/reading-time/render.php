<?php
if ( ! defined( 'ABSPATH' ) ) die();
$content = get_post_field( 'post_content', get_the_ID() );
$word_count = str_word_count( strip_tags( $content ) );
$reading_time = ceil( $word_count / 200 ); // 200 wpm
?>
<div class="paz-reading-time flex items-center gap-1 text-sm text-muted-foreground">
    <span><?php echo esc_html( $reading_time ); ?> min read</span>
</div>
