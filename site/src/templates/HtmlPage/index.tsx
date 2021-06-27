import * as React from "react"

import { SiteTemplate } from '@flapper/gatsby-source-flapper/src/SiteTemplate'

import Layout from "../../layouts/Main"


const template = SiteTemplate(({ context, asset }) => {
    const html = {__html: asset.content}
    return (
        <Layout context={context} asset={asset} >
            <div dangerouslySetInnerHTML={html} />
        </Layout>
    )
})


export default template

