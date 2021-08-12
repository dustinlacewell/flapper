import React, { useEffect, useState } from "react"

import { parse } from 'flatted'

import { fetchLinks } from "@flapper/gatsby-source-flapper/src/ui"


export const SiteTemplate = Renderer => {
    return (props) => {
        const { asset, ...rest }  = parse(props.pageContext.data)
        const [ linkedAsset, setAsset ] = useState(null)

        // resolve links
        useEffect(() => {
            (async () => {
                await fetchLinks(asset)
                setAsset(asset)
            })()
        }, [ ])

        // scroll to anchor if there is one
        useEffect(() => {
            if (linkedAsset) {
                const url = document.location.toString()
                const hash = url.substring(url.indexOf("#")+1)
                if (hash) {
                    const titleElement = document.getElementById(hash)
                    if (titleElement) {
                        titleElement.scrollIntoView()
                    }
                }
            }
        }, [linkedAsset])

        return <>{linkedAsset &&
            <Renderer asset={linkedAsset} {...rest} />
        }</>
    }
}
