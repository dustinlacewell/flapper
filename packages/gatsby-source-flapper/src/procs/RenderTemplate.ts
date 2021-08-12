import path from "path"

import { stringify } from "flatted"
import Handlebars from "handlebars"

import {
    ContentType,
    Context,
    Processor,
} from "@types"


const createIndex = (assetMap: Map<string, ContentType>) => {
    const index = {}
    for (const key of assetMap.keys()) {
        const assets = assetMap.get(key)
        const group = index[key] || []
        for (const asset of assets) {
            group.push(asset.id)
        }
        index[key] = group
    }
    return index
}

/**
 *
 * Renders the evaluated template for each asset to static HTML.
 *
 * Assets should have a valid `.target` field.
 *
 * @param pattern Should evaluate to the filename of a template.
 */
export const RenderTemplate = (pattern: string, reducer?: ((ctx: Context, defaultCtx: any) => any)): Processor => {
    const template = Handlebars.compile(pattern)
    return async (context, type, assets) => {
        const index = createIndex(context.assets)
        const safeContext = { assets: { [type]: assets }, menus: context['menus'], index }
        for (const asset of assets) {
            if (asset.target) {
                const pageData = reducer ? reducer(context, safeContext) : safeContext
                const pageContext = { data: stringify({ context: pageData, asset }) }
                context.utils.actions.createPage({
                    path: asset.target,
                    component: path.resolve(template(asset)),
                    context: pageContext,
                })
            }
        }
    }
}
