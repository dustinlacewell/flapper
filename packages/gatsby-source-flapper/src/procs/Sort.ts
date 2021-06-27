import { Asset,Proc } from "../types"


export const Sort: Proc = (comp: (a: Asset, b: Asset) => number) => {
    return async (context, type, assets) => {
        assets.sort(comp)
    }
}
