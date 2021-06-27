import React from 'react'

import { Link } from 'gatsby'

import { Box } from '@chakra-ui/react'
import { CheckMenu } from '@flapper/gatsby-source-flapper/src/procs/MakeMenu'

import Logo from '../../images/flapper.svg'

import * as styles from './styles.module.scss'


const HeaderItem = ({ label, path, active }) =>
    <Box>
        <Link to={path}>
            {label}
        </Link>
        {active && <Box />}
    </Box>

const component = ({ context, asset }) => {
    return (
        <div className={styles.header}>
            <Link className={styles.logo} to="/">
                <div>
                    <div>Flapper</div>
                    <div>
                        <Logo />
                    </div>
                </div>
            </Link>
            {context.menus.main.children.map(c =>
                <HeaderItem label={c.label} path={c.asset_target} active={CheckMenu(c, asset.id)} />)}
            <div className={styles.spacer} />
            <div>Github</div>
        </div>
    )
}

export default component
