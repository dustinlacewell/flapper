import { titleCase } from "title-case";

import { Asset } from "../Asset"
import { Context } from "../Context"
import { Proc } from "../utils"

import { DeriveFields } from "./DeriveFields"


export const SetTitle: Proc = (src_attr: string, dst_attr = "title") => {
    return DeriveFields(src_attr, dst_attr, (context: Context, asset: Asset, value: string) =>
        titleCase(value.replace("-", " ").replace("_", " ")))
}
