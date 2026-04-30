<?php
if ( ! defined( 'ABSPATH' ) ) exit;

$heading = sanitize_text_field( $attributes['heading'] ?? '' );
$columns = max( 2, min( 4, absint( $attributes['columns'] ?? 3 ) ) );
$items   = is_array( $attributes['items'] ?? null ) ? $attributes['items'] : array();

$wrapper = get_block_wrapper_attributes( array( 'class' => 'paz-icon-grid' ) );
?>
<section <?php echo $wrapper; ?> style="padding-block:4rem;">
	<div style="max-width:1200px;margin:0 auto;padding-inline:1rem;">
		<?php if ( $heading ) : ?>
			<h2 style="text-align:center;font-size:clamp(1.5rem,2.5vw+0.5rem,2.25rem);font-weight:800;margin-bottom:2.5rem;">
				<?php echo esc_html( $heading ); ?>
			</h2>
		<?php endif; ?>
		<div style="display:grid;gap:1.5rem;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));">
			<?php foreach ( $items as $item ) :
				$icon  = sanitize_text_field( $item['icon']  ?? '' );
				$title = sanitize_text_field( $item['title'] ?? '' );
				$body  = sanitize_text_field( $item['body']  ?? '' );
			?>
				<div style="background:var(--wp--preset--color--card);border:1px solid var(--wp--preset--color--border);border-radius:1rem;padding:1.75rem;text-align:center;">
					<?php if ( $icon ) : ?>
						<div style="display:inline-flex;align-items:center;justify-content:center;width:3rem;height:3rem;border-radius:50%;background:var(--wp--preset--color--accent);margin-bottom:1rem;">
							<span class="dashicons dashicons-<?php echo esc_attr( $icon ); ?>" style="color:var(--wp--preset--color--primary);font-size:1.25rem;width:auto;height:auto;" aria-hidden="true"></span>
						</div>
					<?php endif; ?>
					<?php if ( $title ) : ?>
						<h3 style="font-size:1.05rem;font-weight:700;margin:0 0 0.5rem;"><?php echo esc_html( $title ); ?></h3>
					<?php endif; ?>
					<?php if ( $body ) : ?>
						<p style="font-size:0.9rem;color:var(--wp--preset--color--muted-foreground);margin:0;line-height:1.6;"><?php echo esc_html( $body ); ?></p>
					<?php endif; ?>
				</div>
			<?php endforeach; ?>
		</div>
	</div>
</section>
