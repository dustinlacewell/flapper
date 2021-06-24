import path from 'path';

const siteMetadata = {
    title: `flapper.ldlework.com`,
    description: `Alternative to GraphQL for Gatsby`,
    author: `@dustinlacewell`,
}

const asset_plugins = [
    'gatsby-plugin-dts-css-modules',
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
        resolve: `gatsby-plugin-graphql-codegen`,
        options: {
            fileName: `./gatsby-graphql.ts`,
            documentPaths: [
                './src/**/*.{ts,tsx}',
            ],
        },
    },
    {
        resolve: `gatsby-plugin-manifest`,
        options: {
            name: `gatsby-starter-default`,
            short_name: `starter`,
            start_url: `/`,
            background_color: `#663399`,
            theme_color: `#663399`,
            display: `minimal-ui`,
            icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
        },
    },
]

const style_plugins = [
    `@chakra-ui/gatsby-plugin`,
    {
        resolve: 'gatsby-plugin-sass',
        options: {additionalData: `@import "${__dirname}/src/styles/styles";`},
    },
]

const filesystem_plugins = [
    {
        resolve: `gatsby-source-filesystem`,
        options: {
            name: `pages`,
            path: `${__dirname}/content/pages`,
        },
    },
]

module.exports = {
    siteMetadata,
    flags: {PARALLEL_SOURCING: false},
    plugins: [
        {
            resolve: `gatsby-plugin-alias-imports`,
            options: {
                alias: {
                    "@ui": path.resolve(__dirname, 'src/components'),
                    "@layouts": path.resolve(__dirname, 'src/layouts'),
                    "@SiteTemplate": path.resolve(__dirname, 'src/templates/SiteTemplate'),
                    "@templates": path.resolve(__dirname, 'src/templates'),
                },
                extensions: ['ts', 'tsx', 'scss'],
            },
        },
        `gatsby-plugin-fontawesome-css`,
        ...asset_plugins,
        ...style_plugins,
        ...filesystem_plugins,
        {
            resolve: `gatsby-plugin-mdx`,
            options: {
                defaultLayouts: {
                    pages: require.resolve("./src/layouts/Main/index.tsx"),
                    default: require.resolve("./src/layouts/Main/index.tsx"),
                },
                gatsbyRemarkPlugins: [
                    {resolve: `gatsby-remark-copy-linked-files`},
                    {resolve: 'gatsby-remark-local-videos'},
                    {
                        resolve: `gatsby-remark-images`,
                        options: {maxWidth: 400},
                    },
                ],
            },
        },
        "@kentico/gatsby-source-kontent",
    ],
}
