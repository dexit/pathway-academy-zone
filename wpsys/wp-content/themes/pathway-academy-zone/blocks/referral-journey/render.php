<?php
if ( ! defined( 'ABSPATH' ) ) exit;

$heading = $attributes['heading'] ?? __( 'The Referral Journey', 'pathway-academy-zone' );
$steps = array(
	array( 'icon' => 'phone',      'title' => 'Initial Contact',        'body' => 'Contact us by phone or complete the referral form to discuss your young person&rsquo;s needs.' ),
	array( 'icon' => 'document',   'title' => 'Information Gathering',  'body' => 'We collect relevant documentation including educational history, EHCP/SEN information, and safeguarding details.' ),
	array( 'icon' => 'users',      'title' => 'Assessment Meeting',     'body' => 'We meet with the young person and family to assess needs and discuss potential pathways.' ),
	array( 'icon' => 'calendar',   'title' => 'Placement Planning',     'body' => 'We create a personalised plan and agree start dates, transport arrangements, and support packages.' ),
);
$icons = array(
	'phone'    => '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>',
	'document' => '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>',
	'users'    => '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
	'calendar' => '<rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
);
$wrapper = get_block_wrapper_attributes( array( 'class' => 'paz-referral-journey' ) );
?>
<section <?php echo $wrapper; ?> style="padding-block:5rem;">
	<div style="max-width:1200px;margin:0 auto;padding-inline:1rem;">
		<h2 style="text-align:center;font-size:2rem;font-weight:700;margin-bottom:3rem;"><?php echo esc_html( $heading ); ?></h2>
		<div style="display:grid;gap:1.25rem;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));">
			<?php foreach ( $steps as $i => $s ) : ?>
				<div style="padding:1.75rem;border:1px solid var(--wp--preset--color--border);border-radius:0.85rem;background:var(--wp--preset--color--card);">
					<div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:1rem">
						<span aria-hidden="true" style="display:inline-flex;width:2rem;height:2rem;align-items:center;justify-content:center;background:var(--wp--preset--color--primary);color:#fff;border-radius:0.5rem;font-weight:700;font-size:0.9rem"><?php echo (int) ( $i + 1 ); ?></span>
						<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:var(--wp--preset--color--primary)" aria-hidden="true"><?php echo $icons[ $s['icon'] ]; // phpcs:ignore ?></svg>
					</div>
					<h3 style="font-size:1.05rem;font-weight:700;margin:0 0 0.4rem;"><?php echo esc_html( $s['title'] ); ?></h3>
					<p style="color:var(--wp--preset--color--muted-foreground);font-size:0.9rem;line-height:1.6;margin:0;"><?php echo wp_kses_post( $s['body'] ); ?></p>
				</div>
			<?php endforeach; ?>
		</div>
	</div>
</section>
