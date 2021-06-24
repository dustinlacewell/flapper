import path from "path";

import {
    File,
    Mdx,
    Node,
} from "./types"
import { DirParser, makeMatcher } from "./utils"


export const ProjectPost =
    makeMatcher("projects/{category}/{name}/posts/{series}/{slug}.mdx")

export type ProjectPostMeta = ReturnType<typeof ProjectPost>

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
            console.log("!?!?!?!?!")
            const cwd = process.cwd()
            const relativePath = path.relative(cwd, node.fileAbsolutePath)
            console.log(`**** FOUND MDX: ${relativePath}`)
            return this.matcher(relativePath)
        }
        return undefined;
    }
}
