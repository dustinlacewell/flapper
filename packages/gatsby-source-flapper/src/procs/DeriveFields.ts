import { CreateFields } from "."
import {
    Asset,
    Context,
    Proc,
} from "../types"
import { get_value } from "../utils"


export const DeriveFields: Proc = (src_attr: string, dst_attr: string, func) => {
    const map = {}
    map[dst_attr] = (context: Context, asset: Asset) =>
        func(context, asset, get_value(asset, src_attr))
    return CreateFields(map)
}
