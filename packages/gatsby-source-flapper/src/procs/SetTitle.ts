import { titleCase } from "title-case";

import { Processor } from "@types";
import { get_value } from "@utils";


/**
 * Sets `target_field` to a "title-ized" version of `source_field`.
 *
 * @param source_field  Field to take value from.
 * @param target_field  Field to set "title-ized" value to.
 * @param remove_spaces Whether to remove spaces from title.
 */
export const SetTitle = (source_field: string, target_field = "title", remove_spaces = true): Processor =>
    async (context, type, assets) => {
        assets.forEach(asset => {
            let value = get_value(asset, source_field)
            value = value.replace(/-/g, " ")
            value = value.replace(/_/g, " ")
            value = titleCase(value)
            if (remove_spaces)
                value = value.replace(/ /g, "")
            asset[target_field] = value
        })
    }
