<?php
/**
 * One-click demo content importer.
 *
 * Creates/updates pages, a navigation menu, and sample entries for every
 * CPT so a fresh install matches the live site without any manual work.
 *
 * Entry point: Appearance → PAZ Demo Content → "Import demo content".
 *
 * @package PathwayAcademyZone
 */

if ( ! defined( 'ABSPATH' ) ) exit;

function paz_demo_admin_page() {
	add_theme_page(
		__( 'PAZ Demo Content', 'pathway-academy-zone' ),
		__( 'PAZ Demo Content', 'pathway-academy-zone' ),
		'manage_options',
		'paz-demo',
		'paz_demo_render_admin'
	);
}
add_action( 'admin_menu', 'paz_demo_admin_page' );

function paz_demo_render_admin() {
	if ( ! current_user_can( 'manage_options' ) ) return;

	$ran = false;
	$summary = array();
	if ( isset( $_POST['paz_demo_run'] ) && check_admin_referer( 'paz_demo_import' ) ) {
		$summary = paz_demo_run_import();
		$ran = true;
	}
	?>
	<div class="wrap">
		<h1><?php esc_html_e( 'Pathway Academy Zone — Demo Content', 'pathway-academy-zone' ); ?></h1>
		<p><?php esc_html_e( 'Creates every page, menu, and CPT entry needed to replicate the live site. Re-running the importer updates existing entries in place (it matches by slug, so nothing is duplicated).', 'pathway-academy-zone' ); ?></p>

		<?php if ( $ran ) : ?>
			<div class="notice notice-success">
				<p><strong><?php esc_html_e( 'Import complete.', 'pathway-academy-zone' ); ?></strong></p>
				<ul style="list-style:disc;margin-left:20px">
					<?php foreach ( $summary as $line ) : ?>
						<li><?php echo esc_html( $line ); ?></li>
					<?php endforeach; ?>
				</ul>
			</div>
		<?php endif; ?>

		<form method="post">
			<?php wp_nonce_field( 'paz_demo_import' ); ?>
			<p>
				<button type="submit" name="paz_demo_run" value="1" class="button button-primary button-large">
					<?php esc_html_e( 'Import demo content', 'pathway-academy-zone' ); ?>
				</button>
			</p>
		</form>
	</div>
	<?php
}

function paz_demo_run_import() {
	$log = array();
	$file = PAZ_THEME_DIR . 'demo-content/demo.json';
	if ( ! file_exists( $file ) ) {
		return array( __( 'demo-content/demo.json not found.', 'pathway-academy-zone' ) );
	}
	$data = json_decode( file_get_contents( $file ), true );
	if ( ! is_array( $data ) ) {
		return array( __( 'demo-content/demo.json could not be parsed.', 'pathway-academy-zone' ) );
	}

	// 1. Pages
	$page_ids = array();
	foreach ( (array) ( $data['pages'] ?? array() ) as $p ) {
		$existing = get_page_by_path( $p['slug'] );
		$args = array(
			'post_type'    => 'page',
			'post_status'  => 'publish',
			'post_title'   => $p['title'],
			'post_name'    => $p['slug'],
			'post_content' => $p['content'],
		);
		if ( $existing ) {
			$args['ID'] = $existing->ID;
			wp_update_post( $args );
			$page_ids[ $p['slug'] ] = $existing->ID;
		} else {
			$page_ids[ $p['slug'] ] = wp_insert_post( $args );
		}
	}
	$log[] = sprintf( 'Pages imported: %d', count( $page_ids ) );

	// 2. CPT entries
	foreach ( array( 'paz_team','paz_programme','paz_centre','paz_policy','paz_resource','paz_news' ) as $pt ) {
		$items = (array) ( $data[ $pt ] ?? array() );
		$count = 0;
		foreach ( $items as $item ) {
			$existing = get_page_by_path( $item['slug'], OBJECT, $pt );
			$args = array(
				'post_type'    => $pt,
				'post_status'  => 'publish',
				'post_title'   => $item['title'],
				'post_name'    => $item['slug'],
				'post_excerpt' => $item['excerpt'] ?? '',
				'post_content' => $item['content'] ?? '',
			);
			$post_id = $existing
				? ( wp_update_post( array_merge( $args, array( 'ID' => $existing->ID ) ) ) ? $existing->ID : 0 )
				: wp_insert_post( $args );
			if ( $post_id && ! empty( $item['meta'] ) && is_array( $item['meta'] ) ) {
				foreach ( $item['meta'] as $k => $v ) update_post_meta( $post_id, $k, $v );
			}
			if ( $post_id ) $count++;
		}
		$log[] = sprintf( '%s entries imported: %d', $pt, $count );
	}

	// 3. Homepage + blog
	if ( isset( $page_ids['home'] ) ) {
		update_option( 'show_on_front', 'page' );
		update_option( 'page_on_front', $page_ids['home'] );
	}
	if ( isset( $page_ids['blog'] ) ) {
		update_option( 'page_for_posts', $page_ids['blog'] );
	}

	// 4. Primary menu
	if ( ! empty( $data['menus']['primary'] ) ) {
		$menu_name = 'PAZ Primary';
		$menu = wp_get_nav_menu_object( $menu_name );
		$menu_id = $menu ? $menu->term_id : wp_create_nav_menu( $menu_name );
		// Clear existing items to keep order
		$existing_items = wp_get_nav_menu_items( $menu_id );
		if ( $existing_items ) {
			foreach ( $existing_items as $item ) wp_delete_post( $item->ID, true );
		}
		foreach ( $data['menus']['primary'] as $item ) {
			$obj_id  = isset( $page_ids[ $item['slug'] ] ) ? $page_ids[ $item['slug'] ] : 0;
			wp_update_nav_menu_item( $menu_id, 0, array(
				'menu-item-title'     => $item['title'],
				'menu-item-object'    => $obj_id ? 'page' : 'custom',
				'menu-item-object-id' => $obj_id ? $obj_id : 0,
				'menu-item-type'      => $obj_id ? 'post_type' : 'custom',
				'menu-item-url'       => $obj_id ? get_permalink( $obj_id ) : ( $item['url'] ?? '#' ),
				'menu-item-status'    => 'publish',
			) );
		}
		$locations = get_theme_mod( 'nav_menu_locations' );
		$locations['primary'] = $menu_id;
		set_theme_mod( 'nav_menu_locations', $locations );
		$log[] = 'Primary menu created and assigned.';
	}

	return $log;
}
