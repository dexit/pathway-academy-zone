<?php
if ( ! defined( 'ABSPATH' ) ) die();
?>
<div class="paz-summary text-muted-foreground italic border-l-4 border-primary pl-4 py-2">
    <?php echo has_excerpt() ? get_the_excerpt() : 'Summary for ' . get_the_title(); ?>
</div>
