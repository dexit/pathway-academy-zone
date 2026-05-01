<?php
/**
 * Admin meta boxes for all PAZ custom post types.
 *
 * @package PathwayAcademyZone
 */

if ( ! defined( 'ABSPATH' ) ) exit;

// ── Registration ─────────────────────────────────────────────────────────────

add_action( 'add_meta_boxes', 'paz_register_metaboxes' );

function paz_register_metaboxes(): void {
	add_meta_box( 'paz_area_settings',       __( 'Area Settings',        'pathway-academy-zone' ), 'paz_area_metabox_cb',        'paz_area',        'normal', 'high' );
	add_meta_box( 'paz_programme_details',   __( 'Programme Details',    'pathway-academy-zone' ), 'paz_programme_metabox_cb',   'paz_programme',   'normal', 'high' );
	add_meta_box( 'paz_testimonial_details', __( 'Testimonial Details',  'pathway-academy-zone' ), 'paz_testimonial_metabox_cb', 'paz_testimonial', 'normal', 'high' );
	add_meta_box( 'paz_partner_details',     __( 'Partner Details',      'pathway-academy-zone' ), 'paz_partner_metabox_cb',     'paz_partner',     'normal', 'high' );
	add_meta_box( 'paz_team_extra',          __( 'Team Member Details',  'pathway-academy-zone' ), 'paz_team_metabox_cb',        'paz_team',        'normal', 'high' );
	add_meta_box( 'paz_centre_extra',        __( 'Centre Details',       'pathway-academy-zone' ), 'paz_centre_metabox_cb',      'paz_centre',      'normal', 'high' );
}

// ── Shared helpers ────────────────────────────────────────────────────────────

/**
 * Render a text input row inside a metabox.
 */
function paz_mb_text( string $id, string $label, string $value, string $type = 'text' ): void {
	printf(
		'<p><label for="%1$s" style="display:block;font-weight:600;margin-bottom:4px">%2$s</label><input type="%3$s" id="%1$s" name="%1$s" value="%4$s" class="widefat" /></p>',
		esc_attr( $id ),
		esc_html( $label ),
		esc_attr( $type ),
		esc_attr( $value )
	);
}

/**
 * Render a textarea row inside a metabox.
 */
function paz_mb_textarea( string $id, string $label, string $value, string $help = '' ): void {
	printf(
		'<p><label for="%1$s" style="display:block;font-weight:600;margin-bottom:4px">%2$s</label><textarea id="%1$s" name="%1$s" rows="4" class="widefat">%3$s</textarea>%4$s</p>',
		esc_attr( $id ),
		esc_html( $label ),
		esc_textarea( $value ),
		$help ? '<span class="description">' . esc_html( $help ) . '</span>' : ''
	);
}

/**
 * Render a select row inside a metabox.
 *
 * @param array<string,string> $options key => label pairs.
 */
function paz_mb_select( string $id, string $label, string $current, array $options ): void {
	echo '<p><label for="' . esc_attr( $id ) . '" style="display:block;font-weight:600;margin-bottom:4px">' . esc_html( $label ) . '</label>';
	echo '<select id="' . esc_attr( $id ) . '" name="' . esc_attr( $id ) . '" class="widefat">';
	foreach ( $options as $val => $text ) {
		printf( '<option value="%s"%s>%s</option>', esc_attr( $val ), selected( $current, $val, false ), esc_html( $text ) );
	}
	echo '</select></p>';
}

// ── paz_area metabox ──────────────────────────────────────────────────────────

function paz_area_metabox_cb( WP_Post $post ): void {
	wp_nonce_field( 'paz_area_save', 'paz_area_nonce' );
	$g = fn( $k ) => get_post_meta( $post->ID, $k, true );

	paz_mb_text(     'paz_hero_headline', __( 'Hero Headline',    'pathway-academy-zone' ), $g( 'paz_hero_headline' ) );
	paz_mb_textarea( 'paz_hero_body',     __( 'Hero Body Text',   'pathway-academy-zone' ), $g( 'paz_hero_body' ) );
	paz_mb_text(     'paz_region',        __( 'Region',           'pathway-academy-zone' ), $g( 'paz_region' ) );
	paz_mb_text(     'paz_lat',           __( 'Latitude',         'pathway-academy-zone' ), $g( 'paz_lat' ) );
	paz_mb_text(     'paz_lng',           __( 'Longitude',        'pathway-academy-zone' ), $g( 'paz_lng' ) );
	paz_mb_text(     'paz_nearby_areas',  __( 'Nearby Area Slugs (comma-separated)', 'pathway-academy-zone' ), $g( 'paz_nearby_areas' ) );
}

add_action( 'save_post_paz_area', 'paz_area_save_cb', 10, 2 );

function paz_area_save_cb( int $post_id, WP_Post $post ): void {
	if ( ! isset( $_POST['paz_area_nonce'] ) || ! wp_verify_nonce( sanitize_key( $_POST['paz_area_nonce'] ), 'paz_area_save' ) ) return;
	if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) return;
	if ( ! current_user_can( 'edit_post', $post_id ) ) return;

	$fields = array(
		'paz_hero_headline' => 'sanitize_text_field',
		'paz_hero_body'     => 'wp_kses_post',
		'paz_region'        => 'sanitize_text_field',
		'paz_lat'           => 'sanitize_text_field',
		'paz_lng'           => 'sanitize_text_field',
		'paz_nearby_areas'  => 'sanitize_text_field',
	);
	foreach ( $fields as $key => $cb ) {
		if ( isset( $_POST[ $key ] ) ) {
			update_post_meta( $post_id, $key, $cb( wp_unslash( $_POST[ $key ] ) ) );
		}
	}
}

// ── paz_programme metabox ─────────────────────────────────────────────────────

function paz_programme_metabox_cb( WP_Post $post ): void {
	wp_nonce_field( 'paz_programme_save', 'paz_programme_nonce' );
	$g = fn( $k ) => get_post_meta( $post->ID, $k, true );

	paz_mb_text(     'paz_subtitle',       __( 'Subtitle',                   'pathway-academy-zone' ), $g( 'paz_subtitle' ) );
	paz_mb_text(     'paz_duration',       __( 'Duration (e.g. "12 weeks")', 'pathway-academy-zone' ), $g( 'paz_duration' ) );
	paz_mb_text(     'paz_key_stage',      __( 'Key Stage (e.g. KS3, KS4)', 'pathway-academy-zone' ), $g( 'paz_key_stage' ) );
	paz_mb_text(     'paz_age_range',      __( 'Age Range (e.g. 11–16)',     'pathway-academy-zone' ), $g( 'paz_age_range' ) );
	paz_mb_text(     'paz_icon_name',      __( 'Icon Name (dashicon slug)',  'pathway-academy-zone' ), $g( 'paz_icon_name' ) );
	paz_mb_text(     'paz_colour',         __( 'Accent Colour (hex or CSS)', 'pathway-academy-zone' ), $g( 'paz_colour' ) );
	paz_mb_textarea( 'paz_outcomes',       __( 'Learning Outcomes (one per line)', 'pathway-academy-zone' ), $g( 'paz_outcomes' ), __( 'Each line becomes one outcome bullet.', 'pathway-academy-zone' ) );
	paz_mb_textarea( 'paz_certifications', __( 'Certifications / Quals (one per line)', 'pathway-academy-zone' ), $g( 'paz_certifications' ) );
}

add_action( 'save_post_paz_programme', 'paz_programme_save_cb', 10, 2 );

function paz_programme_save_cb( int $post_id, WP_Post $post ): void {
	if ( ! isset( $_POST['paz_programme_nonce'] ) || ! wp_verify_nonce( sanitize_key( $_POST['paz_programme_nonce'] ), 'paz_programme_save' ) ) return;
	if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) return;
	if ( ! current_user_can( 'edit_post', $post_id ) ) return;

	$fields = array(
		'paz_subtitle'       => 'sanitize_text_field',
		'paz_duration'       => 'sanitize_text_field',
		'paz_key_stage'      => 'sanitize_text_field',
		'paz_age_range'      => 'sanitize_text_field',
		'paz_icon_name'      => 'sanitize_text_field',
		'paz_colour'         => 'sanitize_text_field',
		'paz_outcomes'       => 'sanitize_textarea_field',
		'paz_certifications' => 'sanitize_textarea_field',
	);
	foreach ( $fields as $key => $cb ) {
		if ( isset( $_POST[ $key ] ) ) {
			update_post_meta( $post_id, $key, $cb( wp_unslash( $_POST[ $key ] ) ) );
		}
	}
}

// ── paz_testimonial metabox ───────────────────────────────────────────────────

function paz_testimonial_metabox_cb( WP_Post $post ): void {
	wp_nonce_field( 'paz_testimonial_save', 'paz_testimonial_nonce' );
	$g = fn( $k ) => get_post_meta( $post->ID, $k, true );

	paz_mb_text(   'paz_author_name', __( 'Author Name',         'pathway-academy-zone' ), $g( 'paz_author_name' ) );
	paz_mb_text(   'paz_author_role', __( 'Author Role / Title', 'pathway-academy-zone' ), $g( 'paz_author_role' ) );
	paz_mb_text(   'paz_school',      __( 'School / Organisation', 'pathway-academy-zone' ), $g( 'paz_school' ) );
	paz_mb_text(   'paz_programme_id', __( 'Programme Post ID',  'pathway-academy-zone' ), $g( 'paz_programme_id' ), 'number' );
	paz_mb_select( 'paz_rating',      __( 'Star Rating',         'pathway-academy-zone' ), $g( 'paz_rating' ) ?: '5', array(
		'5' => '★★★★★ (5)',
		'4' => '★★★★☆ (4)',
		'3' => '★★★☆☆ (3)',
		'2' => '★★☆☆☆ (2)',
		'1' => '★☆☆☆☆ (1)',
	) );
}

add_action( 'save_post_paz_testimonial', 'paz_testimonial_save_cb', 10, 2 );

function paz_testimonial_save_cb( int $post_id, WP_Post $post ): void {
	if ( ! isset( $_POST['paz_testimonial_nonce'] ) || ! wp_verify_nonce( sanitize_key( $_POST['paz_testimonial_nonce'] ), 'paz_testimonial_save' ) ) return;
	if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) return;
	if ( ! current_user_can( 'edit_post', $post_id ) ) return;

	foreach ( array(
		'paz_author_name' => 'sanitize_text_field',
		'paz_author_role' => 'sanitize_text_field',
		'paz_school'      => 'sanitize_text_field',
		'paz_programme_id'=> 'absint',
		'paz_rating'      => 'absint',
	) as $key => $cb ) {
		if ( isset( $_POST[ $key ] ) ) {
			update_post_meta( $post_id, $key, $cb( wp_unslash( $_POST[ $key ] ) ) );
		}
	}
}

// ── paz_partner metabox ───────────────────────────────────────────────────────

function paz_partner_metabox_cb( WP_Post $post ): void {
	wp_nonce_field( 'paz_partner_save', 'paz_partner_nonce' );
	$g = fn( $k ) => get_post_meta( $post->ID, $k, true );

	paz_mb_text(   'paz_website_url', __( 'Website URL',   'pathway-academy-zone' ), $g( 'paz_website_url' ), 'url' );
	paz_mb_text(   'paz_logo_url',    __( 'Logo URL',      'pathway-academy-zone' ), $g( 'paz_logo_url' ),    'url' );
	paz_mb_select( 'paz_partner_type', __( 'Partner Type', 'pathway-academy-zone' ), $g( 'paz_partner_type' ), array(
		''         => __( '— Select type —', 'pathway-academy-zone' ),
		'school'   => __( 'School',          'pathway-academy-zone' ),
		'ngo'      => __( 'NGO / Charity',   'pathway-academy-zone' ),
		'employer' => __( 'Employer',        'pathway-academy-zone' ),
		'la'       => __( 'Local Authority', 'pathway-academy-zone' ),
	) );
}

add_action( 'save_post_paz_partner', 'paz_partner_save_cb', 10, 2 );

function paz_partner_save_cb( int $post_id, WP_Post $post ): void {
	if ( ! isset( $_POST['paz_partner_nonce'] ) || ! wp_verify_nonce( sanitize_key( $_POST['paz_partner_nonce'] ), 'paz_partner_save' ) ) return;
	if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) return;
	if ( ! current_user_can( 'edit_post', $post_id ) ) return;

	foreach ( array(
		'paz_website_url'  => 'esc_url_raw',
		'paz_logo_url'     => 'esc_url_raw',
		'paz_partner_type' => 'sanitize_key',
	) as $key => $cb ) {
		if ( isset( $_POST[ $key ] ) ) {
			update_post_meta( $post_id, $key, $cb( wp_unslash( $_POST[ $key ] ) ) );
		}
	}
}

// ── paz_team metabox ──────────────────────────────────────────────────────────

function paz_team_metabox_cb( WP_Post $post ): void {
	wp_nonce_field( 'paz_team_save', 'paz_team_nonce' );
	$g = fn( $k ) => get_post_meta( $post->ID, $k, true );

	paz_mb_text(     'paz_role',         __( 'Job Title / Role',      'pathway-academy-zone' ), $g( 'paz_role' ) );
	paz_mb_text(     'paz_email',        __( 'Email Address',         'pathway-academy-zone' ), $g( 'paz_email' ), 'email' );
	paz_mb_text(     'paz_centre_id',    __( 'Centre Post ID',        'pathway-academy-zone' ), $g( 'paz_centre_id' ), 'number' );
	paz_mb_text(     'paz_linkedin_url', __( 'LinkedIn URL',          'pathway-academy-zone' ), $g( 'paz_linkedin_url' ), 'url' );
	paz_mb_textarea( 'paz_bio_short',    __( 'Short Bio (1–2 sentences)', 'pathway-academy-zone' ), $g( 'paz_bio_short' ) );
}

add_action( 'save_post_paz_team', 'paz_team_save_cb', 10, 2 );

function paz_team_save_cb( int $post_id, WP_Post $post ): void {
	if ( ! isset( $_POST['paz_team_nonce'] ) || ! wp_verify_nonce( sanitize_key( $_POST['paz_team_nonce'] ), 'paz_team_save' ) ) return;
	if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) return;
	if ( ! current_user_can( 'edit_post', $post_id ) ) return;

	foreach ( array(
		'paz_role'         => 'sanitize_text_field',
		'paz_email'        => 'sanitize_email',
		'paz_centre_id'    => 'absint',
		'paz_linkedin_url' => 'esc_url_raw',
		'paz_bio_short'    => 'sanitize_textarea_field',
	) as $key => $cb ) {
		if ( isset( $_POST[ $key ] ) ) {
			update_post_meta( $post_id, $key, $cb( wp_unslash( $_POST[ $key ] ) ) );
		}
	}
}

// ── paz_centre metabox ────────────────────────────────────────────────────────

function paz_centre_metabox_cb( WP_Post $post ): void {
	wp_nonce_field( 'paz_centre_save', 'paz_centre_nonce' );
	$g = fn( $k ) => get_post_meta( $post->ID, $k, true );

	paz_mb_text(     'paz_address',       __( 'Full Address',    'pathway-academy-zone' ), $g( 'paz_address' ) );
	paz_mb_text(     'paz_phone',         __( 'Phone Number',    'pathway-academy-zone' ), $g( 'paz_phone' ), 'tel' );
	paz_mb_text(     'paz_lat',           __( 'Latitude',        'pathway-academy-zone' ), $g( 'paz_lat' ) );
	paz_mb_text(     'paz_lng',           __( 'Longitude',       'pathway-academy-zone' ), $g( 'paz_lng' ) );
	paz_mb_text(     'paz_map_url',       __( 'Google Maps URL', 'pathway-academy-zone' ), $g( 'paz_map_url' ), 'url' );
	paz_mb_textarea( 'paz_opening_hours', __( 'Opening Hours (JSON array of {day,opens,closes})', 'pathway-academy-zone' ), $g( 'paz_opening_hours' ) );
}

add_action( 'save_post_paz_centre', 'paz_centre_save_cb', 10, 2 );

function paz_centre_save_cb( int $post_id, WP_Post $post ): void {
	if ( ! isset( $_POST['paz_centre_nonce'] ) || ! wp_verify_nonce( sanitize_key( $_POST['paz_centre_nonce'] ), 'paz_centre_save' ) ) return;
	if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) return;
	if ( ! current_user_can( 'edit_post', $post_id ) ) return;

	foreach ( array(
		'paz_address'       => 'sanitize_textarea_field',
		'paz_phone'         => 'sanitize_text_field',
		'paz_lat'           => 'sanitize_text_field',
		'paz_lng'           => 'sanitize_text_field',
		'paz_map_url'       => 'esc_url_raw',
		'paz_opening_hours' => 'sanitize_textarea_field',
	) as $key => $cb ) {
		if ( isset( $_POST[ $key ] ) ) {
			update_post_meta( $post_id, $key, $cb( wp_unslash( $_POST[ $key ] ) ) );
		}
	}
}
