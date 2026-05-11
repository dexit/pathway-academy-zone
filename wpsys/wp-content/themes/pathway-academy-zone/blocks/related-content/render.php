<?php
if ( ! defined( 'ABSPATH' ) ) exit;

$heading   = sanitize_text_field( $attributes['heading']  ?? 'Related Resources' );
$post_type = sanitize_key( $attributes['postType']        ?? 'paz_resource' );
$limit     = max( 1, absint( $attributes['limit']         ?? 3 ) );
$columns   = max( 1, min( 4, absint( $attributes['columns'] ?? 3 ) ) );
$taxs      = is_array( $attributes['taxonomies'] ?? null ) ? $attributes['taxonomies'] : array( 'paz_resource_category', 'paz_area_served' );

$current_id = get_queried_object_id();

// Collect term IDs from the current post across the listed taxonomies.
$term_ids = array();
foreach ( $taxs as $tax ) {
	$terms = get_the_terms( $current_id, sanitize_key( $tax ) );
	if ( $terms && ! is_wp_error( $terms ) ) {
		$term_ids = array_merge( $term_ids, wp_list_pluck( $terms, 'term_id' ) );
	}
}

$args = array(
	'post_type'      => $post_type,
	'posts_per_page' => $limit,
	'post_status'    => 'publish',
	'post__not_in'   => $current_id ? array( $current_id ) : array(),
	'no_found_rows'  => true,
	'orderby'        => 'date',
	'order'          => 'DESC',
);

if ( $term_ids ) {
	$args['tax_query'] = array( // phpcs:ignore
		array(
			'taxonomy' => $taxs[0] ?? 'paz_resource_category',
			'field'    => 'term_id',
			'terms'    => array_unique( $term_ids ),
			'operator' => 'IN',
		),
	);
}

$posts = get_posts( $args );

// Fallback: latest of that post type.
if ( empty( $posts ) ) {
	unset( $args['tax_query'] );
	$posts = get_posts( $args );
}

if ( empty( $posts ) ) return;

$wrapper = get_block_wrapper_attributes( array( 'class' => 'paz-related-content' ) );
?>
<section <?php echo $wrapper; ?> style="padding-block:3.5rem;">
	<div style="max-width:1200px;margin:0 auto;padding-inline:1rem;">
		<?php if ( $heading ) : ?>
			<h2 style="font-size:1.25rem;font-weight:800;margin-bottom:1.5rem;"><?php echo esc_html( $heading ); ?></h2>
		<?php endif; ?>
		<div style="display:grid;gap:1.25rem;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));">
			<?php foreach ( $posts as $p ) :
				$thumb = get_the_post_thumbnail_url( $p, 'paz-card' );
				$cats  = get_the_terms( $p->ID, 'paz_resource_category' );
				$cat   = ( $cats && ! is_wp_error( $cats ) ) ? $cats[0]->name : '';
			?>
				<article style="background:var(--wp--preset--color--card);border:1px solid var(--wp--preset--color--border);border-radius:1rem;overflow:hidden;display:flex;flex-direction:column;">
					<?php if ( $thumb ) : ?>
						<img src="<?php echo esc_url( $thumb ); ?>" alt="<?php echo esc_attr( get_the_title( $p ) ); ?>" loading="lazy" decoding="async" width="800" height="450" style="width:100%;aspect-ratio:16/9;object-fit:cover;" />
					<?php endif; ?>
					<div style="padding:1.25rem;flex:1;display:flex;flex-direction:column;gap:0.5rem;">
						<?php if ( $cat ) : ?>
							<span style="font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:var(--wp--preset--color--primary);"><?php echo esc_html( $cat ); ?></span>
						<?php endif; ?>
						<h3 style="font-size:1rem;font-weight:700;margin:0;line-height:1.35;">
							<a href="<?php echo esc_url( get_permalink( $p ) ); ?>" style="color:inherit;text-decoration:none;"><?php echo esc_html( get_the_title( $p ) ); ?></a>
						</h3>
						<p style="font-size:0.875rem;color:var(--wp--preset--color--muted-foreground);margin:0;line-height:1.55;flex:1;">
							<?php echo esc_html( wp_trim_words( $p->post_excerpt ?: $p->post_content, 18 ) ); ?>
						</p>
						<a href="<?php echo esc_url( get_permalink( $p ) ); ?>" style="font-size:0.85rem;font-weight:600;color:var(--wp--preset--color--primary);text-decoration:none;margin-top:0.5rem;">
							<?php esc_html_e( 'Read more →', 'pathway-academy-zone' ); ?>
						</a>
					</div>
				</article>
			<?php endforeach; ?>
		</div>
	</div>
</section>
