<?php
if ( ! defined( 'ABSPATH' ) ) exit;
if ( ! is_singular() ) return;

$prefix = sanitize_text_field( $attributes['prefix'] ?? 'Estimated read:' );
$suffix = sanitize_text_field( $attributes['suffix'] ?? 'min read' );
$wpm    = max( 50, absint( $attributes['wordsPerMinute'] ?? 200 ) );

$content = get_the_content( null, false, get_queried_object_id() );
$words   = str_word_count( wp_strip_all_tags( $content ) );
$minutes = max( 1, (int) ceil( $words / $wpm ) );

$wrapper = get_block_wrapper_attributes( array( 'class' => 'paz-reading-time' ) );
?>
<p <?php echo $wrapper; ?> role="note" style="display:inline-flex;align-items:center;gap:0.4rem;font-size:0.8rem;color:var(--wp--preset--color--muted-foreground);background:var(--wp--preset--color--muted);padding:0.3rem 0.8rem;border-radius:9999px;">
	<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
	<?php echo esc_html( $prefix ); ?> <strong><?php echo esc_html( $minutes ); ?></strong> <?php echo esc_html( $suffix ); ?>
</p>
