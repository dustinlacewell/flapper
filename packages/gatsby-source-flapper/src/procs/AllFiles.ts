import fs from 'fs'
import {
    basename,
    dirname,
    extname,
    join,
} from 'path'

import recursive from "recursive-readdir";

import { Asset,Proc } from '../types';
import { slash, statFile } from '../utils';


export const AllFiles: Proc = (search_path: string, extensions: string[] = null) => {
    const full_search_path = slash(join(process.cwd(), search_path))
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
            const asset = new Asset(file.path, content, file)
            assets.push(asset)
        }
    }
}
