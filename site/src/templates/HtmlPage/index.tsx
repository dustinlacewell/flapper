import * as React from "react"

import { SiteTemplate } from '@flapper/gatsby-source-flapper/src/ui'
import { MainLayout } from "@layouts"


const HtmlPage = SiteTemplate(({ context, asset }) => {
    const html = {__html: asset.content}
    return (
        <MainLayout context={context} asset={asset} >
            <div dangerouslySetInnerHTML={html} />
        </MainLayout>
    )
})

export default HtmlPage
