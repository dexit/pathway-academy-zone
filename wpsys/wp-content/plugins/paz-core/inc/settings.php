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
    // AI settings
    register_setting( 'paz_settings', 'paz_openrouter_api_key' );
    register_setting( 'paz_settings', 'paz_local_ai_url' );
    register_setting( 'paz_settings', 'paz_cors_origins' );
    register_setting( 'paz_settings', 'paz_spa_base_url' );
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

            <h2>AI Settings</h2>
            <p class="description">Configure AI providers. Values set in <code>wp-config.php</code> (constants) take priority over these fields.</p>
            <table class="form-table">
                <tr>
                    <th scope="row">OpenRouter API Key</th>
                    <td>
                        <input type="password" name="paz_openrouter_api_key" value="<?php echo esc_attr( get_option( 'paz_openrouter_api_key' ) ); ?>" class="regular-text" />
                        <p class="description">Used by the AI assistant endpoint. Can also be set via <code>PAZ_OPENROUTER_API_KEY</code> constant or env var.</p>
                    </td>
                </tr>
                <tr>
                    <th scope="row">Local AI URL</th>
                    <td>
                        <input type="url" name="paz_local_ai_url" value="<?php echo esc_attr( get_option( 'paz_local_ai_url' ) ); ?>" class="regular-text" placeholder="http://localhost:11434" />
                        <p class="description">Ollama-compatible endpoint. Can also be set via <code>PAZ_LOCAL_AI_URL</code> constant or env var.</p>
                    </td>
                </tr>
                <tr>
                    <th scope="row">CORS Allowed Origins</th>
                    <td>
                        <input type="text" name="paz_cors_origins" value="<?php echo esc_attr( get_option( 'paz_cors_origins' ) ); ?>" class="large-text" placeholder="https://academy.pathwayl.ink,https://pathwayacademyzone.co.uk" />
                        <p class="description">Comma-separated list of allowed origins for the REST API. Can also be set via <code>PAZ_CORS_ORIGINS</code> constant.</p>
                    </td>
                </tr>
                <tr>
                    <th scope="row">SPA Base URL</th>
                    <td>
                        <input type="url" name="paz_spa_base_url" value="<?php echo esc_attr( get_option( 'paz_spa_base_url' ) ); ?>" class="regular-text" placeholder="https://academy.pathwayl.ink" />
                        <p class="description">URL where the React SPA is hosted, used by the iframe embed block. Can also be set via <code>PAZ_SPA_BASE_URL</code> constant.</p>
                    </td>
                </tr>
            </table>
            <?php submit_button(); ?>
        </form>
    </div>
    <?php
}
