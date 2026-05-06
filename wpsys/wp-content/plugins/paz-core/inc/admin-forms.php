<?php
/**
 * Advanced Admin UI for Form Submissions.
 */
if ( ! defined( 'ABSPATH' ) ) die();

function paz_add_forms_admin_menu() {
    add_submenu_page( 'paz-settings', 'Form Submissions', 'Submissions', 'manage_options', 'paz-form-submissions', 'paz_render_submissions_table' );
}
add_action( 'admin_menu', 'paz_add_forms_admin_menu' );

function paz_render_submissions_table() {
    ?>
    <div class="wrap">
        <h1 class="wp-heading-inline">Form Submissions</h1>
        <hr class="wp-header-end">
        <div id="paz-forms-table-container">
            <table class="wp-list-table widefat fixed striped">
                <thead>
                    <tr>
                        <th style="width:50px;">ID</th>
                        <th>Source</th>
                        <th>Status</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <?php
                    $entries = get_posts( array( 'post_type' => 'paz_form_entry', 'posts_per_page' => 20 ) );
                    if ( empty($entries) ) : ?>
                        <tr><td colspan="5">No submissions found.</td></tr>
                    <?php else:
                    foreach ( $entries as $e ) :
                        $status = get_post_meta( $e->ID, '_paz_webhook_last_status', true ) ?: 'Pending';
                        ?>
                        <tr>
                            <td><?php echo $e->ID; ?></td>
                            <td><strong><?php echo esc_html($e->post_title); ?></strong></td>
                            <td><span class="badge"><?php echo esc_html($status); ?></span></td>
                            <td><?php echo get_the_date( '', $e ); ?></td>
                            <td>
                                <button class="button button-small">View Detail</button>
                                <button class="button button-small">Retry</button>
                            </td>
                        </tr>
                    <?php endforeach; endif; ?>
                </tbody>
            </table>
        </div>
    </div>
    <?php
}
