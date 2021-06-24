import React from "react"

import { Box } from "@chakra-ui/react"

import * as styles from "./styles.module.scss"


export const Anchor = ({ children, to, ...props }) => {
    return <a href={to} className={styles.link}>
        <Box>
            <Box {...props}>{children}</Box>
        </Box>
    </a>
}
