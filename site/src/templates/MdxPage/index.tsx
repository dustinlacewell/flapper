import * as React from "react"

import MDXInsert from "../../components/MDXInsert";
import Layout from "../../layouts/Main"
import SiteTemplate from "../SiteTemplate";


const template = SiteTemplate(({ context, asset }) => {
    return (
        <Layout context={context} asset={asset} >
            <MDXInsert context={context} asset={asset} />
        </Layout>
    )
})


export default template

