import fs from "fs"
import path from "path"

import RSS from "rss"


/**
 *
 * Renders an RSS feed to the supplied filename.
 *
 * @param filename The file to write the RSS feed to.
 * @param config The configuration object for the RSS feed.
 * @param handler Callback run for each asset.
 */
export const RenderRSS = (filename: string, config: ConstructorParameters<typeof RSS>[0], handler: (asset) => any) =>
    async (ctx, type, assets) => {
        if (!(fs.existsSync(path.dirname(filename)))) {
            fs.mkdirSync(filename, { recursive: true })
        }

        const feed = new RSS(config)

        assets
            .map(handler)
            .forEach(data => {
                console.log("RSS item data:")
                console.table(data)
                feed.item(data)
            })

        console.log(`Rendering ${assets.length} ${type} assets to RSS`)

        fs.writeFileSync(path.join("./public", filename), feed.xml())
    }
