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
