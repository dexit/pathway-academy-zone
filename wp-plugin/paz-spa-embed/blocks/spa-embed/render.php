<?php
/**
 * pazone/spa-embed — server-side render.
 *
 * $attributes keys: route, minHeight, loading, iframeTitle, align
 */
defined( 'ABSPATH' ) || exit;

$route     = '/' . ltrim( sanitize_text_field( $attributes['route'] ?? '/' ), '/' );
$min_h     = absint( $attributes['minHeight'] ?? 600 );
$loading   = in_array( $attributes['loading'] ?? 'lazy', [ 'lazy', 'eager' ], true )
             ? $attributes['loading'] : 'lazy';
$title     = esc_attr( $attributes['iframeTitle'] ?? 'Pathway Academy Zone' );
$base      = esc_url( paz_embed_spa_base_url() );
$src       = $base . $route;
$uid       = 'paz-embed-' . wp_unique_id();

$wrapper_attrs = get_block_wrapper_attributes( [
	'class' => 'paz-spa-wrapper',
	'style' => 'position:relative;width:100%;overflow:hidden;',
	'id'    => $uid . '-wrap',
] );
?>
<div <?php echo $wrapper_attrs; ?>>
	<iframe
		id="<?php echo esc_attr( $uid ); ?>"
		data-paz-embed
		class="paz-spa-iframe"
		src="<?php echo esc_url( $src ); ?>"
		title="<?php echo $title; ?>"
		width="100%"
		height="<?php echo $min_h; ?>"
		style="display:block;width:100%;min-height:<?php echo $min_h; ?>px;border:0;overflow:hidden;transition:height 0.2s ease;"
		scrolling="no"
		loading="<?php echo $loading; ?>"
		referrerpolicy="same-origin"
	></iframe>
</div>
