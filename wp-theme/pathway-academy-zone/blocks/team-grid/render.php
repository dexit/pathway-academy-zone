<?php
if ( ! defined( 'ABSPATH' ) ) exit;

$posts_per_page = max( 1, (int) ( $attributes['posts']   ?? 8 ) );
$columns        = max( 2, min( 4, (int) ( $attributes['columns'] ?? 4 ) ) );

$members = get_posts( array(
	'post_type'      => 'paz_team',
	'posts_per_page' => $posts_per_page,
	'orderby'        => 'menu_order title',
	'order'          => 'ASC',
	'no_found_rows'  => true,
) );

if ( empty( $members ) ) {
	echo '<p style="text-align:center;padding:3rem;color:var(--wp--preset--color--muted-foreground)">' . esc_html__( 'No team members yet. Add some via the Team menu.', 'pathway-academy-zone' ) . '</p>';
	return;
}
$wrapper = get_block_wrapper_attributes( array( 'class' => 'paz-team-grid' ) );
?>
<section <?php echo $wrapper; ?> style="padding-block:4rem;">
	<div style="max-width:1200px;margin:0 auto;padding-inline:1rem;">
		<div style="display:grid;gap:1.5rem;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));">
			<?php foreach ( $members as $m ) :
				$role = get_post_meta( $m->ID, 'paz_role', true );
				$img  = get_the_post_thumbnail_url( $m, 'paz-card' );
			?>
				<article style="text-align:center;">
					<?php if ( $img ) : ?>
						<img src="<?php echo esc_url( $img ); ?>" alt="<?php echo esc_attr( $m->post_title ); ?>" loading="lazy" decoding="async" width="400" height="400" style="width:100%;aspect-ratio:1/1;object-fit:cover;border-radius:1rem;margin-bottom:1rem" />
					<?php endif; ?>
					<h3 style="font-size:1.05rem;font-weight:700;margin:0 0 0.2rem;"><?php echo esc_html( $m->post_title ); ?></h3>
					<?php if ( $role ) : ?>
						<p style="color:var(--wp--preset--color--primary);font-weight:500;font-size:0.9rem;margin:0"><?php echo esc_html( $role ); ?></p>
					<?php endif; ?>
				</article>
			<?php endforeach; ?>
		</div>
	</div>
</section>
