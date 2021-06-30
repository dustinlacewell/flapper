import React from "react"
import { Helmet } from "react-helmet"

import { graphql,useStaticQuery } from "gatsby"


export const Head = () => {
    const { allFile } = useStaticQuery(
        graphql`
            query {
                allFile(
                    limit: 1
                    filter: {
                        name: { eq: "favicon" }
                        ext: { eq: ".svg" }
                        sourceInstanceName: { eq: "images" }
                        relativeDirectory: { eq: "" }
                    }
                ) {
                    nodes {
                        publicURL
                    }
                }
            }
        `
    )

    return <Helmet>
        <meta charSet="utf-8" />
        <title>Flapper for Gatsby</title>
        <link
            rel="icon"
            href={allFile.nodes[0].publicURL}
            type="image/svg+xml"
            sizes="any"
        />
    </Helmet>
}
