import path from "path";

import {
    File,
    Mdx,
    Node,
} from "./graphql"
import { DirParser, makeMatcher } from "./utils"


export interface NodeMatcher {
    matches(node: Node): any
}

export class FileMatcher<T extends string> {
    pattern: T;
    matcher: (string: string) => DirParser<T, {}>;
    constructor(pattern: T) {
        this.pattern = pattern;
        this.matcher = makeMatcher(pattern)
    }

    matches(node: File) {
        if (node.internal.type === "File") {
            const cwd = process.cwd()
            const relativePath = path.relative(cwd, node.absolutePath)
            return this.matcher(relativePath)
        }
        return undefined;
    }
}

export class MdxMatcher<T extends string> {
    pattern: T;
    matcher: (string: string) => DirParser<T, {}>;
    constructor(pattern: T) {
        this.pattern = pattern;
        this.matcher = makeMatcher(pattern)
    }

    matches(node: Mdx) {
        if (node.internal.type === "Mdx") {
            const cwd = process.cwd()
            const relativePath = path.relative(cwd, node.fileAbsolutePath)
            return this.matcher(relativePath)
        }
        return undefined;
    }
}
