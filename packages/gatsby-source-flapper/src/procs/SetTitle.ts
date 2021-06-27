import { titleCase } from "title-case";

import { DeriveFields } from ".";
import {
    Asset,
    Context,
    Proc,
} from "../types"


export const SetTitle: Proc = (src_attr: string, dst_attr = "title") => {
    return DeriveFields(src_attr, dst_attr, (context: Context, asset: Asset, value: string) =>
        titleCase(value.replace("-", " ").replace("_", " ")))
}
