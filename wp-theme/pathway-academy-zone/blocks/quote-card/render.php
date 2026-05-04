<?php
if ( ! defined( 'ABSPATH' ) ) exit;

$quote  = wp_kses_post( $attributes['quote']  ?? '' );
$author = sanitize_text_field( $attributes['author'] ?? '' );
$role   = sanitize_text_field( $attributes['role']   ?? '' );
$school = sanitize_text_field( $attributes['school'] ?? '' );
$rating = max( 1, min( 5, absint( $attributes['rating'] ?? 5 ) ) );
$bg     = sanitize_text_field( $attributes['backgroundColour'] ?? 'accent' );

$bg_style = 'accent' === $bg
	? 'background:var(--wp--preset--color--accent);'
	: ( str_starts_with( $bg, '#' ) || str_starts_with( $bg, 'hsl' ) || str_starts_with( $bg, 'rgb' )
		? 'background:' . esc_attr( $bg ) . ';'
		: 'background:var(--wp--preset--color--' . esc_attr( $bg ) . ');' );

$stars     = str_repeat( '★', $rating ) . str_repeat( '☆', 5 - $rating );
$star_label = sprintf( _n( '%d out of 5 stars', '%d out of 5 stars', $rating, 'pathway-academy-zone' ), $rating );

$wrapper = get_block_wrapper_attributes( array( 'class' => 'paz-quote-card' ) );
?>
<div <?php echo $wrapper; ?> style="<?php echo $bg_style; ?>border-radius:1.25rem;padding:2rem;position:relative;max-width:640px;">
	<span aria-hidden="true" style="position:absolute;top:1rem;left:1.25rem;font-size:4rem;line-height:1;color:var(--wp--preset--color--primary);opacity:0.15;font-family:Georgia,serif;">&ldquo;</span>
	<?php if ( $rating ) : ?>
		<p style="margin:0 0 0.75rem;" aria-label="<?php echo esc_attr( $star_label ); ?>">
			<span aria-hidden="true" style="color:var(--wp--preset--color--primary);font-size:1rem;"><?php echo esc_html( $stars ); ?></span>
		</p>
	<?php endif; ?>
	<?php if ( $quote ) : ?>
		<blockquote style="margin:0 0 1.25rem;font-size:1.05rem;line-height:1.7;font-style:italic;position:relative;z-index:1;">
			<?php echo $quote; ?>
		</blockquote>
	<?php endif; ?>
	<?php if ( $author || $role || $school ) : ?>
		<footer style="font-size:0.875rem;">
			<?php if ( $author ) : ?>
				<strong style="display:block;"><?php echo esc_html( $author ); ?></strong>
			<?php endif; ?>
			<?php if ( $role || $school ) : ?>
				<span style="color:var(--wp--preset--color--muted-foreground);">
					<?php echo esc_html( implode( ', ', array_filter( array( $role, $school ) ) ) ); ?>
				</span>
			<?php endif; ?>
		</footer>
	<?php endif; ?>
</div>
