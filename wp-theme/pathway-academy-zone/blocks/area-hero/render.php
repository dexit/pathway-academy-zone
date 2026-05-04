<?php
if ( ! defined( 'ABSPATH' ) ) exit;

$area_slug       = sanitize_title( $attributes['areaSlug']          ?? '' );
$show_programmes = (bool) ( $attributes['showProgrammes']            ?? true );
$show_stats      = (bool) ( $attributes['showStats']                 ?? true );
$cta_label       = sanitize_text_field( $attributes['ctaLabel']      ?? 'Make a Referral' );
$cta_url         = esc_url_raw( $attributes['ctaUrl']                ?? '/referral' );
$sec_label       = sanitize_text_field( $attributes['secondaryCtaLabel'] ?? 'View Programmes' );
$sec_url         = esc_url_raw( $attributes['secondaryCtaUrl']       ?? '/programmes' );

// Resolve the area post.
$area_post = null;
if ( is_singular( 'paz_area' ) ) {
	$area_post = get_queried_object();
} elseif ( $area_slug && function_exists( 'paz_get_area_by_slug' ) ) {
	$area_post = paz_get_area_by_slug( $area_slug );
}

$area_title   = $area_post ? get_the_title( $area_post ) : ( $area_slug ? ucwords( str_replace( '-', ' ', $area_slug ) ) : 'Your Area' );
$hero_headline = $area_post ? get_post_meta( $area_post->ID, 'paz_hero_headline', true ) : '';
$hero_body     = $area_post ? ( get_post_meta( $area_post->ID, 'paz_hero_body',     true ) ?: $area_post->post_excerpt ) : '';
$slug_for_query= $area_post ? $area_post->post_name : $area_slug;

$headline = $hero_headline ?: sprintf( __( 'Alternative Provision in %s', 'pathway-academy-zone' ), esc_html( $area_title ) );

// Related programmes.
$programmes = array();
if ( $show_programmes && $slug_for_query && function_exists( 'paz_get_programmes_for_area' ) ) {
	$programmes = paz_get_programmes_for_area( $slug_for_query, 8 );
}

// FAQs for inline schema.
$faqs = array();
if ( $slug_for_query && function_exists( 'paz_get_faqs_for_area' ) ) {
	$faqs = paz_get_faqs_for_area( $slug_for_query, 6 );
}

$home    = home_url( '/' );
$wrapper = get_block_wrapper_attributes( array( 'class' => 'paz-area-hero' ) );

// ── Inline JSON-LD: Service + optional FAQPage ──────────────────────────────
$area_obj  = array( '@type' => 'City', 'name' => $area_title );
$offer_list = array();
foreach ( $programmes as $prog ) {
	$offer_list[] = array(
		'@type'        => 'Offer',
		'name'         => get_the_title( $prog ),
		'url'          => get_permalink( $prog ),
		'availability' => 'https://schema.org/InStock',
		'areaServed'   => $area_obj,
	);
}
$service_schema = array(
	'@context' => 'https://schema.org',
	'@type'    => 'Service',
	'name'     => sprintf( 'Alternative Provision in %s', $area_title ),
	'provider' => array( '@id' => $home . '#org' ),
	'areaServed' => array(
		$area_obj,
		array( '@type' => 'AdministrativeArea', 'name' => 'Staffordshire' ),
		array( '@type' => 'AdministrativeArea', 'name' => 'West Midlands' ),
	),
	'url' => $area_post ? get_permalink( $area_post ) : $home,
);
if ( $offer_list ) {
	$service_schema['hasOfferCatalog'] = array(
		'@type'           => 'OfferCatalog',
		'name'            => sprintf( 'AP Programmes in %s', $area_title ),
		'itemListElement' => $offer_list,
	);
}

$schemas = array( $service_schema );

if ( $faqs ) {
	$faq_entities = array();
	foreach ( $faqs as $faq ) {
		$faq_entities[] = array(
			'@type'          => 'Question',
			'name'           => wp_strip_all_tags( $faq->post_title ),
			'acceptedAnswer' => array(
				'@type' => 'Answer',
				'text'  => wp_strip_all_tags( apply_filters( 'the_content', $faq->post_content ) ),
			),
		);
	}
	$schemas[] = array( '@context' => 'https://schema.org', '@type' => 'FAQPage', 'mainEntity' => $faq_entities );
}
?>
<section <?php echo $wrapper; ?> style="background:var(--wp--preset--color--primary);color:#fff;padding-block:5rem 4rem;">
	<div style="max-width:1200px;margin:0 auto;padding-inline:1.25rem;">

		<!-- Breadcrumb -->
		<nav aria-label="<?php esc_attr_e( 'Breadcrumbs', 'pathway-academy-zone' ); ?>" style="margin-bottom:1.5rem;">
			<ol style="display:flex;flex-wrap:wrap;gap:0.4rem;list-style:none;margin:0;padding:0;font-size:0.78rem;opacity:0.7;">
				<li><a href="<?php echo esc_url( $home ); ?>" style="color:inherit;"><?php esc_html_e( 'Home', 'pathway-academy-zone' ); ?></a> /</li>
				<li><a href="<?php echo esc_url( $home . 'alternative-provision/' ); ?>" style="color:inherit;"><?php esc_html_e( 'Areas', 'pathway-academy-zone' ); ?></a> /</li>
				<li aria-current="page"><?php echo esc_html( $area_title ); ?></li>
			</ol>
		</nav>

		<!-- Eyebrow -->
		<p style="font-size:0.75rem;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;opacity:0.7;margin:0 0 0.75rem;">
			<?php esc_html_e( 'Alternative Provision', 'pathway-academy-zone' ); ?> · <?php echo esc_html( $area_title ); ?>
		</p>

		<!-- Heading -->
		<h1 style="font-size:clamp(2rem,4vw+0.5rem,3.5rem);font-weight:900;line-height:1.1;margin:0 0 1.25rem;max-width:800px;">
			<?php echo esc_html( $headline ); ?>
		</h1>

		<!-- Body -->
		<?php if ( $hero_body ) : ?>
			<p style="font-size:1.1rem;line-height:1.7;opacity:0.85;max-width:640px;margin:0 0 2rem;">
				<?php echo esc_html( $hero_body ); ?>
			</p>
		<?php else : ?>
			<p style="font-size:1.05rem;line-height:1.7;opacity:0.85;max-width:640px;margin:0 0 2rem;">
				<?php printf(
					esc_html__( 'Pathway Academy Zone delivers specialist Alternative Provision for young people across %s and the wider Staffordshire area. Contact our team to discuss a placement.', 'pathway-academy-zone' ),
					esc_html( $area_title )
				); ?>
			</p>
		<?php endif; ?>

		<!-- CTA buttons -->
		<div style="display:flex;flex-wrap:wrap;gap:0.75rem;margin-bottom:<?php echo ( $show_programmes || $show_stats ) ? '2.5rem' : '0'; ?>;">
			<a href="<?php echo esc_url( $cta_url ); ?>" style="display:inline-flex;align-items:center;gap:0.5rem;padding:0.8rem 1.75rem;background:#fff;color:var(--wp--preset--color--primary);font-weight:700;border-radius:0.5rem;text-decoration:none;font-size:0.95rem;">
				<?php echo esc_html( $cta_label ); ?> →
			</a>
			<a href="<?php echo esc_url( $sec_url ); ?>" style="display:inline-flex;align-items:center;gap:0.5rem;padding:0.8rem 1.75rem;background:transparent;color:#fff;font-weight:600;border:2px solid rgba(255,255,255,0.5);border-radius:0.5rem;text-decoration:none;font-size:0.95rem;">
				<?php echo esc_html( $sec_label ); ?>
			</a>
		</div>

		<!-- Programme pills -->
		<?php if ( $show_programmes && $programmes ) : ?>
			<div style="display:flex;flex-wrap:wrap;gap:0.5rem;margin-bottom:<?php echo $show_stats ? '2.5rem' : '0'; ?>;">
				<span style="font-size:0.75rem;font-weight:600;opacity:0.6;align-self:center;"><?php esc_html_e( 'Programmes:', 'pathway-academy-zone' ); ?></span>
				<?php foreach ( $programmes as $prog ) : ?>
					<a href="<?php echo esc_url( get_permalink( $prog ) ); ?>" style="font-size:0.78rem;font-weight:600;padding:0.3rem 0.8rem;border-radius:9999px;background:rgba(255,255,255,0.12);color:#fff;text-decoration:none;border:1px solid rgba(255,255,255,0.2);">
						<?php echo esc_html( get_the_title( $prog ) ); ?>
					</a>
				<?php endforeach; ?>
			</div>
		<?php endif; ?>

		<!-- Stats row -->
		<?php if ( $show_stats ) : ?>
			<div style="display:grid;gap:1.5rem;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));max-width:600px;padding-top:2rem;border-top:1px solid rgba(255,255,255,0.15);">
				<?php foreach ( array(
					array( '94%',  __( 'Attendance improvement',  'pathway-academy-zone' ) ),
					array( '87%',  __( 'Positive destinations',   'pathway-academy-zone' ) ),
					array( '150+', __( 'Young people supported',  'pathway-academy-zone' ) ),
				) as list( $val, $lbl ) ) : ?>
					<div>
						<div style="font-size:2rem;font-weight:900;line-height:1;"><?php echo esc_html( $val ); ?></div>
						<div style="font-size:0.8rem;opacity:0.7;margin-top:0.2rem;"><?php echo esc_html( $lbl ); ?></div>
					</div>
				<?php endforeach; ?>
			</div>
		<?php endif; ?>

	</div>
</section>

<?php foreach ( $schemas as $schema ) : ?>
<script type="application/ld+json"><?php echo wp_json_encode( $schema, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE ); ?></script>
<?php endforeach; ?>
