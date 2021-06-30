import { Asset, Processor } from "@types"


/**
 *
 * Sorts assets based on a comparator function.
 *
 * @param comp Comparator function
 */
export const Sort = (comp: (a: Asset, b: Asset) => number): Processor => {
    return async (context, type, assets) => {
        assets.sort(comp)
    }
}
