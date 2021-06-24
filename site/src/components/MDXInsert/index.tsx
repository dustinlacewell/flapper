import React from "react"

import { MDXRenderer } from "gatsby-plugin-mdx"

import { MDXProvider } from "@mdx-js/react"


const component = ({ context, asset }) => {
    return asset.mdx ? (
        <MDXProvider>
            <MDXRenderer context={context} asset={asset}>{asset.mdx.body}</MDXRenderer>
        </MDXProvider>
    ) : null
}

export default component
