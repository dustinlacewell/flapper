
import { Context, Plan } from "./src/types"
import { CreatePageUtils } from "./src/utils";


type PluginOptions = {
    plan: Plan,
    context: { [key: string]: any },
    callback?: (context: Context) => void,
}

export const createPages = async (createPageUtils: CreatePageUtils, pluginOptions: PluginOptions) => {
    const context = new Context(createPageUtils);
    if (pluginOptions.context) {
        for (const [key, value] of Object.entries(pluginOptions.context)) {
            context[key] = value
        }
    }

    for (const [stage_name, pipeline] of Object.entries(pluginOptions.plan)) {
        console.log(`>>> ${stage_name}`)
        for (const [asset_type, procs] of Object.entries(pipeline)) {
            console.log(`   - ${asset_type}`)
            if (asset_type.startsWith('@')) {
                for (const proc of procs) {
                    await proc(context, null, null)
                }
            } else {
                const assets = context.getAssetType(asset_type)
                for (const proc of procs) {
                    await proc(context, asset_type, assets)
                }

                for (const asset of assets) {
                    asset.type = asset_type
                }
            }
        }
    }
    if (pluginOptions.callback) {
        pluginOptions.callback(context)
    }
}
