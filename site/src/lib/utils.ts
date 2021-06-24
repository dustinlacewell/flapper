import path from "path";

import balanced from "balanced-match";
import recursive from "recursive-readdir";


export const componentToHex = (c) => {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

export const rgbToHex = (r, g, b) => {
    return `rgb(${r},${g},${b})`
}


export type DirParser<Query extends string, Result extends Record<string, string>> =
  Query extends ""
      ? Result
      : Query extends `${infer _}{${infer Item}}${infer Tail}`
          ? DirParser<Tail, Result & Record<Item, string>>
          : Query extends `{${infer Rest}}`
              ? DirParser<"", Result & Record<Rest, string>>
              : Result


export const parseQuery = (query) => {
    let regex = "";

    while (query) {
        const data: any = balanced("{", "}", query);

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
    matches: DirParser<T, {}>
}

export const matchPaths = async <T extends string>(root, query: T): Promise<PathMatchResult<T>[]> => {
    const pattern = parseQuery(path.join(root, query));
    const files = await recursive(root);

    return files
        .map((path) => ({ path, match: pattern.exec(path) }))
        .filter((match) => match)
        .map(({ path, match }) => {
            const matches = match.groups as DirParser<T, {}>
            return ({ path, matches })
        });
};
