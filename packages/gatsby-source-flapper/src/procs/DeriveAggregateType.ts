import {
    Asset,
    NewAsset,
    Processor,
} from '@types'
import { get_value } from '@utils';

/**
 *
 * Creates new assets by aggregating over another target asset type.
 *
 * A new asset is created for each group of target assets which share
 * the same value of their `target_field`.
 *
 * @param target_type The asset type to aggregate over.
 * @param value_field The asset field to aggregate over.
 *
 * This is the field from the `target_type` assets the aggregated values
 * are taken from.
 *
 * @param target_field The asset field to store the relation on.
 *
 * Every target asset will receive a field pointing to the aggregate asset
 * the it belongs to.
 */
export const DeriveAggregateType = (target_type: string, value_field: string, target_field: string): Processor => {
    return async (context, type, assets) => {
        const other_assets = context.getAssetType(target_type)
        const groups: {[key: string]: Asset[]} = {}
        for (const other_asset of other_assets) {
            const value = get_value(other_asset, value_field)
            if (!value) continue
            const group = groups[value] || []
            group.push(other_asset)
            groups[value] = group
        }

        for (const [group_key, group_assets] of Object.entries(groups)) {
            const metadata = { name: group_key, assets: group_assets.map(a => a.id) }
            const new_asset = NewAsset(DeriveAggregateType.name, metadata)
            new_asset.type = type
            for (const group_asset of group_assets) {
                group_asset[target_field] = new_asset.id
            }
            assets.push(new_asset)
        }
    }
}
