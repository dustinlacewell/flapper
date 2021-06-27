import {
    AddMenu,
    AllFiles,
    BindMDX,
    MakeMenu,
    MatchFiles,
    Menu,
    RenderTemplate,
    SetRelativePath,
    SetTitle,
    SetURL,
    Sort,
} from "@flapper/gatsby-source-flapper"


const stages = {
    'content': {
        'docs-guide': [
            MatchFiles('content/docs/{{slug}}.mdx'),
            BindMDX('{{path}}'),
            SetRelativePath('content/'),
            SetTitle('slug'),
            SetURL('{{relativePath}}'),
            Sort((a, b) => a.sidebar_position - b.sidebar_position),
            MakeMenu('{{slug}}', 'docs', '{{menu_label}}'),
            async (context, __, assets) => {
                const index = assets.find(a => a.slug === 'index');
                const menu = new Menu('docs-index', index, 'main', 'docs')
                AddMenu(context, menu)
                console.log(`+++ Added main docs menu}`)
            },
        ],

        'page': [
            AllFiles('content/pages/', ['.tsx']),
            SetRelativePath('content/pages/'),
            SetURL('{{relativePath}}'),
        ],
    },
    'writing': {
        'docs-guide': [
            RenderTemplate('src/templates/DocsPage/index.tsx'),
        ],
        'page': [
            RenderTemplate('{{path}}'),
        ],
    },
}

export default stages;
