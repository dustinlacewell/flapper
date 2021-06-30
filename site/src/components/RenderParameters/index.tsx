
import React from 'react'
import ReactMarkdown from 'react-markdown'

import { Box } from '@chakra-ui/react'
import { Type } from '@typedoc'

import * as styles from './styles.module.scss'


export const RenderParameters = ({parameters}) => {
    if (parameters === undefined) return null
    return (
        <Box className={styles.params}>
            {parameters.map(param =>
                <Box className={styles.param}>
                    <Box className={styles.header}>
                        <Box className={styles.paramName}>{param.name}:</Box>
                        <Box className={styles.paramType}>
                            <Type type={param.type} />
                            <span className={styles.defaultValue}>&nbsp;{param.defaultValue && `= ${param.defaultValue}`}</span></Box>
                    </Box>
                    {param.comment && <Box className={styles.comment}>
                        <ReactMarkdown>{param.comment.text}</ReactMarkdown>
                    </Box>}
                </Box>)}
        </Box>
    )
}
