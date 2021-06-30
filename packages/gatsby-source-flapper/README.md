# Flapper for Gatsby

A flexible alternative to GraphQL for Gatsby.

Check out our [documentation](http://flapper.ldlework.com/).

```javascript
const pipelines = {
    page: [
        SourceFilesRecursively("pages/", [".tsx"]),
        SetUrl("{{relativePath}}"),
        RenderTemplate("{{path}}")
    ],
    post: [
        SourceMatchedFiles("posts/{{category_name}}/{{name}}.mdx"),
        SetUrl("posts/{{name}}"),
        BindMdx("{{path}}"),
        RenderTemplate("src/templates/MDXPost.tsx")
    ]
}
```

## GraphQL is a sledgehammer

Gatsby's GraphQL is crazy powerful. You can do anything with it!

But it also takes a lot of effort to get your data into GraphQL, just to get it out again.

If you have your data on hand, Flapper just lets you use it.

## Invent your own metaphors

Most SSGs try to lock you into "pages" and "posts" with "tags" and "categories".

Flapper lets you imagine metaphors useful for your site.

Want a "project" metaphor? Or a "article series" metaphor? Just make it.

## Dead simple site generation

Use simple functions to build your data model using regular javascript data.

Map your data to URLs and Templates, get static HTML.

Templates are simply components with the full power of React.
