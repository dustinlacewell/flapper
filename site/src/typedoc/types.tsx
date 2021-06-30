import React from 'react'

import {
    Arrow,
    CloseAngle,
    CloseBracket,
    CloseCurly,
    CloseParen,
    Colon,
    Comma,
    OpenAngle,
    OpenBracket,
    OpenCurly,
    OpenParen,
    Pipe,
} from './syntax'


const joiner = (sep) =>
    (acc, x) => acc === null ? x : <>{acc}{sep}{x}</>

const Parameters = ({ signature }) => {
    return <span className={"tdocParameters"}>
        {signature.parameters && signature.parameters
            .map(param =>
                <span className="tdocParameter">
                    <span className="tdocParameterName">{param.name}:</span>
                    <span className="tdocParameterType"><Type type={param.type} /></span>
                </span>)
            .reduce(joiner(<Comma />), null)}
    </span>
}

const FunctionSignature = ({ signature }) => {
    return (
        <span className="tdFunctionSignature">
            <OpenParen />
            <Parameters signature={signature} />
            <CloseParen />
            <Arrow />
            <Type type={signature.type} />
        </span>
    )
}

const TypeArgs = ({ type }) => {
    return type.typeArguments ? <span className="tdTypeArgs">
        <OpenAngle />
        {type.typeArguments
            .map(type => <Type type={type} />)
            .reduce(joiner(<Comma />), null)}
        <CloseAngle />
    </span> : null
}

const Union = ({ type }) => <span>
    {type.types
        .map(type => <Type type={type} />)
        .reduce(joiner(<Pipe />), null)}
</span>

const Tuple = ({ type }) => <span>
    <OpenBracket />
    {type.elements
        .map(type => <Type type={type} />)
        .reduce(joiner(<Comma />), null)}
    <CloseBracket />
</span>

const Intrinsic = ({ type }) =>
    <span>{type.name}</span>

const Reference = ({ type }) => <span>
    <span>{type.name}</span>
    <TypeArgs type={type} />
</span>

const Array = ({ type }) => <span>
    <Type type={type.elementType} />
    <OpenBracket />
    <CloseBracket />
</span>

const IndexSignature = ({ type }) => {
    const index = type.declaration.indexSignature
    const param = index.parameters[0]
    return <span>
        <OpenCurly />&nbsp;
        <OpenBracket />
        {param.name}
        <Colon />&nbsp;
        <Type type={param.type} />
        <CloseBracket />&nbsp;
        <Type type={index.type} />
        <CloseCurly />
    </span>
}

const ObjectSignature = ({ type }) => <span>
    <OpenCurly />
    {type.declaration.children
        .map(child => <span>
            <OpenBracket />
            <span>{child.name}</span>
            <Colon />&nbsp;
            <Type type={child.type} />
        </span>)
        .reduce(joiner(<Comma />), null)}
    &nbsp;<CloseCurly />
</span>

const Reflection = ({ type }) => {
    if (type.declaration.signatures) {
        return <FunctionSignature signature={type.declaration.signatures[0]} />
    } else if (type.declaration.indexSignature) {
        return <IndexSignature type={type} />
    } else if (type.declaration.children) {
        return <ObjectSignature type={type} />
    }
}

const Literal = ({ type }) =>
    <span>{JSON.stringify(type.value)}</span>

export const Type = ({type}) => {
    if (type === undefined)
        return <span>void</span>

    switch (type.type) {
        case "literal":
            return <Literal type={type} />
        case "union":
            return <Union type={type} />
        case "tuple":
            return <Tuple type={type} />
        case "intrinsic":
            return <Intrinsic type={type} />
        case "reference":
            return <Reference type={type} />
        case "array":
            return <Array type={type} />
        case "reflection":
            return <Reflection type={type} />
    }

    console.error(`Couldn't find type renderer for ${type.name}`)
}
