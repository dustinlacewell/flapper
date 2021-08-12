
export const ProxyAsset = (asset) => {
    const _metadata = {id : `${asset.id}P`}

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
