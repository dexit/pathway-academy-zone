<?php
/**
 * Settings and Options API for Pathway Academy Zone.
 */

function paz_register_settings() {
    register_setting( 'paz_settings_group', 'paz_contact_phone' );
    register_setting( 'paz_settings_group', 'paz_contact_email' );
    register_setting( 'paz_settings_group', 'paz_contact_address' );
    register_setting( 'paz_settings_group', 'paz_announcement_text' );

    add_settings_section(
        'paz_settings_section_contact',
        'Contact Information',
        null,
        'paz-settings'
    );

    add_settings_field(
        'paz_contact_phone',
        'Phone Number',
        'paz_settings_field_render',
        'paz-settings',
        'paz_settings_section_contact',
        array( 'label_for' => 'paz_contact_phone' )
    );

    add_settings_field(
        'paz_contact_email',
        'Email Address',
        'paz_settings_field_render',
        'paz-settings',
        'paz_settings_section_contact',
        array( 'label_for' => 'paz_contact_email' )
    );

    add_settings_field(
        'paz_contact_address',
        'Physical Address',
        'paz_settings_field_render',
        'paz-settings',
        'paz_settings_section_contact',
        array( 'label_for' => 'paz_contact_address', 'type' => 'textarea' )
    );
}
add_action( 'admin_init', 'paz_register_settings' );

function paz_settings_field_render( $args ) {
    $option = get_option( $args['label_for'] );
    $type = isset( $args['type'] ) ? $args['type'] : 'text';
    if ( $type === 'textarea' ) {
        echo '<textarea id="' . esc_attr( $args['label_for'] ) . '" name="' . esc_attr( $args['label_for'] ) . '" rows="4" cols="50" class="large-text">' . esc_textarea( $option ) . '</textarea>';
    } else {
        echo '<input type="' . esc_attr( $type ) . '" id="' . esc_attr( $args['label_for'] ) . '" name="' . esc_attr( $args['label_for'] ) . '" value="' . esc_attr( $option ) . '" class="regular-text" />';
    }
}

function paz_add_settings_page() {
    add_options_page(
        'PAZ Settings',
        'PAZ Settings',
        'manage_options',
        'paz-settings',
        'paz_render_settings_page'
    );
}
add_action( 'admin_menu', 'paz_add_settings_page' );

function paz_render_settings_page() {
    ?>
    <div class="wrap">
        <h1>Pathway Academy Zone Settings</h1>
        <form method="post" action="options.php">
            <?php
            settings_fields( 'paz_settings_group' );
            do_settings_sections( 'paz-settings' );
            submit_button();
            ?>
        </form>
    </div>
    <?php
}
