<?php
if ( ! defined( 'ABSPATH' ) ) exit;

if ( is_front_page() ) return;

$show_home = (bool) ( $attributes['showHome'] ?? true );
$sep       = esc_html( $attributes['separator'] ?? '/' );
$home_url  = home_url( '/' );

// Build crumb data.
$crumbs = array();
if ( $show_home ) {
	$crumbs[] = array( 'label' => __( 'Home', 'pathway-academy-zone' ), 'url' => $home_url );
}

if ( is_singular() ) {
	$post = get_queried_object();
	// CPT archive link.
	$pt_obj = get_post_type_object( $post->post_type );
	if ( $pt_obj && $pt_obj->has_archive && 'post' !== $post->post_type && 'page' !== $post->post_type ) {
		$crumbs[] = array( 'label' => esc_html( $pt_obj->labels->name ), 'url' => get_post_type_archive_link( $post->post_type ) );
	}
	$crumbs[] = array( 'label' => get_the_title( $post->ID ), 'url' => '' );
} elseif ( is_post_type_archive() ) {
	$crumbs[] = array( 'label' => wp_strip_all_tags( get_the_archive_title() ), 'url' => '' );
} elseif ( is_tax() || is_category() || is_tag() ) {
	$term = get_queried_object();
	if ( $term instanceof WP_Term ) {
		$crumbs[] = array( 'label' => $term->name, 'url' => '' );
	}
} elseif ( is_search() ) {
	$crumbs[] = array( 'label' => sprintf( __( 'Search: %s', 'pathway-academy-zone' ), get_search_query() ), 'url' => '' );
} elseif ( is_404() ) {
	$crumbs[] = array( 'label' => __( 'Page Not Found', 'pathway-academy-zone' ), 'url' => '' );
}

// JSON-LD BreadcrumbList.
$items = array();
foreach ( $crumbs as $i => $c ) {
	$item = array( '@type' => 'ListItem', 'position' => $i + 1, 'name' => wp_strip_all_tags( $c['label'] ) );
	if ( $c['url'] ) $item['item'] = $c['url'];
	$items[] = $item;
}
$jsonld = '<script type="application/ld+json">'
	. wp_json_encode( array( '@context' => 'https://schema.org', '@type' => 'BreadcrumbList', 'itemListElement' => $items ), JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE )
	. '</script>';

$wrapper = get_block_wrapper_attributes( array( 'class' => 'paz-breadcrumbs' ) );
?>
<nav <?php echo $wrapper; ?> aria-label="<?php esc_attr_e( 'Breadcrumbs', 'pathway-academy-zone' ); ?>">
	<ol style="display:flex;flex-wrap:wrap;align-items:center;gap:0.35rem;list-style:none;margin:0;padding:0;font-size:0.8rem;color:var(--wp--preset--color--muted-foreground);">
		<?php foreach ( $crumbs as $i => $crumb ) :
			$is_last = ( $i === count( $crumbs ) - 1 );
		?>
			<li style="display:flex;align-items:center;gap:0.35rem;">
				<?php if ( ! $is_last && $crumb['url'] ) : ?>
					<a href="<?php echo esc_url( $crumb['url'] ); ?>" style="color:inherit;text-decoration:none;" class="paz-crumb-link"><?php echo esc_html( $crumb['label'] ); ?></a>
					<span aria-hidden="true" style="opacity:0.5;"><?php echo $sep; ?></span>
				<?php else : ?>
					<span aria-current="page" style="color:var(--wp--preset--color--foreground);font-weight:500;"><?php echo esc_html( $crumb['label'] ); ?></span>
				<?php endif; ?>
			</li>
		<?php endforeach; ?>
	</ol>
</nav>
<?php echo $jsonld; ?>
