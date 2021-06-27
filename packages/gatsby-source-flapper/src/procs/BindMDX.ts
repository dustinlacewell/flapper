import matter from 'gray-matter';
import Handlebars from 'handlebars';

import { Proc } from '../types';


export const BindMDX: Proc = (pattern: string) => {
    const template = Handlebars.compile(pattern)
    return async (context, type_name, assets) => {
        for (const asset of assets) {
            const path = template(asset)
            const mdx = (await context.utils.graphql(`
                query MyQuery ($path: String) {
                    mdx(fileAbsolutePath: {eq: $path}) {
                        id
                        slug
                        body
                        fileAbsolutePath
                        internal {
                            content
                        }
                    }
                }
            `, { path }) as any)

            if (mdx.data.mdx !== null) {
                asset['mdx'] = (mdx.data as any).mdx
                const frontmatter = matter(asset['mdx'].internal.content).data
                for (const [key, value] of Object.entries(frontmatter)) {
                    asset[key] = value
                }
            } else {
                delete asset['mdx']
                console.warn(`Couldn't find MDX at: ${path}`)
            }
        }
    }
}
