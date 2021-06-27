import React from "react";
import SyntaxHighlighter from 'react-syntax-highlighter';
import { monokai } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import { Box, Flex } from "@chakra-ui/react"
import { SiteTemplate } from '@flapper/gatsby-source-flapper/src/ui'

import Logo from '../../src/images/flapper.svg'
import Layout from '../../src/layouts/Main'

import * as styles from './index.module.scss'


const code_example = `
const pipelines = {
    'page': [
        AllFiles('pages/', ['.tsx']),
        SetURL('{{relativePath}}'),
        RenderTemplate('{{path}}'),
    ],
    'post': [
        MatchFiles('posts/{{category_name}}/{{name}}.mdx'),
        SetURL('posts/{{name}}'),
        BindMDX('{{path}}'),
        RenderTemplate('src/templates/MDXPost.tsx')
    ],
}
`


const page = SiteTemplate(({ context, asset }) => {
    return (
        <Layout context={context} asset={asset}>
            <Flex className={styles.landing}>
                <Flex className={styles.column}>
                    <Flex className={styles.header}>
                        <Box className={styles.hook}>
                            <h1>Flapper</h1>
                            <Box margin="0" mb="1em" ml=".5em">
                                A freeform alternative to GraphQL for Gatsby
                            </Box>
                            <Box className={styles.code}>
                                <SyntaxHighlighter language="javascript" style={monokai} customStyle={{style: {overflowX: "inherit"}}}>
                                    {code_example}
                                </SyntaxHighlighter>
                            </Box>
                        </Box>
                        <Box className={styles.spacer} />
                        <Box className={styles.logo} w="512px">
                            <Logo />
                        </Box>
                    </Flex>
                    <h1>GraphQL is a sledgehammer</h1>
                    <p>Gatsby's GraphQL is crazy powerful. You can do anything with it!</p>
                    <p>But it also takes a lot of effort. To get your data into GraphQL, just to get it out again.</p>
                    <p>If you have your data on hand, Flapper just lets you use it.</p>
                    <h1>Invent your own metaphors</h1>
                    <p>Most SSGs try to lock you into "pages" and "posts" with "tags" and "categories".</p>
                    <p>Flapper lets you imagine metaphors useful for your site.</p>
                    <p>Want a "project" metaphor? Or a "article series" metaphor? Just make it.</p>
                    <h1>Dead simple site generation</h1>
                    <p>Use simple functions to build your data model using regular javascript data.</p>
                    <p>Map your data to URLs and Templates, get static HTML.</p>
                    <p>Templates are simply components with the full power of React.</p>
                </Flex>
            </Flex>
        </Layout>
    )
})

export default page;
