const { registerBlockType } = wp.blocks;
const { ServerSideRender } = wp.editor;

const blocks = [
    'pazone/accordion-faq',
    'pazone/timeline',
    'pazone/team-grid',
    'pazone/stat-grid',
    'pazone/approach-cards'
];

blocks.forEach(blockName => {
    registerBlockType(blockName, {
        title: blockName.split('/')[1].replace('-', ' ').toUpperCase(),
        icon: 'admin-generic',
        category: 'paz',
        edit: (props) => {
            return wp.element.createElement(ServerSideRender, {
                block: blockName,
                attributes: props.attributes
            });
        },
        save: () => null
    });
});
