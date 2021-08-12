import * as React from "react"

import { Box, Flex } from "@chakra-ui/react";
import { SiteTemplate } from '@flapper/gatsby-source-flapper/src/ui'
import { MainLayout } from "@layouts";
import {
    Link,
    MDXInsert,
    SideMenu,
} from "@ui"

import * as styles from './styles.module.scss'


const levels = [
    styles.level1,
    styles.level2,
    styles.level3,
]

const TOCItem = ({ data, level}) =>
    <>
        <Link to={data.url} className={`${levels[level]}`}>{data.title}</Link>
        {data.items !== undefined && data.items.map(item => <TOCItem data={item} level={level + 1} />)}
    </>

const DocsPage = SiteTemplate(({ context, asset }) => {
    return (
        <MainLayout context={context} asset={asset} >
            <Flex className={styles.docLayout}>
                <Box className={styles.sideMenu}>
                    <SideMenu title={"User Guide"} menu_name="docs" context={context} asset={asset} />
                    <SideMenu title={"Tutorials"} menu_name="tutorials" context={context} asset={asset} />
                    <SideMenu title={"Processors"} menu_name="procs" context={context} asset={asset} />
                </Box>
                <Box className={styles.content}>
                    <MDXInsert context={context} asset={asset} />
                </Box>
                <Box className={styles.toc}>
                    {(asset.toc.items.length > 1 || asset.toc.items[0].items) && asset.toc.items.map(item =>
                        <TOCItem data={item} level={0} />)}
                </Box>
            </Flex>
        </MainLayout>
    )
})

export default DocsPage
