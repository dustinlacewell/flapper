import path from 'path';

import { stringify} from 'flatted';
import Handlebars from 'handlebars';

import { Proc } from '../types';


export const RenderTemplate: Proc = (pattern: string) => {
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
