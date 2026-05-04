<?php
if ( ! defined( 'ABSPATH' ) ) exit;

$stats = array(
	array( 'value' => '94%',  'label' => 'Attendance Improvement' ),
	array( 'value' => '87%',  'label' => 'Positive Destinations' ),
	array( 'value' => '150+', 'label' => 'Young People Supported' ),
	array( 'value' => '12+',  'label' => 'Partner Schools' ),
);
$wrapper = get_block_wrapper_attributes( array( 'class' => 'paz-stat-grid' ) );
?>
<section <?php echo $wrapper; ?> style="padding-block:5rem;background:var(--wp--preset--color--primary);color:#fff;">
	<div style="max-width:1200px;margin:0 auto;padding-inline:1rem;">
		<div style="display:grid;gap:1.5rem;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));text-align:center;">
			<?php foreach ( $stats as $s ) : ?>
				<div style="padding:1.5rem;">
					<div style="font-size:clamp(2.25rem,3vw + 1rem,3rem);font-weight:800;line-height:1;margin-bottom:0.5rem"><?php echo esc_html( $s['value'] ); ?></div>
					<div style="font-size:0.95rem;opacity:0.85"><?php echo esc_html( $s['label'] ); ?></div>
				</div>
			<?php endforeach; ?>
		</div>
	</div>
</section>
