import { Processor, ProxyAsset } from "@types"


/**
 *
 * Populates an asset type with the assets of other asset types.
 *
 * @param types Names of asset types to join.
 */
export const DeriveJoinedType = (...types: string[]): Processor => {
    return async (context, type, assets) => {
        for (const type_name of types) {
            for (const asset of context.getAssetType(type_name)) {
                const proxy = ProxyAsset(asset)
                assets.push(proxy)
            }
        }
    }
}
