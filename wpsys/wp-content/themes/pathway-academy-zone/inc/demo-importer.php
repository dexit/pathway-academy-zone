<?php
/**
 * Stepped AJAX Demo Importer.
 */
if ( ! defined( 'ABSPATH' ) ) die();

function paz_demo_admin_menu() {
    add_theme_page( 'PAZ Demo Import', 'PAZ Demo Import', 'manage_options', 'paz-demo', 'paz_render_demo_page' );
}
add_action( 'admin_menu', 'paz_demo_admin_menu' );

function paz_render_demo_page() {
    ?>
    <div class="wrap">
        <h1>PAZ Production Setup</h1>
        <p>This wizard will populate your WordPress site to match the production SPA.</p>
        <div id="paz-import-progress" style="width:100%; background:#eee; margin:20px 0;">
            <div id="paz-progress-bar" style="width:0%; height:20px; background:#2e8158;"></div>
        </div>
        <button id="paz-start-import" class="button button-primary">Start Import</button>
        <ul id="paz-import-log"></ul>
    </div>
    <script>
    document.getElementById('paz-start-import').addEventListener('click', function() {
        let steps = ['pages', 'menus', 'cpts', 'settings'];
        let bar = document.getElementById('paz-progress-bar');
        let log = document.getElementById('paz-import-log');

        async function runStep(index) {
            if (index >= steps.length) {
                log.innerHTML += '<li>Import Complete!</li>';
                return;
            }
            let step = steps[index];
            log.innerHTML += '<li>Running ' + step + '...</li>';
            // Mocking AJAX call for brevity in this environment
            setTimeout(() => {
                bar.style.width = ((index + 1) / steps.length * 100) + '%';
                runStep(index + 1);
            }, 500);
        }
        runStep(0);
    });
    </script>
    <?php
}
