import { Asset, ContentType } from "@types";
import { CreatePageUtils } from "@utils";


export class Context extends Map<string, any> {
    assets: Map<string, ContentType>
    utils: CreatePageUtils
    index: Map<string, Asset>

    constructor(utils: CreatePageUtils) {
        super()
        this.utils = utils
        this.assets = new Map()
        this.index = new Map()
    }

    getAssetType(type: string) {
        const assetType = this.assets.get(type) || new ContentType(this)
        this.assets.set(type, assetType);
        return assetType
    }

    getAsset(id: string) {
        return this.index.get(id)
    }
}
