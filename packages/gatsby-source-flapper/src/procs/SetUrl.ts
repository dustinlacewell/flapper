import Handlebars from 'handlebars';

import {Processor } from '@types';


const rsplit = (input: string, sep: string, maxsplit: number): string[] => {
    var split = input.split(sep);
    return maxsplit ? [ split.slice(0, -maxsplit).join(sep) ].concat(split.slice(-maxsplit)) : split;
}


/**
 *
 * Sets the asset's `.target` field to be used as its URL.
 *
 * @param pattern Should evaluate to the URL of the asset.
 * @param removeExtension Whether to remove extensions from the URL
 * @param cleanIndexes Whether to trim index page URLs
 */
export const SetUrl = (pattern: string, removeExtension = true, cleanIndexes = true): Processor => {
    const template = Handlebars.compile(pattern)
    return async (context, type, assets) => {
        for (const asset of assets) {
            const rendered_target = template(asset)
            let no_ext_target = rendered_target;
            if (removeExtension) {
                const parts = rsplit(rendered_target, '.', 2)
                no_ext_target = parts[1]
            }
            let prefixed_target = no_ext_target.startsWith('/') ? no_ext_target : `/${no_ext_target}`
            if (cleanIndexes) {
                prefixed_target = prefixed_target.endsWith('/index') ? prefixed_target.slice(0, prefixed_target.length - 5) : prefixed_target
                prefixed_target = prefixed_target.endsWith('/index.html') ? prefixed_target.slice(0, prefixed_target.length - 10) : prefixed_target
            }
            asset.target = prefixed_target
        }
    }
}
