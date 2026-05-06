<?php
/**
 * PAZ Settings & Options API.
 */
if ( ! defined( 'ABSPATH' ) ) die();

function paz_register_settings() {
    register_setting( 'paz_settings', 'paz_contact_phone' );
    register_setting( 'paz_settings', 'paz_contact_email' );
    register_setting( 'paz_settings', 'paz_announcement_text' );
    register_setting( 'paz_settings', 'paz_announcement_link' );
}
add_action( 'admin_init', 'paz_register_settings' );

function paz_settings_menu() {
    add_options_page( 'PAZ Settings', 'PAZ Settings', 'manage_options', 'paz-settings', 'paz_settings_page' );
}
add_action( 'admin_menu', 'paz_settings_menu' );

function paz_settings_page() {
    ?>
    <div class="wrap">
        <h1>PAZ Settings</h1>
        <form method="post" action="options.php">
            <?php
            settings_fields( 'paz_settings' );
            do_settings_sections( 'paz_settings' );
            ?>
            <table class="form-table">
                <tr>
                    <th scope="row">Contact Phone</th>
                    <td><input type="text" name="paz_contact_phone" value="<?php echo esc_attr( get_option( 'paz_contact_phone' ) ); ?>" /></td>
                </tr>
                <tr>
                    <th scope="row">Contact Email</th>
                    <td><input type="text" name="paz_contact_email" value="<?php echo esc_attr( get_option( 'paz_contact_email' ) ); ?>" /></td>
                </tr>
                <tr>
                    <th scope="row">Announcement Text</th>
                    <td><textarea name="paz_announcement_text"><?php echo esc_textarea( get_option( 'paz_announcement_text' ) ); ?></textarea></td>
                </tr>
            </table>
            <?php submit_button(); ?>
        </form>
    </div>
    <?php
}
