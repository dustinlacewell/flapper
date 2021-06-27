import { parse } from "flatted"


export function SiteTemplate(renderer) {
    return (props) => {
        const siteData = parse(props.pageContext.data)
        return renderer(siteData)
    }
}
