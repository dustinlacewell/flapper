import * as React from "react"

import { SiteTemplate } from '@flapper/gatsby-source-flapper/src/SiteTemplate'
import { MainLayout } from "@layouts"
import { MDXInsert } from "@ui"


const MdxPage = SiteTemplate(({ context, asset }) => {
    return (
        <MainLayout context={context} asset={asset} >
            <MDXInsert context={context} asset={asset} />
        </MainLayout>
    )
})

export default MdxPage
