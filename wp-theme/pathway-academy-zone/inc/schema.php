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
			'areaServed'  => 'Staffordshire',
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
