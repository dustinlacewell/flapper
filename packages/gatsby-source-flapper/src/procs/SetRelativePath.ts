import path from 'path'

import { Processor } from '@types'


/**
 *
 * Relativizes a path.
 *
 * @param base_path Path to relativize from.
 * @param source_field Asset field containing path to relativize.
 * @param target_field Asset field to store the result on.
 */
export const SetRelativePath = (base_path: string, source_field = "path", target_field = "relativePath"): Processor => {
    const absolute_from = path.join(process.cwd(), base_path)
    return async(context, type_name, assets) => {
        for (const asset of assets) {
            const assetPath = asset[source_field]
            asset[target_field] = path.relative(absolute_from, assetPath)
        }
    }
}
