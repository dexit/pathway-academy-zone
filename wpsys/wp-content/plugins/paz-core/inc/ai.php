<?php
/**
 * PAZ AI Proxy — serverless-style AI chat endpoint running inside WordPress.
 *
 * POST /wp-json/paz/v1/ai/chat
 *
 * Supported providers (set via wp-config.php constants or env vars):
 *
 *   OpenRouter   — define( 'PAZ_OPENROUTER_API_KEY', 'sk-or-...' );
 *   Local-AI     — define( 'PAZ_LOCAL_AI_URL', 'http://localhost:11434' );
 *                  (Ollama-compatible: /v1/chat/completions)
 *
 * Request body (JSON):
 *   {
 *     "provider":  "openrouter" | "local-ai",   // optional, auto-detected
 *     "model":     "openai/gpt-4o-mini",         // optional, uses default
 *     "messages":  [ { "role": "user", "content": "..." } ],
 *     "stream":    false,                         // streaming not yet supported via PHP
 *     "context":   "team | faqs | programmes"    // optional — prepends a system prompt
 *   }
 *
 * Response:
 *   { "content": "...", "provider": "openrouter", "model": "..." }
 *
 * Rate limiting: 20 req/minute per IP (stored in transients).
 */

defined( 'ABSPATH' ) || exit;

/* ── Config helpers ─────────────────────────────────────────────────── */

function paz_ai_get( string $const, string $env = '', $default = '' ) {
	if ( defined( $const ) ) return constant( $const );
	if ( $env && getenv( $env ) !== false ) return getenv( $env );
	return $default;
}

function paz_ai_openrouter_key(): string {
	return (string) paz_ai_get( 'PAZ_OPENROUTER_API_KEY', 'PAZ_OPENROUTER_API_KEY' );
}

function paz_ai_local_url(): string {
	return rtrim( (string) paz_ai_get( 'PAZ_LOCAL_AI_URL', 'PAZ_LOCAL_AI_URL', 'http://localhost:11434' ), '/' );
}

function paz_ai_default_model( string $provider ): string {
	if ( $provider === 'openrouter' ) {
		return (string) paz_ai_get( 'PAZ_OPENROUTER_DEFAULT_MODEL', 'PAZ_OPENROUTER_DEFAULT_MODEL', 'openai/gpt-4o-mini' );
	}
	return (string) paz_ai_get( 'PAZ_LOCAL_AI_DEFAULT_MODEL', 'PAZ_LOCAL_AI_DEFAULT_MODEL', 'llama3' );
}

function paz_ai_detect_provider(): string {
	if ( paz_ai_openrouter_key() ) return 'openrouter';
	// Check if local-ai is configured (non-default URL or explicit env)
	if ( paz_ai_get( 'PAZ_LOCAL_AI_URL', 'PAZ_LOCAL_AI_URL' ) ) return 'local-ai';
	return 'openrouter'; // default fallback
}

/* ── System prompt library ───────────────────────────────────────────── */

function paz_ai_system_prompt( string $context = '' ): string {
	$base = 'You are a helpful assistant for Pathway Academy Zone, a specialist Alternative Provision (AP) provider based in Stoke-on-Trent, Staffordshire, UK. '
		. 'You help school SENCOs, pastoral leads, Local Authority workers, parents, and carers understand AP, our programmes, and how to refer young people. '
		. 'Be warm, professional, and concise. Always encourage formal referrals through the website for placement queries. '
		. 'Phone: 01782 365365. Email: info@pathwayacademyzone.co.uk. Address: Duncalf St, Burslem, Stoke-on-Trent ST6 3LJ.';

	$contexts = array(
		'faqs'        => ' Focus on answering frequently asked questions about Alternative Provision, exclusions, SEMH, and our admissions process.',
		'programmes'  => ' Focus on explaining our programme offering: Core Curriculum, SEMH Support, Vocational Training, Mentoring, Transition, and Bespoke programmes.',
		'team'        => ' You may introduce team members: Safaraz Ali (Founder & CEO), Waheed Azam (Executive Director), Liam Farrall (Head of AP), Martin Chandler (Safeguarding), Gemma Mason QTLS (SENCO Lead), Ahsan Hussain (Head of Partnerships), Zulekha Ali (HR).',
		'referral'    => ' Help the user understand the referral process. Encourage them to complete the online referral form or call 01782 365365 for urgent placements.',
		'knowledge'   => ' Help the user navigate our knowledge hub covering AP legislation, SEMH, vocational pathways, and best practice.',
	);

	return $base . ( $contexts[ $context ] ?? '' );
}

/* ── Rate limiting ───────────────────────────────────────────────────── */

function paz_ai_rate_limit_ok(): bool {
	$ip  = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
	$key = 'paz_ai_rl_' . md5( $ip );
	$hits = (int) get_transient( $key );
	$limit = (int) paz_ai_get( 'PAZ_AI_RATE_LIMIT', 'PAZ_AI_RATE_LIMIT', 20 );
	if ( $hits >= $limit ) return false;
	set_transient( $key, $hits + 1, 60 );
	return true;
}

/* ── REST endpoint ───────────────────────────────────────────────────── */

add_action( 'rest_api_init', function () {
	register_rest_route( 'paz/v1', '/ai/chat', array(
		'methods'             => 'POST',
		'callback'            => 'paz_ai_chat_handler',
		'permission_callback' => '__return_true',
		'args'                => array(
			'messages' => array(
				'required' => true,
				'type'     => 'array',
			),
			'provider' => array(
				'type'              => 'string',
				'default'           => '',
				'sanitize_callback' => 'sanitize_key',
			),
			'model'   => array(
				'type'              => 'string',
				'default'           => '',
				'sanitize_callback' => 'sanitize_text_field',
			),
			'context' => array(
				'type'              => 'string',
				'default'           => '',
				'sanitize_callback' => 'sanitize_key',
			),
		),
	) );
} );

function paz_ai_chat_handler( WP_REST_Request $request ): WP_REST_Response {
	if ( ! paz_ai_rate_limit_ok() ) {
		return new WP_REST_Response( array( 'error' => 'Rate limit exceeded. Please wait a moment.' ), 429 );
	}

	$messages = (array) $request->get_param( 'messages' );
	$provider = $request->get_param( 'provider' ) ?: paz_ai_detect_provider();
	$model    = $request->get_param( 'model' ) ?: paz_ai_default_model( $provider );
	$context  = $request->get_param( 'context' ) ?: '';

	// Sanitise messages
	$clean_messages = array();
	foreach ( $messages as $msg ) {
		if ( empty( $msg['role'] ) || empty( $msg['content'] ) ) continue;
		$role = in_array( $msg['role'], array( 'user', 'assistant', 'system' ), true ) ? $msg['role'] : 'user';
		$clean_messages[] = array(
			'role'    => $role,
			'content' => wp_strip_all_tags( (string) $msg['content'] ),
		);
	}

	if ( empty( $clean_messages ) ) {
		return new WP_REST_Response( array( 'error' => 'No valid messages provided.' ), 400 );
	}

	// Prepend system prompt
	array_unshift( $clean_messages, array(
		'role'    => 'system',
		'content' => paz_ai_system_prompt( $context ),
	) );

	if ( $provider === 'openrouter' ) {
		return paz_ai_call_openrouter( $clean_messages, $model );
	}
	return paz_ai_call_local( $clean_messages, $model );
}

/* ── OpenRouter ──────────────────────────────────────────────────────── */

function paz_ai_call_openrouter( array $messages, string $model ): WP_REST_Response {
	$key = paz_ai_openrouter_key();
	if ( ! $key ) {
		return new WP_REST_Response( array( 'error' => 'OpenRouter API key not configured.' ), 503 );
	}

	$body = wp_json_encode( array(
		'model'       => $model,
		'messages'    => $messages,
		'max_tokens'  => 800,
		'temperature' => 0.7,
	) );

	$response = wp_remote_post( 'https://openrouter.ai/api/v1/chat/completions', array(
		'timeout' => 30,
		'headers' => array(
			'Authorization'    => 'Bearer ' . $key,
			'Content-Type'     => 'application/json',
			'HTTP-Referer'     => home_url(),
			'X-Title'          => 'Pathway Academy Zone',
		),
		'body'    => $body,
	) );

	return paz_ai_parse_openai_response( $response, 'openrouter', $model );
}

/* ── Local-AI (Ollama-compatible) ────────────────────────────────────── */

function paz_ai_call_local( array $messages, string $model ): WP_REST_Response {
	$base_url = paz_ai_local_url();
	$endpoint = $base_url . '/v1/chat/completions';

	$body = wp_json_encode( array(
		'model'    => $model,
		'messages' => $messages,
		'stream'   => false,
	) );

	$response = wp_remote_post( $endpoint, array(
		'timeout' => 60,
		'headers' => array( 'Content-Type' => 'application/json' ),
		'body'    => $body,
	) );

	return paz_ai_parse_openai_response( $response, 'local-ai', $model );
}

/* ── Response parser (OpenAI-compatible schema) ──────────────────────── */

function paz_ai_parse_openai_response( $response, string $provider, string $model ): WP_REST_Response {
	if ( is_wp_error( $response ) ) {
		return new WP_REST_Response( array( 'error' => $response->get_error_message() ), 502 );
	}

	$code = wp_remote_retrieve_response_code( $response );
	$raw  = wp_remote_retrieve_body( $response );
	$json = json_decode( $raw, true );

	if ( $code !== 200 ) {
		$msg = $json['error']['message'] ?? "Provider returned HTTP $code";
		return new WP_REST_Response( array( 'error' => $msg ), (int) $code );
	}

	$content = $json['choices'][0]['message']['content'] ?? '';
	if ( ! $content ) {
		return new WP_REST_Response( array( 'error' => 'Empty response from provider.' ), 502 );
	}

	return new WP_REST_Response( array(
		'content'  => $content,
		'provider' => $provider,
		'model'    => $json['model'] ?? $model,
		'usage'    => $json['usage'] ?? null,
	), 200 );
}

/* ── Provider availability endpoint ─────────────────────────────────── */

add_action( 'rest_api_init', function () {
	register_rest_route( 'paz/v1', '/ai/providers', array(
		'methods'             => 'GET',
		'callback'            => function () {
			return new WP_REST_Response( array(
				'openrouter' => array(
					'available'     => (bool) paz_ai_openrouter_key(),
					'default_model' => paz_ai_default_model( 'openrouter' ),
				),
				'local-ai' => array(
					'available'     => (bool) paz_ai_get( 'PAZ_LOCAL_AI_URL', 'PAZ_LOCAL_AI_URL' ),
					'url'           => paz_ai_local_url(),
					'default_model' => paz_ai_default_model( 'local-ai' ),
				),
				'detected_default' => paz_ai_detect_provider(),
			), 200 );
		},
		'permission_callback' => '__return_true',
	) );
} );
