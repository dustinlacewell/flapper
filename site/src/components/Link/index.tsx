import React from "react"

import { Link as GatsbyLink } from "gatsby"

import * as styles from "./styles.module.scss"


export const Link = ({ children, to, className = null, ...props }) => {
    return <GatsbyLink to={to} {...props} className={`${styles.link} ${className}`}>
        {children}
    </GatsbyLink>
}
