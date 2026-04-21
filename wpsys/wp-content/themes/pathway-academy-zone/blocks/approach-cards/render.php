<?php
if ( ! defined( 'ABSPATH' ) ) exit;

$cards = array(
	array(
		'icon'  => '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>',
		'title' => 'Trauma-Informed Approach',
		'body'  => 'Our practice is grounded in understanding how trauma affects learning and behaviour, creating safe spaces for growth.',
	),
	array(
		'icon'  => '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',
		'title' => 'Personalised Pathways',
		'body'  => 'Every young person receives a tailored learning plan designed around their strengths, interests, and goals.',
	),
	array(
		'icon'  => '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
		'title' => 'Expert Staff',
		'body'  => 'Our team includes qualified teachers, youth workers, and pastoral specialists dedicated to every student&rsquo;s success.',
	),
	array(
		'icon'  => '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
		'title' => 'Safe Environment',
		'body'  => 'We maintain the highest safeguarding standards, ensuring all young people feel secure and supported.',
	),
);
$wrapper = get_block_wrapper_attributes( array( 'class' => 'paz-approach-cards' ) );
?>
<section <?php echo $wrapper; ?> style="padding-block:5rem;">
	<div style="max-width:1200px;margin:0 auto;padding-inline:1rem;">
		<div style="text-align:center;max-width:640px;margin:0 auto 3rem;">
			<p style="background:var(--wp--preset--color--primary-soft);display:inline-block;padding:0.35rem 1rem;border-radius:9999px;color:var(--wp--preset--color--primary);font-size:0.875rem;font-weight:600;margin-bottom:0.75rem;">Our Approach</p>
			<h2 style="font-size:2.5rem;font-weight:800;margin:0 0 1rem;">How We Support Young People</h2>
			<p style="color:var(--wp--preset--color--muted-foreground);line-height:1.6;margin:0;">Our evidence-based approach combines therapeutic support with quality education to help students overcome barriers and achieve their potential.</p>
		</div>
		<div style="display:grid;gap:1.5rem;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));">
			<?php foreach ( $cards as $c ) : ?>
				<div style="padding:1.75rem;border:1px solid var(--wp--preset--color--border);border-radius:0.85rem;background:var(--wp--preset--color--card);">
					<div style="display:inline-flex;align-items:center;justify-content:center;width:2.75rem;height:2.75rem;background:var(--wp--preset--color--primary-soft);color:var(--wp--preset--color--primary);border-radius:0.6rem;margin-bottom:1rem">
						<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><?php echo $c['icon']; // phpcs:ignore ?></svg>
					</div>
					<h3 style="font-size:1.05rem;font-weight:700;margin:0 0 0.5rem;"><?php echo esc_html( $c['title'] ); ?></h3>
					<p style="color:var(--wp--preset--color--muted-foreground);font-size:0.9rem;line-height:1.6;margin:0;"><?php echo wp_kses_post( $c['body'] ); ?></p>
				</div>
			<?php endforeach; ?>
		</div>
	</div>
</section>
