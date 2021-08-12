import { NewAsset, Processor } from "@types"


/**
 *
 * Populates an asset type with the assets of other asset types.
 *
 * @param types Names of asset types to join.
 */
export const DeriveUnifiedType = (target_type: string): Processor => {
    return async (context, type, assets) => {
        const children = context.getAssetType(target_type).map(a => a.id)
        const unifiedAsset = NewAsset(type, { assets: children })
        assets.push(unifiedAsset)
    }
}
