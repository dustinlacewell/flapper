import path from 'path'

import { Proc } from "../utils"


export const SetRelativePath: Proc = (from: string) => {
    const absolute_from = path.join(process.cwd(), from)
    return async(context, type_name, assets) => {
        for (const asset of assets) {
            const assetPath = asset['path']
            asset['relativePath'] = path.relative(absolute_from, assetPath)
            console.log(`Set relative path: ${asset['relativePath']}`)
        }
    }
}
