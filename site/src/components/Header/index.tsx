import React from 'react'

import { Box, Flex } from '@chakra-ui/react'
import { CheckMenu } from '@flapper/gatsby-source-flapper/src/procs/MakeMenu'
import { Link } from '@ui'

import Logo from '../../images/flapper.svg'

import * as styles from './styles.module.scss'


const HeaderItem = ({ label, path, active }) =>
    <Flex alignItems="center">
        <Link to={path}>
            {label}
        </Link>
        {active && <Box />}
    </Flex>

export const Header = ({ context, asset }) => {
    return (
        <div className={styles.header}>
            <Link className={styles.logo} to="/">
                <div className={styles.logoTitle}>Flapper</div>
            </Link>
            <div className={styles.logoSVG}>
                <Logo />
            </div>
            {context.menus.main.children.map(c =>
                <HeaderItem label={c.label} path={c.asset_target} active={CheckMenu(c, asset.id)} />)}
            <div className={styles.spacer} />
            <Link to="https://github.com/dustinlacewell/flapper">github</Link>
        </div>
    )
}
