import React from "react"

import { Link as GatsbyLink } from "gatsby"

import { Box } from "@chakra-ui/react"

import * as styles from "./styles.module.scss"


export const Link = ({ children, to, ...props }) => {
    return <GatsbyLink to={to} className={styles.link}>
        <Box>
            <Box {...props}>{children}</Box>
        </Box>
    </GatsbyLink>
}
