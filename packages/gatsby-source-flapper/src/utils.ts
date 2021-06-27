import fs from 'fs';
import path from "path";

import balanced from "balanced-match";
import { GatsbyNode } from 'gatsby';
import recursive from "recursive-readdir";


export type CreateNodeUtils = Parameters<GatsbyNode["onCreateNode"]>[0]
export type CreatePageUtils = Parameters<GatsbyNode["createPages"]>[0]
export type CustomizeSchemaUtils = Parameters<GatsbyNode["createSchemaCustomization"]>[0]

export type DirParser<Query extends string, Result extends Record<string, string>> =
Query extends ""
    ? Result
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    : Query extends `${infer _}{{${infer Item}}}${infer Tail}`
        ? DirParser<Tail, Result & Record<Item, string>>
        : Query extends `{{${infer Rest}}}`
            ? DirParser<"", Result & Record<Rest, string>>
            : Result


export const slash = input => {
    const isExtendedLengthPath = /^\\\\\?\\/.test(input);
    const hasNonAscii = /[^\u0000-\u0080]+/.test(input); // eslint-disable-line no-control-regex

    if (isExtendedLengthPath || hasNonAscii) {
        return input;
    }

    return input.replace(/\\/g, '/');
};

export const parseQuery = (query) => {
    let regex = "";

    while (query) {
        const data: any = balanced("{{", "}}", query);

        if (!data) {
            regex += query;
            break;
        }

        regex += `${data.pre}(?<${data.body}>[^/]+)`;
        query = data.post;
    }

    return new RegExp(regex + "$");
};

export type Matcher<T extends string> = (string) => DirParser<T, {}>

export const makeMatcher = <T extends string>(query: T): (string) => DirParser<T, {}> => {
    const pattern = parseQuery(query);
    return path => {
        const match = pattern.exec(path)
        return match?.groups as DirParser<T, {}>
    }
}

export type PathMatchResult<T extends string> = {
    path: string,
    meta: DirParser<T, {}>
}

export const statFile = async (path: string) => {
    const stats = fs.statSync(path);
    return {
        dev: stats.dev,
        mode: stats.mode,
        nlink: stats.nlink,
        uid: stats.uid,
        gid: stats.gid,
        rdev: stats.rdev,
        blksize: stats.blksize,
        ino: stats.ino,
        size: stats.size,
        blocks: stats.blocks,
        atimeMs: stats.atimeMs,
        mtimeMs: stats.mtimeMs,
        ctimeMs: stats.ctimeMs,
        birthtimeMs: stats.birthtimeMs,
        atime: stats.atime.toJSON(),
        mtime: stats.mtime.toJSON(),
        ctime: stats.ctime.toJSON(),
        birthtime: stats.birthtime.toJSON(),
    }
}

export const matchPaths = async <T extends string>(root, query: T): Promise<PathMatchResult<T>[]> => {
    const pattern = parseQuery(slash(path.join(root, query)));
    const files = await recursive(root);

    return files
        .map((path) => ({ path, match: pattern.exec(path) }))
        .filter((match) => match)
        .map(({ path, match }) => {
            const matches = match?.groups as DirParser<T, {}>
            if (matches)
                return ({ path, meta: matches })
            return undefined
        })
        .filter(m => m !== undefined);
};


export const get_values = (asset, key: string, pattern=/(.*)/) => {
    const parts = key.split(".")
    let value = asset
    for (const part of parts) {
        value = value[part] || value

        if (value === undefined) {
            break;
        }
    }

    if (value !== undefined) {
        const strValue = value as string;
        const matches = strValue.match(pattern)
        return matches.map(s => s.trim())
    }

    return []
}

export const get_value = (asset, key, pattern=/(.*)/) => {
    return get_values(asset, key, pattern)[0]
}

export const set_value = (object: {}, attrs: string, value: any) => {
    const parts = attrs.split(".")
    for (const part of parts.slice(0, -1)) {
        object = object[part]
    }

    object[parts[parts.length - 1]] = value
}
