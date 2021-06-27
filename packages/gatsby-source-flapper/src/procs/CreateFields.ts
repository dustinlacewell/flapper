import {
    Asset,
    Context,
    Proc,
} from "../types"
import { get_value,set_value } from "../utils"


export const CreateFields: Proc = (map: {[key:string]: (context: any, asset: any) => any}) => {
    return async (context, type, assets) => {
        for (const asset of assets) {
            for (const [key, func] of Object.entries(map)) {
                const value = func(context, asset)
                set_value(asset, key, value)
            }
        }
    }
}

export const fk = (search_type: string, search_attr: string, test_attr: string) => {
    return (context: Context, asset: Asset) => {
        const assetType = context.getAssetType(search_type)
        const value = get_value(asset, test_attr)
        const result = assetType.find_matching(search_attr, value)
        return result
    }
}

export const agg_fk = (search_type: string, search_attr: string, test_attr: string) => {
    return (context: Context, asset: Asset) => {
        const assetType = context.getAssetType(search_type)
        const value = asset['assets'][0][test_attr]
        const result = assetType.find_matching(search_attr, value)
        return result
    }
}

export const agg_attr = (attr: string) => {
    return (context: Context, asset: Asset) => {
        if (asset['assets'] !== undefined && asset['assets'].length) {
            return asset['assets'][0][attr]
        }
    }
}

export const o2m = (search_type: string, search_attr: string, test_attr: string) => {
    return (context: Context, asset: Asset) => {
        const assetType = context.getAssetType(search_type)
        const value = get_value(asset, test_attr)
        const result = assetType.find_all_matching(search_attr, value)
        return result
    }
}
