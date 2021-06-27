/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react"

import PropTypes from "prop-types"

import { Header } from "@ui"

import "@fontsource/fira-mono"

import "./styles.scss";


// eslint-disable-next-line unused-imports/no-unused-vars
const Layout = ({ context, asset, children, ...props }) => {
    return (
        <>
            <Header context={context} asset={asset} />
            <main {...props}>
                {children}
            </main>
        </>
    )
}

Layout.propTypes = {children: PropTypes.node.isRequired}

export default Layout
