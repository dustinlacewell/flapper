import fs from "fs"
import path from "path"

import { stringify } from "flatted"


/**
 *
 * Renders an RSS feed to the supplied filename.
 *
 * @param filename The file to write the RSS feed to.
 * @param config The configuration object for the RSS feed.
 * @param handler Callback run for each asset.
 */
export const RenderJSON = (filename: string, flatted = false) =>
    async (ctx, type, assets) => {
        if (!(fs.existsSync(path.dirname(filename)))) {
            fs.mkdirSync(filename, { recursive: true })
        }

        const json = flatted ? stringify(assets) : JSON.stringify(assets)

        console.log(`Rendering ${assets.length} ${type} assets to JSON`)

        fs.writeFileSync(path.join("./public", filename), json)
    }
