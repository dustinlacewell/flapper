import { Asset } from "../Asset";
import { Context } from "../Context";
import { get_value, Proc } from "../utils";

import { CreateFields } from "./CreateFields";


export const DeriveFields: Proc = (src_attr: string, dst_attr: string, func) => {
    const map = {}
    map[dst_attr] = (context: Context, asset: Asset) =>
        func(context, asset, get_value(asset, src_attr))
    return CreateFields(map)
}
