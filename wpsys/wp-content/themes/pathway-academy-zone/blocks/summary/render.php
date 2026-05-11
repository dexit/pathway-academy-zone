<?php
if ( ! defined( 'ABSPATH' ) ) exit;

$heading = sanitize_text_field( $attributes['heading']      ?? 'Key Points' );
$icon    = sanitize_text_field( $attributes['icon']         ?? '✓' );
$points  = is_array( $attributes['points'] ?? null ) ? $attributes['points'] : array();
$accent  = sanitize_text_field( $attributes['accentColour'] ?? 'primary' );

$border_color = str_starts_with( $accent, '#' ) || str_starts_with( $accent, 'hsl' )
	? $accent
	: 'var(--wp--preset--color--' . esc_attr( $accent ) . ')';

$wrapper = get_block_wrapper_attributes( array( 'class' => 'paz-summary' ) );
?>
<aside <?php echo $wrapper; ?> style="border-left:4px solid <?php echo $border_color; ?>;background:var(--wp--preset--color--accent);border-radius:0 0.75rem 0.75rem 0;padding:1.5rem 1.75rem;max-width:700px;" aria-label="<?php echo esc_attr( $heading ); ?>">
	<p style="font-weight:700;font-size:0.85rem;text-transform:uppercase;letter-spacing:0.08em;color:<?php echo $border_color; ?>;margin:0 0 0.75rem;display:flex;align-items:center;gap:0.5rem;">
		<span aria-hidden="true"><?php echo esc_html( $icon ); ?></span>
		<?php echo esc_html( $heading ); ?>
	</p>
	<?php if ( $points ) : ?>
		<ul style="margin:0;padding:0;list-style:none;display:flex;flex-direction:column;gap:0.5rem;">
			<?php foreach ( $points as $point ) : ?>
				<li style="display:flex;align-items:flex-start;gap:0.6rem;font-size:0.92rem;line-height:1.5;">
					<span aria-hidden="true" style="color:<?php echo $border_color; ?>;flex-shrink:0;margin-top:0.1em;"><?php echo esc_html( $icon ); ?></span>
					<?php echo esc_html( is_string( $point ) ? $point : ( $point['text'] ?? '' ) ); ?>
				</li>
			<?php endforeach; ?>
		</ul>
	<?php endif; ?>
</aside>
