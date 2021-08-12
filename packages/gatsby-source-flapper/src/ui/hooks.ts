import { useEffect,useState } from "react"

import { parse } from 'flatted'


const cache = {}

export type AssetHookOptions = {
    root?: string,
    flatted?: boolean,
}

export const fetchAsset = async (id: string, options?: AssetHookOptions) => {
    // console.log(`Fetching asset: ${id}`)

    const { root = "/assets", flatted = true } = options || {}
    const url = `${root}/${id}.json`

    // check cache
    const cached = cache[url]
    if (cached) {
        return cached
    }

    // fetch from server
    const response = await fetch(url)
    let data
    // unflatten
    if (flatted) {
        const text = await response.text()
        data = parse(text)
    // normal
    } else {
        data = await response.json()
    }

    // update cache
    cache[url] = data
    // resolve links
    await fetchLinks(data, options)

    return data
}

export const fetchAssets = async (ids: string[], options?: AssetHookOptions) => {
    const assets = []
    for (const id of ids) {
        const asset = await fetchAsset(id, options)
        assets.push(asset)
    }
    return assets
}

const fetchLink = async (id: string, options?: AssetHookOptions) => {
    // console.log("Fetch links:")
    // console.log(id)
    if (id.match(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}[P]?$/i)) {
        const asset = await fetchAsset(id, options)
        return asset
    } else {
        return id
    }
}

const fetchArrayLinks = async (array: any[], options?: AssetHookOptions) => {
    // console.log("Fetch Array links:")
    // console.log(array)
    for (let i = 0; i < array.length; i++) {
        const item = array[i]
        if (typeof item === "string") {
            array[i] = await fetchLink(item, options)
        } else if (typeof item === "object") {
            await fetchLinks(item, options)
        }
    }
}

const fetchObjectLinks = async (object: any, options?: AssetHookOptions) => {
    // console.log("Fetch Object links:")
    // console.log(object)
    for (let [key, value] of Object.entries(object)) {
        if (key === "id")
            continue
        if (typeof value === "string") {
            object[key] = await fetchLink(value, options)
        } else if (typeof object[key] === "object") {
            await fetchLinks(object[key], options)
        }
    }
}

// recursively walk object graph and find properties matching uuid pattern
// and replace them with loaded asset
export const fetchLinks = async (obj, options?: AssetHookOptions) => {
    // console.log(`Fetchlinks:`)
    // console.log(obj)
    if (!obj) return
    if (Array.isArray(obj)) {
        await fetchArrayLinks(obj, options)
    } else if (typeof obj === 'object') {
        await fetchObjectLinks(obj, options)
    }
}

export const useAsset = (id: string, options?: AssetHookOptions) => {
    const [ asset, setAsset ] = useState(null)

    useEffect(() => {
        // fetch asset json from server
        (async () => {
            let _asset = await fetchAsset(id, options)
            setAsset(_asset)
        })()
    }, [])

    return asset
}

export const fetchAssetsConcurrently = async (ids: string[], options?: AssetHookOptions) => {
    const work = ids.map(async (id) => {
        let asset = fetchAsset(id, options)
        return asset
    })
    return await Promise.all(work)
}

export const useAssets = (ids: string[], options?: AssetHookOptions) => {
    const [ assets, setAssets ] = useState(null)

    useEffect(() => {
        // fetch assets json from server concurrently
        (async () => {
            const assets = await fetchAssetsConcurrently(ids, options)
            setAssets(assets)
        })()
    }, [])

    return assets
}

