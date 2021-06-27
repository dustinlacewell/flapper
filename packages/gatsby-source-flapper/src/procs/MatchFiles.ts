import fs from 'fs'
import { join } from 'path'

import {
    Asset,
    ContentType,
    Proc,
} from '../types'
import { matchPaths, statFile } from '../utils'


export const MatchFiles: Proc = <T extends string>(path: T) => {
    return async (context, type_name: string, assets: ContentType) => {
        console.log(`Matching files from: ${join(process.cwd(), path)}`)
        const results = await matchPaths(process.cwd(), path)
        for (const { path, meta } of results) {
            const stats = await statFile(path)
            const metadata = {
                ...meta,
                path,
                stats,
            }
            const content = fs.readFileSync(path).toString()
            const asset = new Asset(path, content, metadata)
            assets.push(asset)
        }
    }
}
