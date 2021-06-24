import fs from 'fs'

import { Asset } from '../Asset';
import { ContentType } from '../ContentType';
import {
    matchPaths,
    Proc,
    statFile,
} from '../utils'


export const MatchFiles: Proc = <T extends string>(path: T) => {
    return async (context, type_name: string, assets: ContentType) => {
        console.log("--- DiskLoader")
        const results = await matchPaths("/home/ldlework/src/ldlework-dot-com-blot/", path)
        for (const { path, meta } of results) {
            console.log(`Found ${path}`)
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
