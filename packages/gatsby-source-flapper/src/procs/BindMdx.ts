import matter from 'gray-matter';
import Handlebars from 'handlebars';

import { Processor } from '@types';

/**
 *
 * Binds compiled MDX to assets on the `mdx` and `toc` fields.
 *
 * @param pattern Should evaluate to path of GraphQL-indexed `.mdx` file.
 */
export const BindMdx = (pattern: string): Processor => {
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
                        tableOfContents
                        internal {
                            content
                        }
                    }
                }
            `, { path }) as any)

            if (mdx.data.mdx !== null) {
                const data = mdx.data as any
                asset['mdx'] = data.mdx
                asset['toc'] = data.mdx.tableOfContents
                const frontmatter = matter(asset['mdx'].internal.content).data
                for (const [key, value] of Object.entries(frontmatter)) {
                    asset[key] = value
                }
            } else {
                console.warn(`Couldn't find MDX at: ${path}`)
            }
        }
    }
}
