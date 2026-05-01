/**
 * paz-iframe-parent.js — WordPress-side iframe resize handler.
 *
 * Listens for { type: 'paz-resize', height: N } messages from the embedded
 * SPA and updates the matching iframe's height so the page scrolls naturally
 * without nested scrollbars.
 *
 * Also shows/hides a loading shimmer while the iframe bootstraps.
 */
( function () {
	'use strict'

	var PAZ_MSG_TYPE = 'paz-resize'

	function getIframes() {
		return document.querySelectorAll( 'iframe[data-paz-embed]' )
	}

	function findIframeBySource( src ) {
		var iframes = getIframes()
		for ( var i = 0; i < iframes.length; i++ ) {
			try {
				var url = new URL( iframes[ i ].src )
				var msgUrl = new URL( src, window.location.href )
				if ( url.origin === msgUrl.origin ) return iframes[ i ]
			} catch ( e ) { /* ignore malformed URL */ }
		}
		// Fallback: first paz embed iframe
		return iframes[ 0 ] || null
	}

	function setHeight( iframe, height ) {
		if ( ! iframe || ! height ) return
		var px = Math.ceil( height ) + 'px'
		iframe.style.height = px
		iframe.setAttribute( 'height', Math.ceil( height ) )

		// Remove loading shimmer from wrapper
		var wrap = iframe.closest( '.paz-spa-wrapper' )
		if ( wrap ) wrap.removeAttribute( 'data-loading' )
	}

	function onMessage( event ) {
		if ( ! event.data || event.data.type !== PAZ_MSG_TYPE ) return
		var height = Number( event.data.height )
		if ( ! height || height < 1 ) return

		// Find the iframe that sent this message by matching origin + source
		var source = event.data.route ? ( new URL( event.data.route, event.origin ).href ) : event.origin
		var iframe = findIframeBySource( source ) || findIframeBySource( event.origin )
		setHeight( iframe, height )
	}

	function markLoadingShimmers() {
		getIframes().forEach( function ( iframe ) {
			var wrap = iframe.closest( '.paz-spa-wrapper' )
			if ( wrap ) wrap.setAttribute( 'data-loading', 'true' )
		} )
	}

	function init() {
		window.addEventListener( 'message', onMessage, false )
		markLoadingShimmers()

		// Nudge each iframe to report its height once the page is ready
		getIframes().forEach( function ( iframe ) {
			iframe.addEventListener( 'load', function () {
				try {
					iframe.contentWindow.postMessage( { type: 'paz-resize-request' }, '*' )
				} catch ( e ) { /* cross-origin guard */ }
			} )
		} )
	}

	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', init )
	} else {
		init()
	}
} )()
