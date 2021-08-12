import fs from "fs"
import path from "path"

import { stringify } from "flatted"


/**
 *
 * Renders assets to JSON files at root
 *
 * @param root The root directory to store asset data
 * @param flatted Whether to run flatted on the data
 */
export const RenderIndex = (root = "assets", flatted = true) =>
    async (ctx, type, assets) => {
        const publicRoot = path.join("./public", root)
        if (!(fs.existsSync(publicRoot))) {
            fs.mkdirSync(publicRoot, { recursive: true })
        }

        // write each asset to json file at root by id
        for (const asset of assets) {
            const file = path.join(publicRoot, `${asset.id}.json`)
            const data = flatted ? stringify(asset) : JSON.stringify(asset, null, 2)
            fs.writeFileSync(file, data)
        }
    }
