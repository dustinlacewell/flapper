import * as React from "react"

import { SiteTemplate } from '@flapper/gatsby-source-flapper/src/SiteTemplate'

import MDXInsert from "../../components/MDXInsert";
import Layout from "../../layouts/Main"


const template = SiteTemplate(({ context, asset }) => {
    return (
        <Layout context={context} asset={asset} >
            <MDXInsert context={context} asset={asset} />
        </Layout>
    )
})


export default template

