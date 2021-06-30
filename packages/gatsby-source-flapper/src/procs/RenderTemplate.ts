import path from 'path';

import { stringify } from 'flatted';
import Handlebars from 'handlebars';

import { Processor } from '@types';


/**
 *
 * Renders the evaluated template for each asset to static HTML.
 *
 * Assets should have a valid `.target` field.
 *
 * @param pattern Should evaluate to the filename of a template.
 */
export const RenderTemplate = (pattern: string): Processor => {
    const template = Handlebars.compile(pattern)
    return async (context, type, assets) => {
        const safeContext = {assets: {}, menus: context['menus'] }
        context.assets.forEach((value, key) => {
            safeContext.assets[key] = value
        })
        for (const asset of assets) {
            if (asset.target) {
                const pageContext = { data: stringify({ context: safeContext, asset }) }
                context.utils.actions.createPage({
                    path: asset.target,
                    component: path.resolve(template(asset)),
                    context: pageContext,
                })
            }
        }
    }
}
