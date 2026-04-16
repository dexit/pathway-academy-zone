<?php
if ( ! defined( 'ABSPATH' ) ) exit;

$values = array(
	array( 'letter' => 'C', 'title' => 'Change',     'body' => 'We embrace learning and adapt to grow.' ),
	array( 'letter' => 'A', 'title' => 'Ambition',   'body' => 'We aim high and strive for progress.' ),
	array( 'letter' => 'R', 'title' => 'Reputation', 'body' => 'We work as a team and are known for integrity.' ),
	array( 'letter' => 'E', 'title' => 'Empathy',    'body' => 'We care deeply and show compassion in action.' ),
	array( 'letter' => 'S', 'title' => 'Skills',     'body' => 'We grow by sharpening our abilities with discipline.' ),
);
$wrapper = get_block_wrapper_attributes( array( 'class' => 'paz-values-timeline' ) );
?>
<section <?php echo $wrapper; ?> style="padding-block:5rem;background:var(--wp--preset--color--muted);">
	<div style="max-width:1100px;margin:0 auto;padding-inline:1rem;text-align:center;">
		<p style="background:var(--wp--preset--color--primary-soft);display:inline-block;padding:0.35rem 1rem;border-radius:9999px;color:var(--wp--preset--color--primary);font-size:0.875rem;font-weight:600;margin-bottom:0.75rem;">Our Values</p>
		<h2 style="font-size:2.5rem;font-weight:800;margin:0 0 1rem;">What Guides Us</h2>
		<p style="color:var(--wp--preset--color--muted-foreground);max-width:620px;margin:0 auto 3rem;line-height:1.6;">Our values shape everything we do, from how we design programmes to how we interact with young people and their families.</p>

		<div style="display:grid;gap:1.5rem;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));margin-bottom:2rem;">
			<?php foreach ( $values as $v ) : ?>
				<div>
					<div style="position:relative;display:inline-flex;align-items:center;justify-content:center;width:4rem;height:4rem;background:var(--wp--preset--color--primary);color:#fff;border-radius:1rem;margin-bottom:0.75rem;font-weight:700;font-size:1.35rem;">
						<?php echo esc_html( $v['letter'] ); ?>
					</div>
					<h3 style="font-size:1.05rem;font-weight:700;margin:0 0 0.4rem;"><?php echo esc_html( $v['title'] ); ?></h3>
					<p style="color:var(--wp--preset--color--muted-foreground);font-size:0.85rem;line-height:1.55;margin:0;"><?php echo esc_html( $v['body'] ); ?></p>
				</div>
			<?php endforeach; ?>
		</div>

		<div style="display:inline-flex;gap:0.5rem;padding:0.75rem 1.5rem;background:var(--wp--preset--color--card);border:1px solid var(--wp--preset--color--border);border-radius:9999px;font-size:0.95rem;">
			<?php foreach ( $values as $i => $v ) : ?>
				<span><span style="color:var(--wp--preset--color--primary);font-weight:700"><?php echo esc_html( $v['letter'] ); ?></span><?php echo esc_html( substr( $v['title'], 1 ) ); ?></span>
				<?php if ( $i < count( $values ) - 1 ) : ?><span style="color:var(--wp--preset--color--muted-foreground)">&middot;</span><?php endif; ?>
			<?php endforeach; ?>
		</div>
	</div>
</section>
