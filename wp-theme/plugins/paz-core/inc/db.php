<?php
if (!defined('ABSPATH')) exit;

function paz_setup_db() {
    global $wpdb;
    $charset_collate = $wpdb->get_charset_collate();
    $table_name = $wpdb->prefix . 'paz_submissions';

    $sql = "CREATE TABLE $table_name (
        id bigint(20) NOT NULL AUTO_INCREMENT,
        form_type varchar(50) NOT NULL,
        payload longtext NOT NULL,
        ip_address varchar(45) NOT NULL,
        status varchar(20) DEFAULT 'pending' NOT NULL,
        retries int(11) DEFAULT 0 NOT NULL,
        last_error text,
        created_at datetime DEFAULT CURRENT_TIMESTAMP NOT NULL,
        PRIMARY KEY  (id),
        KEY ip_address (ip_address),
        KEY status (status)
    ) $charset_collate;";

    require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
    dbDelta($sql);

    // Rate limiting table
    $limit_table = $wpdb->prefix . 'paz_rate_limits';
    $sql_limit = "CREATE TABLE $limit_table (
        ip_address varchar(45) NOT NULL,
        last_hit int(11) NOT NULL,
        hits int(11) NOT NULL,
        PRIMARY KEY  (ip_address)
    ) $charset_collate;";
    dbDelta($sql_limit);
}
