import React from "react"
import SyntaxHighlighter from "react-syntax-highlighter"
import { monokai } from "react-syntax-highlighter/dist/esm/styles/hljs"

import { MDXRenderer } from "gatsby-plugin-mdx"

import { Flex } from "@chakra-ui/react"
import { MDXProvider } from "@mdx-js/react"

import { Link } from "../Link"


const shortcodes = {
    Link,
    Code: ({children, ...props}) =>
        <SyntaxHighlighter {...props} style={monokai}>{children}</SyntaxHighlighter>,
}

const component = ({ context, asset }) => {
    return asset.mdx ? (
        <Flex flexDir="column">
            <MDXProvider components={shortcodes}>
                <MDXRenderer context={context} asset={asset}>{asset.mdx.body}</MDXRenderer>
            </MDXProvider>
        </Flex>
    ) : null
}

export default component
