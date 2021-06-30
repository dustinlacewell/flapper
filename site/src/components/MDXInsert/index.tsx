import React from "react"
import innerText from "react-innertext"
import ReactMarkdown from "react-markdown"
import SyntaxHighlighter from "react-syntax-highlighter"
import { monokai } from "react-syntax-highlighter/dist/esm/styles/hljs"

import { MDXRenderer } from "gatsby-plugin-mdx"

import { Flex } from "@chakra-ui/react"
import { MDXProvider } from "@mdx-js/react"
import { RenderFunction, RenderParameters } from "@ui"

import { Link } from "../Link"


const cleanupSnippet = (text: string) => {
    const parts = text.split("\n")
    const keptParts = []
    const finalParts = []
    let state = "head"
    for (const part of parts) {
        switch (state) {
            case "head":
                if (part.trim() !== "") {
                    state = "body"
                    keptParts.push(part)
                }
                break;
            case "body":
                keptParts.push(part)
                break;
        }
    }
    keptParts.reverse()
    state = "head"
    for (const part of keptParts) {
        switch (state) {
            case "head":
                if (part.trim() !== "") {
                    state = "body"
                    finalParts.push(part)
                }
                break;
            case "body":
                finalParts.push(part)
                break;
        }
    }
    finalParts.reverse()
    return finalParts.join("\n")
}

export const MDXInsert = ({ context, asset }) => {
    const exports = context.assets.exports
    const findExport = name => exports.find(e => e.name === name)
    const getTypedoc = name => name === null ? asset.typedoc : findExport(name)
    const shortcodes = {
        Link,
        Proc: ({name = null}) => {
            const typedoc = getTypedoc(name)
            return <RenderFunction signature={typedoc.signatures[0]} />
        },
        Params: ({name = null}) => {
            const typedoc = getTypedoc(name)
            return <RenderParameters parameters={typedoc.signatures[0].parameters} />
        },
        Doc: ({name = null}) => {
            const typedoc = getTypedoc(name)
            return typedoc.signatures[0].comment ? <ReactMarkdown>{typedoc.signatures[0].comment.shortText}</ReactMarkdown> : null
        },
        Code: ({children, ...props}) =>
            <SyntaxHighlighter {...props}
                style={monokai}
                children={children} />,

        pre: ({children, ...props}) =>
            <SyntaxHighlighter {...props}
                style={monokai}
                children={cleanupSnippet(innerText(children))} />,
    }

    return asset.mdx ? (
        <Flex flexDir="column" alignItems="flex-start" flexWrap="wrap">
            <MDXProvider components={shortcodes}>
                <MDXRenderer context={context} asset={asset}>{asset.mdx.body}</MDXRenderer>
            </MDXProvider>
        </Flex>
    ) : null
}
