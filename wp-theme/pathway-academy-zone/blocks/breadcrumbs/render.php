<?php
if ( ! defined( 'ABSPATH' ) ) exit;
$wrapper = get_block_wrapper_attributes( array( 'class' => 'paz-breadcrumbs' ) );
?>
<nav <?php echo $wrapper; ?> aria-label="Breadcrumb" style="font-size: 0.875rem; margin-bottom: 2rem;">
    <ol style="list-style: none; padding: 0; display: flex; gap: 0.5rem; color: var(--wp--preset--color--muted-foreground);">
        <li><a href="/" style="color: inherit; text-decoration: none;">Home</a></li>
        <li>/</li>
        <li aria-current="page" style="color: var(--wp--preset--color--foreground);"><?php echo get_the_title(); ?></li>
    </ol>
</nav>
