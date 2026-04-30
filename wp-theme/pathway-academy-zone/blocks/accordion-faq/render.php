<?php
if ( ! defined( 'ABSPATH' ) ) exit;

$heading      = sanitize_text_field( $attributes['heading']      ?? 'Frequently Asked Questions' );
$area         = sanitize_title( $attributes['area']              ?? '' );
$programme_id = absint( $attributes['programme_id']              ?? 0 );
$limit        = max( 1, absint( $attributes['limit']             ?? 10 ) );
$show_schema  = (bool) ( $attributes['showSchema']               ?? true );
$category     = sanitize_title( $attributes['category']          ?? '' );

$args = array(
	'post_type'      => 'paz_faq',
	'posts_per_page' => $limit,
	'post_status'    => 'publish',
	'orderby'        => 'menu_order title',
	'order'          => 'ASC',
	'no_found_rows'  => true,
);

$tax_q  = array();
$meta_q = array();

if ( $area ) {
	$tax_q[] = array( 'taxonomy' => 'paz_area_served',   'field' => 'slug', 'terms' => $area );
}
if ( $category ) {
	$tax_q[] = array( 'taxonomy' => 'paz_faq_category', 'field' => 'slug', 'terms' => $category );
}
if ( $programme_id ) {
	$meta_q[] = array( 'key' => 'paz_programme_id', 'value' => $programme_id );
}
if ( count( $tax_q ) > 1 ) {
	$tax_q['relation'] = 'AND';
}
if ( $tax_q )  $args['tax_query']  = $tax_q;
if ( $meta_q ) $args['meta_query'] = $meta_q;

$faqs = get_posts( $args );

if ( empty( $faqs ) ) {
	echo '<p style="color:var(--wp--preset--color--muted-foreground);padding:2rem 0;">'
		. esc_html__( 'No FAQs found.', 'pathway-academy-zone' )
		. '</p>';
	return;
}

$wrapper = get_block_wrapper_attributes( array( 'class' => 'paz-accordion-faq' ) );

// Build FAQPage JSON-LD if requested.
$jsonld = '';
if ( $show_schema ) {
	$entities = array();
	foreach ( $faqs as $faq ) {
		$entities[] = array(
			'@type'          => 'Question',
			'name'           => wp_strip_all_tags( $faq->post_title ),
			'acceptedAnswer' => array(
				'@type' => 'Answer',
				'text'  => wp_strip_all_tags( apply_filters( 'the_content', $faq->post_content ) ),
			),
		);
	}
	$jsonld = '<script type="application/ld+json">'
		. wp_json_encode( array( '@context' => 'https://schema.org', '@type' => 'FAQPage', 'mainEntity' => $entities ), JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE )
		. '</script>';
}
?>
<section <?php echo $wrapper; ?> style="padding-block:3rem;">
	<div style="max-width:860px;margin:0 auto;padding-inline:1rem;">
		<?php if ( $heading ) : ?>
			<h2 style="font-size:clamp(1.4rem,2vw+0.8rem,2rem);font-weight:800;margin-bottom:1.5rem;">
				<?php echo esc_html( $heading ); ?>
			</h2>
		<?php endif; ?>
		<?php foreach ( $faqs as $i => $faq ) : ?>
			<details
				id="faq-<?php echo esc_attr( $faq->ID ); ?>"
				style="border:1px solid var(--wp--preset--color--border);border-radius:0.75rem;margin-bottom:0.75rem;background:var(--wp--preset--color--card);overflow:hidden;"
			>
				<summary style="padding:1rem 1.25rem;font-weight:600;cursor:pointer;list-style:none;display:flex;justify-content:space-between;align-items:center;gap:1rem;">
					<span><?php echo esc_html( $faq->post_title ); ?></span>
					<span aria-hidden="true" style="flex-shrink:0;width:1.25rem;height:1.25rem;border-radius:50%;background:var(--wp--preset--color--primary);color:#fff;display:inline-flex;align-items:center;justify-content:center;font-size:0.9rem;transition:transform 0.2s;">+</span>
				</summary>
				<div style="padding:0 1.25rem 1.25rem;color:var(--wp--preset--color--muted-foreground);line-height:1.7;font-size:0.95rem;">
					<?php echo wp_kses_post( apply_filters( 'the_content', $faq->post_content ) ); ?>
				</div>
			</details>
		<?php endforeach; ?>
	</div>
</section>
<?php echo $jsonld; ?>
