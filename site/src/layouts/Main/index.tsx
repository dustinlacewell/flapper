/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"

import PropTypes from "prop-types"

import { Box  } from "@chakra-ui/layout";

import "@fontsource/fira-mono"

import { Belt } from "../../components/Belt";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header"

import "./styles.scss";


const Layout = ({ context, asset, children, ...props }) => {
    const { menus } = context;
    return (
        <>
            <main {...props}>
                {children}
            </main>
        </>
    )
}

Layout.propTypes = {children: PropTypes.node.isRequired}

export default Layout
