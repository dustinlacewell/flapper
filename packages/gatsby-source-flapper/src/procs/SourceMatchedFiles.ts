import fs from 'fs'

import {
    ContentType,
    NewAsset,
    Processor,
} from '@types'
import { matchPaths, statFile } from '@utils'


/**
 *
 * Produces assets based on files that match the `path pattern.
 *
 * The `path` may contain capture clauses:
 *
 *     /posts/{{category}}/{{slug}}.md
 *
 * Which will set the `.category` and `.slug` fields.
 *
 * @param path Path pattern to match files against.
 */
export const SourceMatchedFiles = <T extends string>(path: T): Processor => {
    return async (context, type_name: string, assets: ContentType) => {
        const cwd = process.cwd()
        const results = await matchPaths(cwd, path)
        for (const { path, meta } of results) {
            const stats = await statFile(path)
            const content = fs.readFileSync(path).toString()
            const metadata = {
                ...meta,
                content,
                path,
                stats,
            }
            const asset = NewAsset(SourceMatchedFiles.name, metadata)
            assets.push(asset)
        }
    }
}
