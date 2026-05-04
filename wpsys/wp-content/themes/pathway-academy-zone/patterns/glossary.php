<?php
/**
 * Title: Glossary List
 * Slug: pathway-academy-zone/glossary
 * Categories: paz
 */
?>
<!-- wp:group {"layout":{"type":"constrained"}} -->
<div class="wp-block-group">
    <!-- wp:query {"queryId":4,"query":{"postType":"paz_glossary","postsPerPage":50,"order":"asc","orderBy":"title"}} -->
    <div class="wp-block-query">
        <!-- wp:post-template -->
        <!-- wp:group {"style":{"spacing":{"padding":{"bottom":"1rem"}},"border":{"bottom":{"width":"1px","color":"var:preset|color|border"}}}} -->
        <div class="wp-block-group" style="border-bottom-color:var(--wp--preset--color--border);border-bottom-width:1px;padding-bottom:1rem">
            <!-- wp:post-title {"level":3} /-->
            <!-- wp:post-content /-->
        </div>
        <!-- /wp:group -->
        <!-- /wp:post-template -->
    </div>
    <!-- /wp:query -->
</div>
<!-- /wp:group -->
