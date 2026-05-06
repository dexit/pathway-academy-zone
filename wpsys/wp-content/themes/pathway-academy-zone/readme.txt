=== Pathway Academy Zone ===
Contributors: pathwayacademyzone
Requires at least: 6.4
Tested up to: 6.6
Requires PHP: 7.4
Version: 1.0.0
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html
Tags: block-theme, full-site-editing, education, custom-colors, custom-menu, featured-images, translation-ready, accessibility-ready, wide-blocks, block-patterns

A Full Site Editing (FSE) block theme for Pathway Academy Zone — Alternative Provision in Stoke-on-Trent.

== Description ==

Pathway Academy Zone is a production-ready FSE block theme that mirrors the pathwayacademyzone.co.uk React site.

Includes:

* Six custom post types: Team, Programmes, Centres, Policies, Knowledge Hub (Resources), News.
* Three taxonomies: resource categories, programme types, news categories.
* Six bundled dynamic blocks (`pazone/*`) rendered server-side: key-policies, referral-journey, stat-grid, team-grid, values-timeline, approach-cards.
* Eight block patterns under the "Pathway Academy Zone" category.
* Template hierarchy covering front-page, page, single, archive, search, 404, plus CPT-specific templates for policies, resources, and team.
* One-click demo importer (Appearance → PAZ Demo Content) that creates every page, menu, and CPT entry, sets the static front page, and assigns the primary menu.
* JSON-LD Organization / EducationalOrganization / WebSite / BreadcrumbList schema in `<head>`.
* Plus Jakarta Sans typography and brand-green palette that matches the React site's design tokens.

== Installation ==

1. Upload the `pathway-academy-zone` folder to `/wp-content/themes/`.
2. Activate the theme under Appearance → Themes.
3. Run Appearance → PAZ Demo Content → "Import demo content" to populate the site.

== Custom Post Types ==

| Slug            | Archive              | Menu icon  |
|-----------------|----------------------|------------|
| paz_team        | /team/               | groups     |
| paz_programme   | /programmes/         | learn-more |
| paz_centre      | /centres/            | location   |
| paz_policy      | /policies/           | shield     |
| paz_resource    | /knowledge-hub/      | book       |
| paz_news        | /news/               | megaphone  |

== Bundled Blocks ==

* `pazone/key-policies` — 2-column grid of the 6 top policies (reads from `paz_policy` CPT, falls back to hardcoded list).
* `pazone/referral-journey` — 4-step process grid.
* `pazone/stat-grid` — 4-card outcome stats.
* `pazone/team-grid` — reads from `paz_team` CPT.
* `pazone/values-timeline` — CARES values timeline.
* `pazone/approach-cards` — 4-pillar approach section.

== Block Patterns ==

All patterns live in `/patterns/` and are automatically registered by WordPress 6.x core from their PHP header comments. Pattern slugs:

* `pathway-academy-zone/hero`
* `pathway-academy-zone/approach`
* `pathway-academy-zone/values`
* `pathway-academy-zone/stats`
* `pathway-academy-zone/key-policies`
* `pathway-academy-zone/referral-journey`
* `pathway-academy-zone/faq`
* `pathway-academy-zone/cta`

== Changelog ==

= 1.0.0 =
* Initial release with CPTs, demo importer, six dynamic blocks and eight patterns.
