import React from "react"

import { MDXRenderer } from "gatsby-plugin-mdx"

import { Flex } from "@chakra-ui/react"
import { MDXProvider } from "@mdx-js/react"


const component = ({ context, asset }) => {
    return asset.mdx ? (
        <Flex flexDir="column">
            <MDXProvider>
                <MDXRenderer context={context} asset={asset}>{asset.mdx.body}</MDXRenderer>
            </MDXProvider>
        </Flex>
    ) : null
}

export default component
