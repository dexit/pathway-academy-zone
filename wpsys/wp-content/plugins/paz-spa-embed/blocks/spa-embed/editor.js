/**
 * pazone/spa-embed — Gutenberg editor component.
 * Minimal: shows route path as a placeholder, no live preview in editor
 * (live preview would cross-origin iframe the SPA which is overkill).
 */
( function ( blocks, element, blockEditor, components ) {
	const { registerBlockType } = blocks
	const { createElement: el, Fragment } = element
	const { InspectorControls, useBlockProps } = blockEditor
	const { PanelBody, TextControl, RangeControl, SelectControl } = components

	registerBlockType( 'pazone/spa-embed', {
		edit: function ( { attributes, setAttributes } ) {
			const { route, minHeight, loading, iframeTitle } = attributes
			const blockProps = useBlockProps( {
				className: 'paz-spa-wrapper paz-spa-editor-preview',
				style: { minHeight: ( minHeight || 300 ) + 'px' },
			} )

			return el(
				Fragment,
				null,
				el(
					InspectorControls,
					null,
					el(
						PanelBody,
						{ title: 'SPA Embed Settings', initialOpen: true },
						el( TextControl, {
							label: 'Route',
							help: 'SPA route to embed, e.g. /team or /programmes',
							value: route,
							onChange: ( v ) => setAttributes( { route: v } ),
						} ),
						el( RangeControl, {
							label: 'Minimum height (px)',
							value: minHeight,
							min: 200,
							max: 3000,
							step: 50,
							onChange: ( v ) => setAttributes( { minHeight: v } ),
						} ),
						el( SelectControl, {
							label: 'Loading',
							value: loading,
							options: [
								{ label: 'Lazy (default)', value: 'lazy' },
								{ label: 'Eager', value: 'eager' },
							],
							onChange: ( v ) => setAttributes( { loading: v } ),
						} ),
						el( TextControl, {
							label: 'iframe title (accessibility)',
							value: iframeTitle,
							onChange: ( v ) => setAttributes( { iframeTitle: v } ),
						} )
					)
				),
				el(
					'div',
					blockProps,
					el(
						'div',
						{
							style: {
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								justifyContent: 'center',
								height: ( minHeight || 300 ) + 'px',
								background: '#f0f5f2',
								borderRadius: '8px',
								border: '2px dashed #2e8158',
								color: '#2e8158',
								gap: '12px',
							},
						},
						el( 'svg', { xmlns: 'http://www.w3.org/2000/svg', width: 32, height: 32, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' },
							el( 'rect', { x: 3, y: 3, width: 18, height: 18, rx: 2, ry: 2 } ),
							el( 'line', { x1: 3, y1: 9, x2: 21, y2: 9 } ),
							el( 'line', { x1: 9, y1: 21, x2: 9, y2: 9 } )
						),
						el( 'strong', { style: { fontSize: '15px' } }, 'PAZ SPA Embed' ),
						el( 'code', { style: { fontSize: '13px', background: 'rgba(46,129,88,0.12)', padding: '4px 10px', borderRadius: '4px' } }, route || '/' )
					)
				)
			)
		},
		save: function () {
			// Server-side rendered — save returns null.
			return null
		},
	} )
} )(
	window.wp.blocks,
	window.wp.element,
	window.wp.blockEditor,
	window.wp.components
)
