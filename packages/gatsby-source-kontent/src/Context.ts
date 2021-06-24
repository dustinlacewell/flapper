import { ContentType } from "./ContentType";
import { CreatePageUtils } from "./utils";


export class Context extends Map<string, any> {
    assets: Map<string, ContentType>;
    utils: CreatePageUtils;

    constructor(utils: CreatePageUtils) {
        super()
        this.assets = new Map();
        this.utils = utils;
    }

    getAssetType(type: string) {
        const assetType = this.assets.get(type) || new ContentType()
        this.assets.set(type, assetType);
        return assetType
    }
}
