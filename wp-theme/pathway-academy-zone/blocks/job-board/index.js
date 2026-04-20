const { registerBlockType } = wp.blocks;
const { InspectorControls, useBlockProps } = wp.blockEditor;
const { PanelBody, ToggleControl, TextControl } = wp.components;

registerBlockType('pazone/job-board', {
    edit: ({ attributes, setAttributes }) => {
        const blockProps = useBlockProps();

        return (
            <div {...blockProps}>
                <InspectorControls>
                    <PanelBody title="Settings">
                        <ToggleControl
                            label="Show External Feeds"
                            checked={attributes.showExternal}
                            onChange={(showExternal) => setAttributes({ showExternal })}
                        />
                        <TextControl
                            label="Default Search Query"
                            value={attributes.query}
                            onChange={(query) => setAttributes({ query })}
                        />
                    </PanelBody>
                </InspectorControls>
                <div className="paz-job-board-placeholder" style={{ padding: '20px', border: '2px dashed #ccc', textAlign: 'center' }}>
                    <strong>Job Board Block</strong>
                    <p>Local vacancies + {attributes.showExternal ? 'External feeds' : 'Local only'}</p>
                </div>
            </div>
        );
    },
    save: () => null, // Dynamic block
});
