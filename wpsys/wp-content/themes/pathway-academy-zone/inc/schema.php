<?php
/**
 * Inject Organization + LocalBusiness + BreadcrumbList JSON-LD into <head>
 * so the WP theme matches the React SPA's structured data parity.
 *
 * @package PathwayAcademyZone
 */

if ( ! defined( 'ABSPATH' ) ) exit;

function paz_render_jsonld() {
	// If Yoast or Rank Math is active, defer to their much richer graph to
	// avoid duplicate Organization/WebSite entities on the page.
	if ( defined( 'WPSEO_VERSION' ) || class_exists( 'RankMath' ) ) {
		return;
	}
	$home = home_url( '/' );
	$logo = esc_url( PAZ_THEME_URI . 'assets/logo.png' );

	$graph = array(
		array(
			'@type'       => 'Organization',
			'@id'         => $home . '#org',
			'name'        => 'Pathway Academy Zone',
			'url'         => $home,
			'logo'        => $logo,
			'sameAs'      => array(
				'https://www.facebook.com/pathwayacademyzone',
				'https://www.linkedin.com/company/pathway-academy-zone',
			),
			'contactPoint'=> array(
				'@type'       => 'ContactPoint',
				'telephone'   => '+44 1782 365365',
				'contactType' => 'customer service',
				'areaServed'  => 'GB',
				'availableLanguage' => array( 'en' ),
			),
		),
		array(
			'@type'       => array( 'EducationalOrganization', 'LocalBusiness' ),
			'@id'         => $home . '#edu',
			'name'        => 'Pathway Academy Zone',
			'url'         => $home,
			'telephone'   => '+44 1782 365365',
			'address'     => array(
				'@type'           => 'PostalAddress',
				'streetAddress'   => 'Pathway Academy Zone',
				'addressLocality' => 'Stoke-on-Trent',
				'addressRegion'   => 'Staffordshire',
				'addressCountry'  => 'GB',
			),
			'areaServed'  => array(
				array( '@type' => 'City', 'name' => 'Stoke-on-Trent' ),
				array( '@type' => 'City', 'name' => 'Newcastle-under-Lyme' ),
				array( '@type' => 'City', 'name' => 'Stafford' ),
				array( '@type' => 'City', 'name' => 'Cannock' ),
				array( '@type' => 'City', 'name' => 'Lichfield' ),
				array( '@type' => 'City', 'name' => 'Tamworth' ),
				array( '@type' => 'City', 'name' => 'Wolverhampton' ),
				array( '@type' => 'City', 'name' => 'Leek' ),
				array( '@type' => 'AdministrativeArea', 'name' => 'Staffordshire' ),
				array( '@type' => 'AdministrativeArea', 'name' => 'Staffordshire Moorlands' ),
				array( '@type' => 'AdministrativeArea', 'name' => 'West Midlands' ),
			),
			'contactPoint' => array(
				array(
					'@type'       => 'ContactPoint',
					'telephone'   => '+44 1782 365365',
					'contactType' => 'customer service',
					'areaServed'  => array(
						array( '@type' => 'City', 'name' => 'Stoke-on-Trent' ),
						array( '@type' => 'City', 'name' => 'Newcastle-under-Lyme' ),
						array( '@type' => 'City', 'name' => 'Stafford' ),
						array( '@type' => 'City', 'name' => 'Cannock' ),
						array( '@type' => 'City', 'name' => 'Lichfield' ),
						array( '@type' => 'City', 'name' => 'Tamworth' ),
						array( '@type' => 'City', 'name' => 'Wolverhampton' ),
						array( '@type' => 'City', 'name' => 'Leek' ),
						array( '@type' => 'AdministrativeArea', 'name' => 'Staffordshire' ),
						array( '@type' => 'AdministrativeArea', 'name' => 'Staffordshire Moorlands' ),
						array( '@type' => 'AdministrativeArea', 'name' => 'West Midlands' ),
					),
					'availableLanguage' => array( 'en' ),
				),
				array(
					'@type'       => 'ContactPoint',
					'telephone'   => '+44 1782 365365',
					'contactType' => 'referrals',
					'areaServed'  => array(
						array( '@type' => 'City', 'name' => 'Stoke-on-Trent' ),
						array( '@type' => 'City', 'name' => 'Newcastle-under-Lyme' ),
						array( '@type' => 'City', 'name' => 'Stafford' ),
						array( '@type' => 'City', 'name' => 'Cannock' ),
						array( '@type' => 'City', 'name' => 'Lichfield' ),
						array( '@type' => 'City', 'name' => 'Tamworth' ),
						array( '@type' => 'City', 'name' => 'Wolverhampton' ),
						array( '@type' => 'City', 'name' => 'Leek' ),
						array( '@type' => 'AdministrativeArea', 'name' => 'Staffordshire' ),
						array( '@type' => 'AdministrativeArea', 'name' => 'Staffordshire Moorlands' ),
						array( '@type' => 'AdministrativeArea', 'name' => 'West Midlands' ),
					),
					'availableLanguage' => array( 'en' ),
				),
				array(
					'@type'       => 'ContactPoint',
					'telephone'   => '+44 1782 365365',
					'contactType' => 'admissions',
					'areaServed'  => array(
						array( '@type' => 'City', 'name' => 'Stoke-on-Trent' ),
						array( '@type' => 'City', 'name' => 'Newcastle-under-Lyme' ),
						array( '@type' => 'City', 'name' => 'Stafford' ),
						array( '@type' => 'City', 'name' => 'Cannock' ),
						array( '@type' => 'City', 'name' => 'Lichfield' ),
						array( '@type' => 'City', 'name' => 'Tamworth' ),
						array( '@type' => 'City', 'name' => 'Wolverhampton' ),
						array( '@type' => 'City', 'name' => 'Leek' ),
						array( '@type' => 'AdministrativeArea', 'name' => 'Staffordshire' ),
						array( '@type' => 'AdministrativeArea', 'name' => 'Staffordshire Moorlands' ),
						array( '@type' => 'AdministrativeArea', 'name' => 'West Midlands' ),
					),
					'availableLanguage' => array( 'en' ),
				),
			),
			'openingHours'=> 'Mo-Fr 08:30-15:30',
		),
		array(
			'@type'       => 'WebSite',
			'@id'         => $home . '#site',
			'url'         => $home,
			'name'        => get_bloginfo( 'name' ),
			'potentialAction' => array(
				'@type'       => 'SearchAction',
				'target'      => array(
					'@type'       => 'EntryPoint',
					'urlTemplate' => $home . '?s={search_term_string}',
				),
				'query-input' => 'required name=search_term_string',
			),
		),
	);

	if ( ! is_front_page() ) {
		$crumbs = array( array( 'name' => 'Home', 'item' => $home ) );
		if ( is_singular() ) {
			$crumbs[] = array( 'name' => get_the_title(), 'item' => get_permalink() );
		} elseif ( is_archive() ) {
			$crumbs[] = array( 'name' => wp_strip_all_tags( get_the_archive_title() ), 'item' => get_pagenum_link() );
		} elseif ( is_search() ) {
			$crumbs[] = array( 'name' => sprintf( 'Search: %s', get_search_query() ), 'item' => get_search_link() );
		}
		$items = array();
		foreach ( $crumbs as $i => $c ) {
			$items[] = array(
				'@type'    => 'ListItem',
				'position' => $i + 1,
				'name'     => $c['name'],
				'item'     => $c['item'],
			);
		}
		$graph[] = array(
			'@type'           => 'BreadcrumbList',
			'itemListElement' => $items,
		);
	}

	$json = array( '@context' => 'https://schema.org', '@graph' => $graph );
	echo "\n" . '<script type="application/ld+json">' . wp_json_encode( $json, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE ) . '</script>' . "\n";
}
add_action( 'wp_head', 'paz_render_jsonld', 5 );

/**
 * JobPosting JSON-LD for single paz_vacancy entries. Google requires
 * title, description, datePosted, hiringOrganization, and jobLocation
 * (or applicantLocationRequirements for remote) — everything else is
 * optional but boosts rich-result eligibility.
 */
function paz_render_jobposting_jsonld() {
	if ( ! is_singular( 'paz_vacancy' ) ) {
		return;
	}
	// Don't duplicate if an SEO plugin already ships one.
	if ( defined( 'WPSEO_VERSION' ) || class_exists( 'RankMath' ) ) {
		return;
	}
	$post_id = get_the_ID();
	$home    = home_url( '/' );

	$employment = get_post_meta( $post_id, 'paz_job_employment_type', true ) ?: 'FULL_TIME';
	$loc_type   = get_post_meta( $post_id, 'paz_job_location_type',   true );
	$city       = get_post_meta( $post_id, 'paz_job_city',            true ) ?: 'Stoke-on-Trent';
	$region     = get_post_meta( $post_id, 'paz_job_region',          true ) ?: 'Staffordshire';
	$postcode   = get_post_meta( $post_id, 'paz_job_postcode',        true );
	$country    = get_post_meta( $post_id, 'paz_job_country',         true ) ?: 'GB';
	$salary_min = get_post_meta( $post_id, 'paz_job_salary_min',      true );
	$salary_max = get_post_meta( $post_id, 'paz_job_salary_max',      true );
	$currency   = get_post_meta( $post_id, 'paz_job_salary_currency', true ) ?: 'GBP';
	$unit       = get_post_meta( $post_id, 'paz_job_salary_unit',     true ) ?: 'YEAR';
	$valid_thru = get_post_meta( $post_id, 'paz_job_valid_through',   true );
	$apply_url  = get_post_meta( $post_id, 'paz_job_apply_url',       true ) ?: get_permalink();

	$job = array(
		'@context'            => 'https://schema.org',
		'@type'               => 'JobPosting',
		'title'               => get_the_title(),
		'description'         => wp_strip_all_tags( apply_filters( 'the_content', get_the_content() ) ),
		'datePosted'          => get_the_date( 'c' ),
		'employmentType'      => $employment,
		'hiringOrganization'  => array(
			'@type'  => 'Organization',
			'name'   => 'Pathway Academy Zone',
			'sameAs' => $home,
			'logo'   => esc_url( PAZ_THEME_URI . 'assets/logo.png' ),
		),
		'directApply'         => (bool) $apply_url,
		'url'                 => get_permalink(),
	);

	if ( $valid_thru ) {
		$job['validThrough'] = $valid_thru;
	}
	if ( 'TELECOMMUTE' === $loc_type ) {
		$job['jobLocationType'] = 'TELECOMMUTE';
		$job['applicantLocationRequirements'] = array(
			'@type' => 'Country',
			'name'  => $country,
		);
	} else {
		$job['jobLocation'] = array(
			'@type'   => 'Place',
			'address' => array_filter( array(
				'@type'           => 'PostalAddress',
				'addressLocality' => $city,
				'addressRegion'   => $region,
				'postalCode'      => $postcode,
				'addressCountry'  => $country,
			) ),
		);
	}
	if ( $salary_min || $salary_max ) {
		$value = array(
			'@type'    => 'QuantitativeValue',
			'unitText' => $unit,
		);
		if ( $salary_min && $salary_max ) {
			$value['minValue'] = (float) $salary_min;
			$value['maxValue'] = (float) $salary_max;
		} else {
			$value['value'] = (float) ( $salary_min ?: $salary_max );
		}
		$job['baseSalary'] = array(
			'@type'    => 'MonetaryAmount',
			'currency' => $currency,
			'value'    => $value,
		);
	}

	echo "\n" . '<script type="application/ld+json">' . wp_json_encode( $job, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE ) . '</script>' . "\n";
}
add_action( 'wp_head', 'paz_render_jobposting_jsonld', 6 );

// ---------------------------------------------------------------------------
// Helper: full area-served array used by multiple schema functions.
// ---------------------------------------------------------------------------

/**
 * Return the canonical 11-item areaServed array for schema.org output.
 *
 * @return array<int, array<string, string>>
 */
function paz_schema_area_served_full(): array {
	return array(
		array( '@type' => 'City', 'name' => 'Stoke-on-Trent' ),
		array( '@type' => 'City', 'name' => 'Newcastle-under-Lyme' ),
		array( '@type' => 'City', 'name' => 'Stafford' ),
		array( '@type' => 'City', 'name' => 'Cannock' ),
		array( '@type' => 'City', 'name' => 'Lichfield' ),
		array( '@type' => 'City', 'name' => 'Tamworth' ),
		array( '@type' => 'City', 'name' => 'Wolverhampton' ),
		array( '@type' => 'City', 'name' => 'Leek' ),
		array( '@type' => 'AdministrativeArea', 'name' => 'Staffordshire' ),
		array( '@type' => 'AdministrativeArea', 'name' => 'Staffordshire Moorlands' ),
		array( '@type' => 'AdministrativeArea', 'name' => 'West Midlands' ),
	);
}

// ---------------------------------------------------------------------------
// Course / Programme JSON-LD
// ---------------------------------------------------------------------------

/**
 * Emit Course+Product JSON-LD for single paz_programme entries.
 * Fires on wp_head at priority 7, after the global org schema (priority 5).
 */
function paz_render_programme_jsonld(): void {
	if ( ! is_singular( 'paz_programme' ) ) {
		return;
	}
	if ( defined( 'WPSEO_VERSION' ) || class_exists( 'RankMath' ) ) {
		return;
	}

	$post_id   = get_the_ID();
	$home      = home_url( '/' );
	$permalink = get_permalink();
	$title     = get_the_title();

	$excerpt = get_the_excerpt();
	if ( ! $excerpt ) {
		$excerpt = wp_trim_words( wp_strip_all_tags( get_the_content() ), 40 );
	}

	$key_stage = get_post_meta( $post_id, 'paz_key_stage', true );
	$duration  = get_post_meta( $post_id, 'paz_duration', true );

	// Build areaServed from taxonomy terms, fall back to full list.
	$area_served_out = array();
	$terms = get_the_terms( $post_id, 'paz_area_served' );
	if ( $terms && ! is_wp_error( $terms ) ) {
		foreach ( $terms as $term ) {
			$area_served_out[] = array( '@type' => 'City', 'name' => esc_html( $term->name ) );
		}
	}
	if ( empty( $area_served_out ) ) {
		$area_served_out = paz_schema_area_served_full();
	}

	$course = array(
		'@type'          => array( 'Course', 'Product' ),
		'@id'            => $permalink . '#course',
		'name'           => $title,
		'description'    => $excerpt,
		'provider'       => array( '@id' => $home . '#org' ),
		'offers'         => array(
			'@type'        => 'Offer',
			'url'          => $permalink,
			'availability' => 'https://schema.org/InStock',
			'areaServed'   => $area_served_out,
		),
		'hasCourseInstance' => array(
			'@type'      => 'CourseInstance',
			'courseMode' => 'onsite',
			'location'   => array(
				'@type'   => 'Place',
				'name'    => 'Pathway Academy Zone',
				'address' => array(
					'@type'           => 'PostalAddress',
					'addressLocality' => 'Stoke-on-Trent',
					'addressRegion'   => 'Staffordshire',
					'addressCountry'  => 'GB',
				),
			),
		),
	);

	if ( $key_stage ) {
		$course['educationalLevel'] = $key_stage;
	}
	if ( $duration ) {
		$course['timeRequired'] = $duration;
	}

	$json = array( '@context' => 'https://schema.org', '@graph' => array( $course ) );
	echo "\n" . '<script type="application/ld+json">' . wp_json_encode( $json, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE ) . '</script>' . "\n";
}
add_action( 'wp_head', 'paz_render_programme_jsonld', 7 );

// ---------------------------------------------------------------------------
// Area JSON-LD
// ---------------------------------------------------------------------------

/**
 * Emit Service + LocalBusiness JSON-LD for single paz_area entries.
 * Fires on wp_head at priority 7.
 */
function paz_render_area_jsonld(): void {
	if ( ! is_singular( 'paz_area' ) ) {
		return;
	}
	if ( defined( 'WPSEO_VERSION' ) || class_exists( 'RankMath' ) ) {
		return;
	}

	$post    = get_post();
	$home    = home_url( '/' );
	$title   = get_the_title();
	$slug    = $post->post_name;

	// Build offer catalogue from related programmes.
	$offer_list = array();
	if ( function_exists( 'paz_get_programmes_for_area' ) ) {
		$programmes = paz_get_programmes_for_area( $slug );
		foreach ( $programmes as $prog ) {
			$offer_list[] = array(
				'@type' => 'Offer',
				'name'  => esc_html( get_the_title( $prog ) ),
				'url'   => esc_url( get_permalink( $prog ) ),
			);
		}
	}

	$service = array(
		'@type'    => 'Service',
		'name'     => sprintf( 'Alternative Provision in %s', $title ),
		'provider' => array( '@id' => $home . '#org' ),
		'areaServed' => array(
			array( '@type' => 'City', 'name' => $title ),
			array( '@type' => 'AdministrativeArea', 'name' => 'Staffordshire' ),
			array( '@type' => 'AdministrativeArea', 'name' => 'West Midlands' ),
		),
	);

	if ( ! empty( $offer_list ) ) {
		$service['hasOfferCatalog'] = array(
			'@type'           => 'OfferCatalog',
			'name'            => sprintf( 'Alternative Provision Programmes in %s', $title ),
			'itemListElement' => $offer_list,
		);
	}

	$json = array( '@context' => 'https://schema.org', '@graph' => array( $service ) );
	echo "\n" . '<script type="application/ld+json">' . wp_json_encode( $json, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE ) . '</script>' . "\n";
}
add_action( 'wp_head', 'paz_render_area_jsonld', 7 );

// ---------------------------------------------------------------------------
// Resource / Article JSON-LD
// ---------------------------------------------------------------------------

/**
 * Emit Article JSON-LD for single paz_resource entries.
 * Fires on wp_head at priority 7.
 */
function paz_render_resource_jsonld(): void {
	if ( ! is_singular( 'paz_resource' ) ) {
		return;
	}
	if ( defined( 'WPSEO_VERSION' ) || class_exists( 'RankMath' ) ) {
		return;
	}

	$post_id   = get_the_ID();
	$home      = home_url( '/' );
	$permalink = get_permalink();
	$org_ref   = array( '@id' => $home . '#org' );

	$article = array(
		'@type'            => 'Article',
		'@id'              => $permalink . '#article',
		'headline'         => get_the_title(),
		'url'              => $permalink,
		'mainEntityOfPage' => $permalink,
		'datePublished'    => get_the_date( 'c', $post_id ),
		'dateModified'     => get_the_modified_date( 'c', $post_id ),
		'author'           => $org_ref,
		'publisher'        => $org_ref,
	);

	$json = array( '@context' => 'https://schema.org', '@graph' => array( $article ) );
	echo "\n" . '<script type="application/ld+json">' . wp_json_encode( $json, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE ) . '</script>' . "\n";
}
add_action( 'wp_head', 'paz_render_resource_jsonld', 7 );

// ---------------------------------------------------------------------------
// Centre / LocalBusiness JSON-LD
// ---------------------------------------------------------------------------

/**
 * Emit LocalBusiness JSON-LD for single paz_centre entries.
 * Fires on wp_head at priority 7.
 */
function paz_render_centre_jsonld(): void {
	if ( ! is_singular( 'paz_centre' ) ) {
		return;
	}
	if ( defined( 'WPSEO_VERSION' ) || class_exists( 'RankMath' ) ) {
		return;
	}

	$post_id   = get_the_ID();
	$permalink = get_permalink();
	$address   = get_post_meta( $post_id, 'paz_address', true );
	$phone     = get_post_meta( $post_id, 'paz_phone',   true );
	$lat       = get_post_meta( $post_id, 'paz_lat',     true );
	$lng       = get_post_meta( $post_id, 'paz_lng',     true );

	$business = array(
		'@type'  => 'LocalBusiness',
		'@id'    => $permalink . '#centre',
		'name'   => get_the_title(),
		'url'    => $permalink,
		'address'=> array(
			'@type'         => 'PostalAddress',
			'streetAddress' => esc_html( $address ),
			'addressCountry'=> 'GB',
		),
	);

	if ( $phone ) {
		$business['telephone'] = esc_html( $phone );
	}
	if ( $lat && $lng ) {
		$business['geo'] = array(
			'@type'     => 'GeoCoordinates',
			'latitude'  => (float) $lat,
			'longitude' => (float) $lng,
		);
	}

	$json = array( '@context' => 'https://schema.org', '@graph' => array( $business ) );
	echo "\n" . '<script type="application/ld+json">' . wp_json_encode( $json, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE ) . '</script>' . "\n";
}
add_action( 'wp_head', 'paz_render_centre_jsonld', 7 );

// ---------------------------------------------------------------------------
// FAQPage JSON-LD
// ---------------------------------------------------------------------------

/**
 * Emit FAQPage JSON-LD on the paz_faq archive and paz_faq_category taxonomy
 * archive pages.
 * Fires on wp_head at priority 7.
 */
function paz_render_faqpage_jsonld(): void {
	if ( ! is_post_type_archive( 'paz_faq' ) && ! is_tax( 'paz_faq_category' ) ) {
		return;
	}
	if ( defined( 'WPSEO_VERSION' ) || class_exists( 'RankMath' ) ) {
		return;
	}

	$args = array(
		'post_type'      => 'paz_faq',
		'posts_per_page' => 20,
		'no_found_rows'  => true,
		'post_status'    => 'publish',
	);

	// Narrow to current taxonomy term if on a term archive.
	if ( is_tax( 'paz_faq_category' ) ) {
		$term = get_queried_object();
		if ( $term instanceof WP_Term ) {
			$args['tax_query'] = array( // phpcs:ignore WordPress.DB.SlowDBQuery
				array(
					'taxonomy' => 'paz_faq_category',
					'field'    => 'term_id',
					'terms'    => $term->term_id,
				),
			);
		}
	}

	$query = new WP_Query( $args );
	if ( ! $query->have_posts() ) {
		return;
	}

	$main_entity = array();
	foreach ( $query->posts as $faq_post ) {
		$main_entity[] = array(
			'@type'          => 'Question',
			'name'           => esc_html( $faq_post->post_title ),
			'acceptedAnswer' => array(
				'@type' => 'Answer',
				'text'  => wp_strip_all_tags( apply_filters( 'the_content', $faq_post->post_content ) ),
			),
		);
	}

	$faqpage = array(
		'@type'      => 'FAQPage',
		'mainEntity' => $main_entity,
	);

	$json = array( '@context' => 'https://schema.org', '@graph' => array( $faqpage ) );
	echo "\n" . '<script type="application/ld+json">' . wp_json_encode( $json, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE ) . '</script>' . "\n";
}
add_action( 'wp_head', 'paz_render_faqpage_jsonld', 7 );
