<?php
if ( ! defined( 'ABSPATH' ) ) exit;

$heading = sanitize_text_field( $attributes['heading']     ?? '' );
$steps   = is_array( $attributes['steps'] ?? null ) ? $attributes['steps'] : array();

$wrapper = get_block_wrapper_attributes( array( 'class' => 'paz-timeline' ) );
?>
<section <?php echo $wrapper; ?> style="padding-block:3.5rem;">
	<div style="max-width:860px;margin:0 auto;padding-inline:1rem;">
		<?php if ( $heading ) : ?>
			<h2 style="font-size:clamp(1.4rem,2vw+0.6rem,2rem);font-weight:800;margin-bottom:2rem;">
				<?php echo esc_html( $heading ); ?>
			</h2>
		<?php endif; ?>
		<ol style="list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:0;" aria-label="<?php echo esc_attr( $heading ?: __( 'Steps', 'pathway-academy-zone' ) ); ?>">
			<?php foreach ( $steps as $i => $step ) :
				$num   = absint( $step['number'] ?? ( $i + 1 ) );
				$title = sanitize_text_field( $step['title'] ?? '' );
				$body  = sanitize_text_field( $step['body']  ?? '' );
				$last  = ( $i === count( $steps ) - 1 );
			?>
				<li style="display:flex;gap:1.25rem;position:relative;<?php echo $last ? '' : 'padding-bottom:2rem;'; ?>">
					<!-- Step number circle + connector line -->
					<div style="display:flex;flex-direction:column;align-items:center;flex-shrink:0;">
						<div style="width:2.5rem;height:2.5rem;border-radius:50%;background:var(--wp--preset--color--primary);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:1rem;z-index:1;">
							<?php echo esc_html( $num ); ?>
						</div>
						<?php if ( ! $last ) : ?>
							<div aria-hidden="true" style="flex:1;width:2px;background:var(--wp--preset--color--border);margin-top:0.25rem;"></div>
						<?php endif; ?>
					</div>
					<!-- Content -->
					<div style="padding-top:0.35rem;padding-bottom:<?php echo $last ? '0' : '0.5rem'; ?>;">
						<?php if ( $title ) : ?>
							<h3 style="font-size:1.05rem;font-weight:700;margin:0 0 0.35rem;"><?php echo esc_html( $title ); ?></h3>
						<?php endif; ?>
						<?php if ( $body ) : ?>
							<p style="margin:0;font-size:0.92rem;line-height:1.65;color:var(--wp--preset--color--muted-foreground);"><?php echo esc_html( $body ); ?></p>
						<?php endif; ?>
					</div>
				</li>
			<?php endforeach; ?>
		</ol>
	</div>
</section>
