import { parse } from 'flatted';


export default function SiteTemplate(renderer) {
    return (props) => {
        const siteData = parse(props.pageContext.data)
        return renderer(siteData)
    }
}
