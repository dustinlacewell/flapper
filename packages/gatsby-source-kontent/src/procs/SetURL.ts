import Handlebars from 'handlebars';

import { Asset } from '../Asset';
import { Proc } from "../utils"


const rsplit = (input: string, sep: string, maxsplit: number): string[] => {
    var split = input.split(sep);
    return maxsplit ? [ split.slice(0, -maxsplit).join(sep) ].concat(split.slice(-maxsplit)) : split;
}

export const SetURL: Proc = (pattern: string) => {
    const template = Handlebars.compile(pattern)
    return async (context, type, assets) => {
        if (assets.length === 0) {
            assets.push(new Asset(SetURL.name, null, {name: "Generated"}))
        }
        for (const asset of assets) {
            const rendered_target = template(asset)
            const parts = rsplit(rendered_target, '.', 2)
            // console.log(`Parts:`)
            // console.table(parts)
            const no_ext_target = parts[1]
            const prefixed_target = no_ext_target.startsWith('/') ? no_ext_target : `/${no_ext_target}`
            const cleaned_target = prefixed_target.endsWith('/index') ? prefixed_target.slice(0, prefixed_target.length - 5) : prefixed_target
            asset.target = cleaned_target
            console.log(`URL: ${asset.target}`)
        }
    }
}
