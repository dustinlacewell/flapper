
import { Context, Stages } from "./src/types"
import { CreatePageUtils } from "./src/utils";


export const createPages = async (createPageUtils: CreatePageUtils, pluginOptions: { stages: Stages, finalizer: (context: Context) => void}) => {
    const context = new Context(createPageUtils);

    for (const [stage_name, pipeline] of Object.entries(pluginOptions.stages)) {
        console.log(`>>> ${stage_name}`)
        for (const [asset_type, procs] of Object.entries(pipeline)) {
            console.log(`   - ${asset_type}`)
            if (asset_type.startsWith('@')) {
                for (const proc of procs) {
                    await proc(context)
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
}
