import React from "react"

import PropTypes from "prop-types"

import { Box } from "@chakra-ui/react";
import {
    Head,
    Header,
    Link,
} from "@ui"

import "@fontsource/fira-mono"

import "./styles.scss";


export const MainLayout = ({ context, asset, children, ...props }) => {
    return (
        <>
            <Head />
            <Header context={context} asset={asset} />
            <main {...props}>
                {children}
            </main>
            <Box textAlign="center" m="1em 1em">
                This site was built using <Link to="/">Flapper</Link>.
            </Box>
        </>
    )
}

MainLayout.propTypes = {children: PropTypes.node.isRequired}
