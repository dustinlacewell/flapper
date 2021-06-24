
export const ProxyAsset = (asset) => {
    const _metadata = {id : `Proxied: ${asset.id}`}

    return new Proxy(asset, {
        get: function(obj, prop) {
            return _metadata[prop] || obj[prop]
        },
        set: function(obj, prop, value) {
            _metadata[prop] = value
            return true
        },
    })
}
