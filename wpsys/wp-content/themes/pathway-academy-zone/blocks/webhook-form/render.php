<?php
if ( ! defined( 'ABSPATH' ) ) die();
?>
<div class="paz-webhook-form">
    <form class="space-y-4" data-target="<?php echo esc_attr( $attributes['target'] ?? '' ); ?>" data-method="<?php echo esc_attr( $attributes['method'] ?? 'POST' ); ?>">
        <?php echo $content; ?>
        <button type="submit" class="wp-block-button__link wp-element-button rounded-full w-full">Submit</button>
    </form>
</div>
