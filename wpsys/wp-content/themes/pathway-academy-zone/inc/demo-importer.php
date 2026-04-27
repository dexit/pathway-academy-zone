<?php
/**
 * Demo Importer.
 */
if ( ! defined( 'ABSPATH' ) ) die();

function paz_demo_admin_menu() {
    add_theme_page( 'PAZ Demo Import', 'PAZ Demo Import', 'manage_options', 'paz-demo', 'paz_demo_page' );
}
add_action( 'admin_menu', 'paz_demo_admin_menu' );

function paz_demo_page() {
    ?>
    <div class="wrap">
        <h1>PAZ Demo Import</h1>
        <p>This will import the pages, menus, and custom post types defined in demo.json.</p>
        <form method="post">
            <?php submit_button('Import Demo Content'); ?>
        </form>
    </div>
    <?php
}
