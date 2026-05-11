<?php
if ( ! defined( 'ABSPATH' ) ) exit;

// Only render in the editor context — on the front end this is invisible.
if ( ! defined( 'REST_REQUEST' ) || ! REST_REQUEST ) return;

$rows       = max( 1, absint( $attributes['rows']      ?? 3 ) );
$show_image = (bool) ( $attributes['showImage']         ?? true );
$aspect     = sanitize_text_field( $attributes['imageAspect'] ?? '16/9' );
$lines      = max( 1, absint( $attributes['lines']     ?? 3 ) );

$wrapper = get_block_wrapper_attributes( array( 'class' => 'paz-skeleton-loader' ) );
?>
<div <?php echo $wrapper; ?> style="display:grid;gap:1.5rem;" aria-hidden="true" aria-label="<?php esc_attr_e( 'Loading placeholder', 'pathway-academy-zone' ); ?>">
	<?php for ( $r = 0; $r < $rows; $r++ ) : ?>
		<div style="background:var(--wp--preset--color--card);border:1px solid var(--wp--preset--color--border);border-radius:1rem;overflow:hidden;">
			<?php if ( $show_image ) : ?>
				<div class="paz-skeleton" style="aspect-ratio:<?php echo esc_attr( $aspect ); ?>;width:100%;"></div>
			<?php endif; ?>
			<div style="padding:1.25rem;display:flex;flex-direction:column;gap:0.6rem;">
				<div class="paz-skeleton" style="height:0.75rem;width:30%;border-radius:9999px;"></div>
				<?php for ( $l = 0; $l < $lines; $l++ ) : ?>
					<div class="paz-skeleton" style="height:0.85rem;width:<?php echo esc_attr( ( 100 - $l * 12 ) . '%' ); ?>;border-radius:9999px;"></div>
				<?php endfor; ?>
				<div class="paz-skeleton" style="height:2rem;width:8rem;border-radius:0.5rem;margin-top:0.5rem;"></div>
			</div>
		</div>
	<?php endfor; ?>
</div>
