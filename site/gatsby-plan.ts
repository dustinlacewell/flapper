import fs from 'fs'

import {
    AddMenu,
    BindMdx,
    MakeMenu,
    Menu,
    NewAsset,
    Plan,
    RenderTemplate,
    SetRelativePath,
    SetTitle,
    SetUrl,
    Sort,
    SourceFilesRecursively,
    SourceMatchedFiles,
} from "@flapper/gatsby-source-flapper"


const SourceTypedocExports = (path) =>
    async (c, t, a) => {
        const rawdata = fs.readFileSync(path)
        const data = JSON.parse(rawdata.toString())
        const exports = data.children as any[]
        exports.forEach(item => {
            const asset = NewAsset(path, item)
            console.log(`Found typedoc for: ${item.name}`)
            a.push(asset)
        })
    }

const BindToDocsMenu = async (c, t, a) => {
    // connect docs index to 'main' menu
    const index = a.find(a => a.slug === 'index');
    const menu = new Menu('docs-index', index, 'main', 'docs')
    AddMenu(c, menu)
}

const BindToTypedoc = async (c, t, a) => {
    const exports = c.assets.get('exports')
    a.forEach(asset => {
        const procExport = exports.find(e => e.name === asset.title)
        if (!procExport) {
            throw new Error(`Couldn't bind ${asset.title} to typedoc export!`)
        }
        asset.typedoc = procExport
    })
}

const plan: Plan = {
    'content': {
        'exports': [
            SourceTypedocExports('content/docs/typedoc.json'),
        ],

        'docs-guide': [
            SourceMatchedFiles('content/docs/{{slug}}.mdx'),
            BindMdx('{{path}}'),
            SetRelativePath('content/'),
            SetTitle('slug'),
            SetUrl('{{relativePath}}'),
            Sort((a, b) => a.sidebar_position - b.sidebar_position),
            MakeMenu('{{slug}}', 'docs', '{{menu_label}}'),
            BindToDocsMenu,
        ],

        'tutorial': [
            SourceMatchedFiles('content/docs/tutorials/{{slug}}.mdx'),
            BindMdx('{{path}}'),
            SetRelativePath('content/'),
            SetTitle('slug'),
            SetUrl('{{relativePath}}'),
            Sort((a, b) => a.sidebar_position - b.sidebar_position),
            MakeMenu('{{slug}}', 'tutorials', '{{menu_label}}'),
        ],

        'procs': [
            SourceMatchedFiles('content/docs/procs/{{slug}}.mdx'),
            BindMdx('{{path}}'),
            SetRelativePath('content/'),
            SetTitle('slug', 'title', true),
            SetUrl('{{relativePath}}'),
            Sort((a, b) => a.slug - b.slug),
            MakeMenu('{{slug}}', 'procs', '{{title}}'),
            BindToTypedoc,
        ],

        'page': [
            SourceFilesRecursively('content/pages/', ['.tsx']),
            SetRelativePath('content/pages/'),
            SetUrl('{{relativePath}}'),
        ],
    },
    'writing': {
        'docs-guide': [
            RenderTemplate('src/templates/DocsPage/index.tsx'),
        ],
        'tutorial': [
            RenderTemplate('src/templates/DocsPage/index.tsx'),
        ],
        'procs': [
            RenderTemplate('src/templates/DocsPage/index.tsx'),
        ],
        'page': [
            RenderTemplate('{{path}}'),
        ],
    },
}

export default plan;
