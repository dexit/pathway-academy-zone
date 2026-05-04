<?php
if ( ! defined( 'ABSPATH' ) ) exit;

$post_id     = absint( $attributes['postId']       ?? 0 );
$limit       = max( 1, absint( $attributes['limit']   ?? 6 ) );
$show_excerpt= (bool) ( $attributes['showExcerpt']    ?? true );
$area_filter = sanitize_title( $attributes['filterByArea'] ?? '' );
$heading     = sanitize_text_field( $attributes['heading'] ?? '' );
$cta_label   = sanitize_text_field( $attributes['ctaLabel'] ?? 'Learn more' );

/**
 * Single card renderer.
 */
function paz_programme_single_card( WP_Post $p, bool $show_excerpt, string $cta_label ): void {
	$icon    = get_post_meta( $p->ID, 'paz_icon_name', true );
	$colour  = get_post_meta( $p->ID, 'paz_colour',    true ) ?: 'var(--wp--preset--color--primary)';
	$dur     = get_post_meta( $p->ID, 'paz_duration',  true );
	$ks      = get_post_meta( $p->ID, 'paz_key_stage', true );
	$excerpt = $show_excerpt ? ( $p->post_excerpt ?: wp_trim_words( $p->post_content, 20 ) ) : '';

	$bg = str_starts_with( $colour, '#' ) || str_starts_with( $colour, 'hsl' ) || str_starts_with( $colour, 'rgb' )
		? $colour
		: 'var(--wp--preset--color--primary)';
	?>
	<article style="background:var(--wp--preset--color--card);border:1px solid var(--wp--preset--color--border);border-radius:1rem;padding:1.5rem;display:flex;flex-direction:column;gap:0.75rem;transition:box-shadow 0.2s,transform 0.2s;" class="paz-programme-card">
		<div style="display:flex;align-items:center;justify-content:space-between;gap:1rem;">
			<div style="width:2.75rem;height:2.75rem;border-radius:0.75rem;background:<?php echo esc_attr( $bg ); ?>;opacity:0.15;display:flex;align-items:center;justify-content:center;position:relative;flex-shrink:0;">
				<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;opacity:1;">
					<?php if ( $icon ) : ?>
						<span class="dashicons dashicons-<?php echo esc_attr( $icon ); ?>" style="color:<?php echo esc_attr( $bg ); ?>;font-size:1.1rem;width:auto;height:auto;" aria-hidden="true"></span>
					<?php else : ?>
						<span style="font-weight:800;font-size:1rem;color:<?php echo esc_attr( $bg ); ?>;"><?php echo esc_html( mb_substr( $p->post_title, 0, 1 ) ); ?></span>
					<?php endif; ?>
				</div>
			</div>
			<div style="display:flex;gap:0.4rem;flex-wrap:wrap;justify-content:flex-end;">
				<?php foreach ( array_filter( array( $dur, $ks ) ) as $tag ) : ?>
					<span style="font-size:0.7rem;font-weight:600;padding:0.2rem 0.6rem;border-radius:9999px;background:var(--wp--preset--color--accent);color:var(--wp--preset--color--accent-foreground);"><?php echo esc_html( $tag ); ?></span>
				<?php endforeach; ?>
			</div>
		</div>
		<h3 style="font-size:1.05rem;font-weight:800;margin:0;line-height:1.3;">
			<a href="<?php echo esc_url( get_permalink( $p ) ); ?>" style="color:inherit;text-decoration:none;"><?php echo esc_html( $p->post_title ); ?></a>
		</h3>
		<?php if ( $excerpt ) : ?>
			<p style="font-size:0.875rem;color:var(--wp--preset--color--muted-foreground);margin:0;line-height:1.6;flex:1;"><?php echo esc_html( wp_trim_words( $excerpt, 20 ) ); ?></p>
		<?php endif; ?>
		<a href="<?php echo esc_url( get_permalink( $p ) ); ?>" style="display:inline-flex;align-items:center;gap:0.4rem;font-size:0.85rem;font-weight:600;color:var(--wp--preset--color--primary);text-decoration:none;margin-top:auto;">
			<?php echo esc_html( $cta_label ); ?> →
		</a>
	</article>
	<?php
}

$wrapper = get_block_wrapper_attributes( array( 'class' => 'paz-programme-cards' ) );

if ( $post_id ) {
	$p = get_post( $post_id );
	if ( $p && 'paz_programme' === $p->post_type && 'publish' === $p->post_status ) {
		echo '<div ' . $wrapper . '>';
		paz_programme_single_card( $p, $show_excerpt, $cta_label );
		echo '</div>';
	}
	return;
}

// Grid mode.
$args = array(
	'post_type'      => 'paz_programme',
	'posts_per_page' => $limit,
	'post_status'    => 'publish',
	'orderby'        => 'menu_order title',
	'order'          => 'ASC',
	'no_found_rows'  => true,
);
if ( $area_filter ) {
	$args['tax_query'] = array( // phpcs:ignore
		array( 'taxonomy' => 'paz_area_served', 'field' => 'slug', 'terms' => $area_filter ),
	);
}
$programmes = get_posts( $args );
if ( empty( $programmes ) ) return;
?>
<section <?php echo $wrapper; ?> style="padding-block:3.5rem;">
	<div style="max-width:1200px;margin:0 auto;padding-inline:1rem;">
		<?php if ( $heading ) : ?>
			<h2 style="font-size:clamp(1.4rem,2vw+0.6rem,2rem);font-weight:800;margin-bottom:2rem;"><?php echo esc_html( $heading ); ?></h2>
		<?php endif; ?>
		<div style="display:grid;gap:1.5rem;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));">
			<?php foreach ( $programmes as $p ) paz_programme_single_card( $p, $show_excerpt, $cta_label ); ?>
		</div>
	</div>
</section>
