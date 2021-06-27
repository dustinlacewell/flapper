import * as React from "react"

import { Box, Flex } from "@chakra-ui/react";
import { SiteTemplate } from '@flapper/gatsby-source-flapper/src/SiteTemplate'
import { MDXInsert, SideMenu } from "@ui";

import Layout from "../../layouts/Main"

import * as styles from './styles.module.scss'


const template = SiteTemplate(({ context, asset }) => {
    return (
        <Layout context={context} asset={asset} >
            <Flex className={styles.docLayout}>
                <Box className={styles.sideMenu}>
                    <SideMenu menu_name="docs" context={context} asset={asset} />
                </Box>
                <Box className={styles.content}>
                    <MDXInsert context={context} asset={asset} />
                </Box>
            </Flex>
        </Layout>
    )
})


export default template

