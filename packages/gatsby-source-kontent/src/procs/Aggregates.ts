import Handlebars from 'handlebars';

import { Asset } from "../Asset";
import { get_value, Proc } from "../utils";


export const DeriveSimpleAggregate: Proc = (other_type: string, key: string, attr: string) => {
    return async (context, type, assets) => {
        const other_assets = context.getAssetType(other_type)
        const groups: {[key: string]: Asset[]} = {}
        for (const other_asset of other_assets) {
            const value = get_value(other_asset, attr)
            const group = groups[value] || []
            group.push(other_asset)
            groups[value] = group
        }

        for (const [group_key, group_assets] of Object.entries(groups)) {
            const metadata = { name: group_key, assets: group_assets }
            const new_asset = new Asset(DeriveSimpleAggregate.name, null, metadata)
            new_asset.type = type
            for (const group_asset of group_assets) {
                group_asset[key] = new_asset
            }
            assets.push(new_asset)
        }
    }
}

export const DeriveComplexAggregate: Proc = (other_type: string, key: string, attrs: string[], name: string) => {
    const name_template = Handlebars.compile(name)
    return async (context, type, assets) => {
        const other_assets = context.getAssetType(other_type)
        const aggregates = new Map<string[], Asset>()
        for (const other_asset of other_assets) {
            const value_map: Record<string, any> = {}
            const value_list = []
            for (const attr of attrs) {
                const value = get_value(other_asset, attr)
                value_map[attr] = value
                value_list.push(value)
            }

            const aggregate = aggregates.get(value_list) || new Asset(DeriveComplexAggregate.name, null, {
                name: name_template(value_map),
                assets: [],
            })
            aggregate['assets'].push(other_asset)
            aggregates.set(value_list, aggregate)
        }

        for (const aggregate of aggregates.values()) {
            for (const asset of aggregate['assets']) {
                asset[key] = aggregate
            }
            assets.push(aggregate)
        }
    }
}
