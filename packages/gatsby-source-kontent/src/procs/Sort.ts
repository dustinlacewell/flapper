import { Asset } from "../Asset";
import { Proc } from "../utils";


export const Sort: Proc = (comp: (a: Asset, b: Asset) => number) => {
    return async (context, type, assets) => {
        assets.sort(comp)
    }
}
