import React, { useEffect, useState } from "react"

import { Box, Flex } from "@chakra-ui/react"
import { CheckMenu } from "@flapper/gatsby-source-flapper/src/ui"
import { Link } from "@ui"

import * as styles from './styles.module.scss'


const MenuItem = ({ label, path, active }) =>
    <Box className={`${styles.menuItem} ${active && styles.activeMenuItem}`}>
        <Link to={path}>
            {label}
        </Link>
    </Box>

export const SideMenu = ({ title, menu_name, context, asset }) => {
    const [open, setOpen] = useState(false)

    useEffect(() => {
        setOpen(open || CheckMenu(context.menus[menu_name], asset.id))
    }, [])

    return (
        <Flex className={styles.sideMenu}>
            <Box className={`${styles.title} ${open ? styles.open : styles.closed}`} onClick={() => setOpen(!open)}>
                {title}
            </Box>
            {open && context.menus[menu_name].children.map(c =>
                <MenuItem label={c.label} path={c.asset_target} active={CheckMenu(c, asset.id)} />
            )}
        </Flex>
    )
}
