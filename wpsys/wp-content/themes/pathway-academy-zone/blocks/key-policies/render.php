<?php
/**
 * Dynamic render for pazone/key-policies.
 * Pulls the top N paz_policy entries; falls back to a hard-coded
 * live-site list if the CPT has no published posts (e.g. fresh install
 * before the demo importer runs).
 */
if ( ! defined( 'ABSPATH' ) ) exit;

$attrs = wp_parse_args( $attributes ?? array(), array(
	'heading'     => __( 'Key Policies', 'pathway-academy-zone' ),
	'description' => __( 'Our safeguarding and pastoral policies are available for review. For full documents, please visit our Policies page.', 'pathway-academy-zone' ),
	'ctaLabel'    => __( 'View All Policies', 'pathway-academy-zone' ),
	'ctaUrl'      => '/policies',
	'count'       => 6,
	'showCta'     => true,
) );

$items = get_posts( array(
	'post_type'      => 'paz_policy',
	'posts_per_page' => max( 1, (int) $attrs['count'] ),
	'orderby'        => 'menu_order title',
	'order'          => 'ASC',
	'no_found_rows'  => true,
) );

if ( empty( $items ) ) {
	$fallback = array(
		'Child Protection &amp; Safeguarding Policy',
		'Online Safety Policy',
		'Anti-Bullying Policy',
		'Behaviour &amp; Positive Relationships Policy',
		'Safer Recruitment Policy',
		'Whistleblowing Policy',
	);
	$items = array_map( static function ( $title ) {
		return (object) array( 'post_title' => $title, 'permalink' => null );
	}, $fallback );
}

$wrapper = get_block_wrapper_attributes( array( 'class' => 'paz-key-policies' ) );
?>
<section <?php echo $wrapper; ?> style="padding-block:5rem;background:var(--wp--preset--color--muted);">
	<div style="max-width:900px;margin:0 auto;padding-inline:1rem;text-align:center;">
		<h2 style="font-size:2rem;font-weight:700;margin-bottom:1rem;"><?php echo esc_html( $attrs['heading'] ); ?></h2>
		<p style="color:var(--wp--preset--color--muted-foreground);max-width:560px;margin:0 auto 2.5rem;line-height:1.6;"><?php echo wp_kses_post( $attrs['description'] ); ?></p>
		<ul style="list-style:none;padding:0;margin:0 0 2.5rem;display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:1rem;text-align:left;">
			<?php foreach ( $items as $item ) :
				$link = isset( $item->ID ) ? get_permalink( $item ) : '';
			?>
				<li style="display:flex;align-items:center;gap:0.75rem;padding:1rem 1.25rem;border-radius:0.75rem;background:var(--wp--preset--color--primary-soft);">
					<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--wp--preset--color--primary);flex-shrink:0" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><path d="M14 2v6h6"></path></svg>
					<?php if ( $link ) : ?>
						<a href="<?php echo esc_url( $link ); ?>" style="font-size:0.9rem;font-weight:500;color:var(--wp--preset--color--foreground);text-decoration:none"><?php echo esc_html( $item->post_title ); ?></a>
					<?php else : ?>
						<span style="font-size:0.9rem;font-weight:500;color:var(--wp--preset--color--foreground);"><?php echo esc_html( $item->post_title ); ?></span>
					<?php endif; ?>
				</li>
			<?php endforeach; ?>
		</ul>
		<?php if ( $attrs['showCta'] && $attrs['ctaLabel'] && $attrs['ctaUrl'] ) : ?>
			<a href="<?php echo esc_url( $attrs['ctaUrl'] ); ?>" class="wp-block-button__link wp-element-button" style="background:transparent;color:var(--wp--preset--color--primary);border:1px solid var(--wp--preset--color--primary);border-radius:0.75rem;padding:0.75rem 1.5rem;font-weight:600;text-decoration:none;display:inline-flex;align-items:center;gap:0.5rem;">
				<?php echo esc_html( $attrs['ctaLabel'] ); ?>
				<span aria-hidden="true">&rarr;</span>
			</a>
		<?php endif; ?>
	</div>
</section>
