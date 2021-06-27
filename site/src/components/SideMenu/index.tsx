import React from "react"

import { Link } from "gatsby"

import { Box, Flex } from "@chakra-ui/react"
import { CheckMenu } from "@flapper/gatsby-source-flapper/src/procs/MakeMenu"

import * as styles from './styles.module.scss'


const MenuItem = ({ label, path, active }) =>
    <Box className={`${styles.menuItem} ${active && styles.activeMenuItem}`}>
        <Link to={path}>
            {label}
        </Link>
    </Box>

const component = ({ menu_name, context, asset }) => {
    return (
        <Flex className={styles.sideMenu}>
            {context.menus[menu_name].children.map(c =>
                <MenuItem label={c.label} path={c.asset_target} active={CheckMenu(c, asset.id)} />
            )}
        </Flex>
    )
}

export default component
