<?php
/**
 * Relationship helpers — query related CPT content by taxonomy or meta.
 *
 * @package PathwayAcademyZone
 */

if ( ! defined( 'ABSPATH' ) ) exit;

/**
 * Return published paz_programme posts filtered by a paz_area_served term slug.
 *
 * @param string $area_slug  Taxonomy term slug (e.g. "stoke-on-trent").
 * @param int    $limit      Max results. -1 = all.
 * @return WP_Post[]
 */
function paz_get_programmes_for_area( string $area_slug, int $limit = -1 ): array {
	$args = array(
		'post_type'      => 'paz_programme',
		'posts_per_page' => $limit,
		'post_status'    => 'publish',
		'orderby'        => 'menu_order title',
		'order'          => 'ASC',
		'no_found_rows'  => true,
	);
	if ( $area_slug ) {
		$args['tax_query'] = array( // phpcs:ignore WordPress.DB.SlowDBQuery
			array(
				'taxonomy' => 'paz_area_served',
				'field'    => 'slug',
				'terms'    => sanitize_title( $area_slug ),
			),
		);
	}
	return get_posts( $args );
}

/**
 * Return published paz_faq posts for a given area slug.
 *
 * @param string $area_slug  paz_area_served term slug.
 * @param int    $limit      Max results.
 * @return WP_Post[]
 */
function paz_get_faqs_for_area( string $area_slug, int $limit = 6 ): array {
	if ( ! $area_slug ) {
		return array();
	}
	return get_posts( array(
		'post_type'      => 'paz_faq',
		'posts_per_page' => $limit,
		'post_status'    => 'publish',
		'orderby'        => 'menu_order title',
		'order'          => 'ASC',
		'no_found_rows'  => true,
		'tax_query'      => array( // phpcs:ignore WordPress.DB.SlowDBQuery
			array(
				'taxonomy' => 'paz_area_served',
				'field'    => 'slug',
				'terms'    => sanitize_title( $area_slug ),
			),
		),
	) );
}

/**
 * Return published paz_faq posts associated with a specific programme.
 *
 * @param int $programme_id  paz_programme post ID.
 * @param int $limit         Max results.
 * @return WP_Post[]
 */
function paz_get_faqs_for_programme( int $programme_id, int $limit = 8 ): array {
	if ( ! $programme_id ) {
		return array();
	}
	return get_posts( array(
		'post_type'      => 'paz_faq',
		'posts_per_page' => $limit,
		'post_status'    => 'publish',
		'orderby'        => 'menu_order title',
		'order'          => 'ASC',
		'no_found_rows'  => true,
		'meta_query'     => array( // phpcs:ignore WordPress.DB.SlowDBQuery
			array(
				'key'   => 'paz_programme_id',
				'value' => $programme_id,
			),
		),
	) );
}

/**
 * Return related paz_resource posts sharing taxonomy terms with $post_id.
 *
 * @param int    $post_id    Source post.
 * @param int    $limit      Max results.
 * @param string $post_type  CPT to query (default paz_resource).
 * @return WP_Post[]
 */
function paz_get_related_resources( int $post_id, int $limit = 4, string $post_type = 'paz_resource' ): array {
	$term_ids = array();
	foreach ( array( 'paz_resource_category', 'paz_area_served' ) as $tax ) {
		$terms = get_the_terms( $post_id, $tax );
		if ( $terms && ! is_wp_error( $terms ) ) {
			$term_ids = array_merge( $term_ids, wp_list_pluck( $terms, 'term_id' ) );
		}
	}
	if ( empty( $term_ids ) ) {
		return get_posts( array(
			'post_type'      => $post_type,
			'posts_per_page' => $limit,
			'post_status'    => 'publish',
			'no_found_rows'  => true,
			'post__not_in'   => array( $post_id ),
		) );
	}
	return get_posts( array(
		'post_type'      => $post_type,
		'posts_per_page' => $limit,
		'post_status'    => 'publish',
		'no_found_rows'  => true,
		'post__not_in'   => array( $post_id ),
		'tax_query'      => array( // phpcs:ignore WordPress.DB.SlowDBQuery
			array(
				'taxonomy' => 'paz_area_served',
				'field'    => 'term_id',
				'terms'    => $term_ids,
				'operator' => 'IN',
			),
		),
	) );
}

/**
 * Find a paz_area post by its slug (post_name).
 *
 * @param string $slug  URL slug (e.g. "stoke-on-trent").
 * @return WP_Post|null
 */
function paz_get_area_by_slug( string $slug ): ?WP_Post {
	$results = get_posts( array(
		'post_type'      => 'paz_area',
		'name'           => sanitize_title( $slug ),
		'posts_per_page' => 1,
		'post_status'    => 'publish',
		'no_found_rows'  => true,
	) );
	return ! empty( $results ) ? $results[0] : null;
}

/**
 * Return paz_testimonial posts for a programme.
 *
 * @param int $programme_id  paz_programme post ID.
 * @param int $limit         Max results.
 * @return WP_Post[]
 */
function paz_get_testimonials_for_programme( int $programme_id, int $limit = 3 ): array {
	if ( ! $programme_id ) {
		return array();
	}
	return get_posts( array(
		'post_type'      => 'paz_testimonial',
		'posts_per_page' => $limit,
		'post_status'    => 'publish',
		'orderby'        => 'date',
		'order'          => 'DESC',
		'no_found_rows'  => true,
		'meta_query'     => array( // phpcs:ignore WordPress.DB.SlowDBQuery
			array(
				'key'   => 'paz_programme_id',
				'value' => $programme_id,
			),
		),
	) );
}
