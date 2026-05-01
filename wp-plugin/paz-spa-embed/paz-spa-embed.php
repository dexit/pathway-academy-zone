<?php
/**
 * Plugin Name:  PAZ SPA Embed
 * Plugin URI:   https://pathwayacademyzone.co.uk
 * Description:  Gutenberg block and shortcode for embedding the Pathway Academy Zone
 *               React SPA inside WordPress pages with automatic full-width responsive
 *               resizing via postMessage. Also provides a WP-CLI command to sync the
 *               latest built assets into the uploads directory.
 * Version:      1.0.0
 * Requires PHP: 8.0
 * Author:       Pathway Academy Zone
 * Text Domain:  paz-spa-embed
 */

defined( 'ABSPATH' ) || exit;

define( 'PAZ_EMBED_VERSION',  '1.0.0' );
define( 'PAZ_EMBED_DIR',      plugin_dir_path( __FILE__ ) );
define( 'PAZ_EMBED_URL',      plugin_dir_url( __FILE__ ) );

/* ── Settings ───────────────────────────────────────────────────────── */

/**
 * The URL where the compiled SPA is served.
 *
 * Set via wp-config.php or server env:
 *   define( 'PAZ_SPA_BASE_URL', 'https://app.pathwayacademyzone.co.uk' );
 * or
 *   PAZ_SPA_BASE_URL=https://app.pathwayacademyzone.co.uk
 *
 * Falls back to /wp-content/uploads/paz-spa/ (populated by `npm run build:wp`).
 */
function paz_embed_spa_base_url(): string {
	if ( defined( 'PAZ_SPA_BASE_URL' ) ) return rtrim( constant( 'PAZ_SPA_BASE_URL' ), '/' );
	if ( getenv( 'PAZ_SPA_BASE_URL' ) ) return rtrim( getenv( 'PAZ_SPA_BASE_URL' ), '/' );
	$upload_dir = wp_upload_dir();
	return rtrim( $upload_dir['baseurl'], '/' ) . '/paz-spa';
}

/* ── Block registration ─────────────────────────────────────────────── */

add_action( 'init', function () {
	register_block_type( PAZ_EMBED_DIR . 'blocks/spa-embed' );
} );

/* ── Enqueue parent-side resizer on the front end ───────────────────── */

add_action( 'wp_enqueue_scripts', function () {
	wp_enqueue_script(
		'paz-iframe-parent',
		PAZ_EMBED_URL . 'assets/paz-iframe-parent.js',
		[],
		PAZ_EMBED_VERSION,
		true
	);
} );

/* ── Shortcode: [paz_spa_embed route="/team"] ───────────────────────── */

add_shortcode( 'paz_spa_embed', function ( $atts ) {
	$atts = shortcode_atts( [
		'route'           => '/',
		'min_height'      => '600',
		'loading'         => 'lazy',
		'title'           => 'Pathway Academy Zone',
		'scrolling'       => 'no',
		'allow_fullscreen' => 'false',
	], $atts, 'paz_spa_embed' );

	return paz_embed_render_iframe( $atts );
} );

/* ── REST endpoint: SPA URL for JS config ───────────────────────────── */

add_action( 'rest_api_init', function () {
	register_rest_route( 'paz/v1', '/spa-config', [
		'methods'             => 'GET',
		'callback'            => fn() => new WP_REST_Response( [ 'baseUrl' => paz_embed_spa_base_url() ], 200 ),
		'permission_callback' => '__return_true',
	] );
} );

/* ── WP-CLI sync command ────────────────────────────────────────────── */

if ( defined( 'WP_CLI' ) && WP_CLI ) {
	WP_CLI::add_command( 'paz spa-sync', 'PAZ_SPA_Sync_Command' );
}

class PAZ_SPA_Sync_Command {
	/**
	 * Copy the Vite dist/ build into /wp-content/uploads/paz-spa/.
	 *
	 * ## OPTIONS
	 *
	 * [--src=<path>]
	 * : Absolute path to the Vite dist/ directory.
	 *   Default: detected from DOCUMENT_ROOT / wp-content parent.
	 *
	 * ## EXAMPLES
	 *
	 *     wp paz spa-sync
	 *     wp paz spa-sync --src=/var/www/html/paz-spa/dist
	 */
	public function __invoke( $args, $assoc_args ) {
		$upload_dir  = wp_upload_dir();
		$dest        = trailingslashit( $upload_dir['basedir'] ) . 'paz-spa';
		$src         = $assoc_args['src'] ?? '';

		if ( ! $src ) {
			// Auto-detect: repo root is 3 levels above wp-content.
			$src = trailingslashit( ABSPATH ) . '../dist';
			$src = realpath( $src ) ?: '';
		}

		if ( ! $src || ! is_dir( $src ) ) {
			WP_CLI::error( "Source directory not found: {$src}" );
			return;
		}

		paz_embed_recursive_copy( $src, $dest );
		WP_CLI::success( "Synced {$src} → {$dest}" );
	}
}

/* ── Helper: render iframe HTML ─────────────────────────────────────── */

function paz_embed_render_iframe( array $atts ): string {
	$base      = esc_url( paz_embed_spa_base_url() );
	$route     = '/' . ltrim( sanitize_text_field( $atts['route'] ?? '/' ), '/' );
	$src       = $base . $route;
	$min_h     = absint( $atts['min_height'] ?? 600 );
	$title     = esc_attr( $atts['title'] ?? 'Pathway Academy Zone' );
	$loading   = in_array( $atts['loading'] ?? 'lazy', [ 'lazy', 'eager' ], true ) ? $atts['loading'] : 'lazy';
	$scrolling = ( $atts['scrolling'] ?? 'no' ) === 'yes' ? 'yes' : 'no';
	$allowfs   = filter_var( $atts['allow_fullscreen'] ?? false, FILTER_VALIDATE_BOOLEAN ) ? ' allowfullscreen' : '';
	$uid       = 'paz-embed-' . wp_unique_id();

	ob_start();
	?>
	<div class="paz-spa-wrapper" id="<?php echo esc_attr( $uid ); ?>-wrap"
	     style="position:relative;width:100%;overflow:hidden;">
		<iframe
			id="<?php echo esc_attr( $uid ); ?>"
			data-paz-embed
			class="paz-spa-iframe"
			src="<?php echo esc_url( $src ); ?>"
			title="<?php echo $title; ?>"
			width="100%"
			height="<?php echo $min_h; ?>"
			style="display:block;width:100%;min-height:<?php echo $min_h; ?>px;border:0;overflow:hidden;"
			scrolling="<?php echo $scrolling; ?>"
			loading="<?php echo $loading; ?>"
			referrerpolicy="same-origin"
			<?php echo $allowfs; ?>
		></iframe>
	</div>
	<?php
	return (string) ob_get_clean();
}

/* ── Helper: recursive directory copy ───────────────────────────────── */

function paz_embed_recursive_copy( string $src, string $dest ): void {
	wp_mkdir_p( $dest );
	$iter = new RecursiveIteratorIterator(
		new RecursiveDirectoryIterator( $src, RecursiveDirectoryIterator::SKIP_DOTS ),
		RecursiveIteratorIterator::SELF_FIRST
	);
	foreach ( $iter as $item ) {
		$target = $dest . DIRECTORY_SEPARATOR . $iter->getSubPathname();
		if ( $item->isDir() ) {
			wp_mkdir_p( $target );
		} else {
			copy( $item->getPathname(), $target );
		}
	}
}
