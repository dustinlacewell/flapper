import React from "react";

import { Box } from "@chakra-ui/react";


export const Belt = (props) => {
    const { children, ...boxProps } = props
    return <Box
        {...boxProps}
        padding="0 1em"
        ml="auto" mr="auto"
        w="98%" maxW="max">
        {children}
    </Box>
}
