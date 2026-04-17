<?php
if ( ! defined( 'ABSPATH' ) ) exit;
$wrapper = get_block_wrapper_attributes( array( 'class' => 'paz-webhook-form' ) );
?>
<div <?php echo $wrapper; ?> style="padding: 2rem; background: var(--wp--preset--color--card); border-radius: 1rem; border: 1px solid var(--wp--preset--color--border);">
    <form class="paz-ajax-form" style="display: grid; gap: 1rem;">
        <input type="text" placeholder="Your Name" style="padding: 0.75rem; border-radius: 0.5rem; border: 1px solid var(--wp--preset--color--border);" />
        <input type="email" placeholder="Your Email" style="padding: 0.75rem; border-radius: 0.5rem; border: 1px solid var(--wp--preset--color--border);" />
        <textarea placeholder="Your Message" style="padding: 0.75rem; border-radius: 0.5rem; border: 1px solid var(--wp--preset--color--border); min-height: 100px;"></textarea>
        <button type="submit" style="background: var(--wp--preset--color--primary); color: #fff; padding: 0.75rem; border-radius: 0.5rem; border: none; font-weight: 600; cursor: pointer;">Send Message</button>
    </form>
</div>
