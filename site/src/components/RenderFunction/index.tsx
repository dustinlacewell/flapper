
import React from 'react'

import { Box, Flex } from '@chakra-ui/react'
import { Type } from '@typedoc'

import * as styles from './styles.module.scss'


const RenderProcParameters = (parameters) =>
    <Box className={styles.procParams}>{parameters ? parameters
        .map(param =>
            <>
                <Box className={styles.paramName}>{param.name}:</Box>
                <Box className={styles.paramType}><Type type={param.type} />&nbsp;{param.defaultValue && `= ${param.defaultValue}`}</Box>
            </>) : null}
    </Box>

const TypeParameters = (parameters) =>
    parameters && <span>
        <span>{'<'}</span>
        {parameters.map(p => <Box>{p.name} extends <Type type={p.type} /></Box>)}
        <span>{'>'}</span>
    </span>

export const RenderFunction = (signature) => {
    signature = signature.signature
    console.log(signature)
    const parameters = RenderProcParameters(signature.parameters)
    const typeParameters = TypeParameters(signature.typeParameter)
    const type = <Type type={signature.type} />
    return (
        <Box className={styles.proc}>
            <Flex>
                <Box className={styles.name}>{signature.name}</Box>
                {typeParameters}
                <span>(</span>
            </Flex>
            {parameters}
            <Flex>
                <Box>):&nbsp;</Box> <Flex>{type}</Flex>
            </Flex>
        </Box>
    )
}
