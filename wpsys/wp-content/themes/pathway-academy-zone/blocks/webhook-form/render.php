<?php
if ( ! defined( 'ABSPATH' ) ) die();
?>
<div class="paz-webhook-form bg-card p-8 rounded-2xl border border-border shadow-sm">
    <form class="space-y-6" data-target="<?php echo esc_attr( $attributes['target'] ?? '' ); ?>" data-method="<?php echo esc_attr( $attributes['method'] ?? 'POST' ); ?>">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <label class="block text-sm font-medium mb-1">Your Name</label>
                <input type="text" name="name" required class="w-full rounded-lg border-border" placeholder="Full name" />
            </div>
            <div>
                <label class="block text-sm font-medium mb-1">Email Address</label>
                <input type="email" name="email" required class="w-full rounded-lg border-border" placeholder="your@email.com" />
            </div>
        </div>
        <div>
            <label class="block text-sm font-medium mb-1">Message</label>
            <textarea name="message" required rows="4" class="w-full rounded-lg border-border" placeholder="How can we help?"></textarea>
        </div>
        <button type="submit" class="wp-block-button__link wp-element-button rounded-full w-full py-3">Send Message</button>
    </form>
</div>
