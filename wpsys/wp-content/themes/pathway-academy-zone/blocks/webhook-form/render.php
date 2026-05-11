<?php
if ( ! defined( 'ABSPATH' ) ) exit;

$heading   = sanitize_text_field( $attributes['heading']        ?? 'Get in Touch' );
$body      = wp_kses_post( $attributes['body']                  ?? '' );
$webhook   = esc_url_raw( $attributes['webhookUrl']             ?? '' );
$method    = sanitize_key( $attributes['method']                ?? 'POST' );
$encoding  = sanitize_key( $attributes['encoding']              ?? 'json' );
$submit    = sanitize_text_field( $attributes['submitLabel']    ?? 'Send Message' );
$success   = sanitize_text_field( $attributes['successMessage'] ?? "Thank you — we'll be in touch shortly." );
$fields    = is_array( $attributes['fields'] ?? null ) ? $attributes['fields'] : array();

$form_id = 'paz-wf-' . wp_generate_uuid4();
$wrapper = get_block_wrapper_attributes( array( 'class' => 'paz-webhook-form' ) );
?>
<div <?php echo $wrapper; ?> style="max-width:640px;">
	<?php if ( $heading ) : ?>
		<h2 style="font-size:clamp(1.3rem,2vw+0.5rem,1.75rem);font-weight:800;margin-bottom:0.5rem;"><?php echo esc_html( $heading ); ?></h2>
	<?php endif; ?>
	<?php if ( $body ) : ?>
		<div style="margin-bottom:1.5rem;color:var(--wp--preset--color--muted-foreground);"><?php echo $body; ?></div>
	<?php endif; ?>

	<form id="<?php echo esc_attr( $form_id ); ?>" novalidate style="display:flex;flex-direction:column;gap:1rem;">
		<?php wp_nonce_field( 'paz_webhook_form', '_nonce' ); ?>
		<input type="hidden" name="_target"   value="<?php echo esc_attr( $webhook ); ?>" />
		<input type="hidden" name="_method"   value="<?php echo esc_attr( strtoupper( $method ) ); ?>" />
		<input type="hidden" name="_encoding" value="<?php echo esc_attr( $encoding ); ?>" />

		<?php foreach ( $fields as $field ) :
			$f_name     = sanitize_key( $field['name']    ?? '' );
			$f_label    = sanitize_text_field( $field['label']   ?? $f_name );
			$f_type     = sanitize_key( $field['type']    ?? 'text' );
			$f_required = ! empty( $field['required'] );
			$f_id       = $form_id . '-' . $f_name;
			if ( ! $f_name ) continue;
		?>
			<div>
				<label for="<?php echo esc_attr( $f_id ); ?>" style="display:block;font-weight:600;font-size:0.875rem;margin-bottom:0.4rem;">
					<?php echo esc_html( $f_label ); ?>
					<?php if ( $f_required ) : ?>
						<span aria-hidden="true" style="color:var(--wp--preset--color--destructive);margin-left:2px;">*</span>
					<?php endif; ?>
				</label>
				<?php if ( 'textarea' === $f_type ) : ?>
					<textarea
						id="<?php echo esc_attr( $f_id ); ?>"
						name="<?php echo esc_attr( $f_name ); ?>"
						rows="5"
						<?php echo $f_required ? 'required aria-required="true"' : ''; ?>
						style="width:100%;padding:0.65rem 0.9rem;border:1px solid var(--wp--preset--color--border);border-radius:0.5rem;font-size:0.9rem;resize:vertical;font-family:inherit;"
					></textarea>
				<?php elseif ( 'select' === $f_type && ! empty( $field['options'] ) ) : ?>
					<select
						id="<?php echo esc_attr( $f_id ); ?>"
						name="<?php echo esc_attr( $f_name ); ?>"
						<?php echo $f_required ? 'required aria-required="true"' : ''; ?>
						style="width:100%;padding:0.65rem 0.9rem;border:1px solid var(--wp--preset--color--border);border-radius:0.5rem;font-size:0.9rem;"
					>
						<option value=""><?php esc_html_e( '— Select —', 'pathway-academy-zone' ); ?></option>
						<?php foreach ( (array) $field['options'] as $opt ) : ?>
							<option value="<?php echo esc_attr( $opt ); ?>"><?php echo esc_html( $opt ); ?></option>
						<?php endforeach; ?>
					</select>
				<?php else : ?>
					<input
						type="<?php echo esc_attr( $f_type ); ?>"
						id="<?php echo esc_attr( $f_id ); ?>"
						name="<?php echo esc_attr( $f_name ); ?>"
						<?php echo $f_required ? 'required aria-required="true"' : ''; ?>
						style="width:100%;padding:0.65rem 0.9rem;border:1px solid var(--wp--preset--color--border);border-radius:0.5rem;font-size:0.9rem;"
					/>
				<?php endif; ?>
			</div>
		<?php endforeach; ?>

		<div role="status" aria-live="polite" id="<?php echo esc_attr( $form_id ); ?>-status" style="font-size:0.875rem;min-height:1.25rem;"></div>

		<button type="submit" style="align-self:flex-start;padding:0.7rem 1.75rem;background:var(--wp--preset--color--primary);color:#fff;border:none;border-radius:0.5rem;font-weight:700;font-size:0.9rem;cursor:pointer;">
			<?php echo esc_html( $submit ); ?>
		</button>
	</form>
</div>

<script>
(function() {
	var form = document.getElementById(<?php echo wp_json_encode( $form_id ); ?>);
	if (!form) return;
	var status = document.getElementById(<?php echo wp_json_encode( $form_id . '-status' ); ?>);
	var ajaxUrl = <?php echo wp_json_encode( admin_url( 'admin-ajax.php' ) ); ?>;
	var successMsg = <?php echo wp_json_encode( $success ); ?>;

	form.addEventListener('submit', function(e) {
		e.preventDefault();
		var btn = form.querySelector('[type="submit"]');
		btn.disabled = true;
		status.textContent = '';

		var data = new FormData(form);
		data.append('action', 'paz_webhook_form');

		fetch(ajaxUrl, { method: 'POST', body: data })
			.then(function(r) { return r.json(); })
			.then(function(json) {
				if (json.success) {
					form.reset();
					status.style.color = 'var(--wp--preset--color--primary)';
					status.textContent = successMsg;
				} else {
					status.style.color = 'var(--wp--preset--color--destructive)';
					status.textContent = (json.data && json.data.message) ? json.data.message : <?php echo wp_json_encode( __( 'An error occurred. Please try again.', 'pathway-academy-zone' ) ); ?>;
				}
			})
			.catch(function() {
				status.style.color = 'var(--wp--preset--color--destructive)';
				status.textContent = <?php echo wp_json_encode( __( 'Network error. Please try again.', 'pathway-academy-zone' ) ); ?>;
			})
			.finally(function() { btn.disabled = false; });
	});
})();
</script>
