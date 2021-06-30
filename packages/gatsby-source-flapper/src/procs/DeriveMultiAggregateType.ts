import Handlebars from 'handlebars';

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
 * A new asset is created for each group of target assets which share all
 * same values for each of the `source_fields`.
 *
 * @param target_type The asset type to aggregate over.
 * @param target_field The asset field to store the reverse relation on.
 * @param source_fields The asset fields to aggregate over.
 * @param name Template to compute the name of aggregate assets.
 */
export const DeriveMultiAggregateType = (target_type: string, target_field: string, source_fields: string[], name: string): Processor => {
    const name_template = Handlebars.compile(name)
    return async (context, type, assets) => {
        const other_assets = context.getAssetType(target_type)
        const aggregates = new Map<string[], Asset>()
        for (const other_asset of other_assets) {
            const value_map: Record<string, any> = {}
            const value_list = []
            for (const attr of source_fields) {
                const value = get_value(other_asset, attr)
                value_map[attr] = value
                value_list.push(value)
            }

            const aggregate = aggregates.get(value_list) || NewAsset(DeriveMultiAggregateType.name, {
                name: name_template(value_map),
                assets: [],
            })
            aggregate['assets'].push(other_asset)
            aggregates.set(value_list, aggregate)
        }

        for (const aggregate of aggregates.values()) {
            for (const asset of aggregate['assets']) {
                asset[target_field] = aggregate
            }
            assets.push(aggregate)
        }
    }
}
