import fs from 'fs'
import {
    basename,
    dirname,
    extname,
    join,
} from 'path'

import recursive from "recursive-readdir";

import { NewAsset,Processor } from '@types';
import { statFile } from '@utils';


/**
 *
 * Produces assets from files on disk.
 *
 * All files in the path, recursively, will be sourced.
 *
 * @param search_path Path to source files from.
 * @param extensions Limit files to these extensions.
 */
export const SourceFilesRecursively = (search_path: string, extensions: string[] = null): Processor => {
    const full_search_path = join(process.cwd(), search_path)
    return async (context, type_name, assets) => {
        const files = (await recursive(full_search_path))
            .map(path => ({
                path,
                stats: statFile(path),
                extension: extname(path),
                dirname: dirname(path),
                basename: basename(path),
            }))
            .filter(data =>
                extensions === null ? true : extensions.includes(data.extension))
        for (const file of files) {
            const content = fs.readFileSync(file.path).toString()
            const asset = NewAsset(file.path, { ...file, content })
            assets.push(asset)
        }
    }
}
