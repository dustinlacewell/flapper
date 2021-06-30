import { v4 } from 'uuid';


export type Asset = {
    [key: string]: any
}

export const NewAsset = (type: string, meta: Asset) => {
    return {
        ...meta, type,
        id: v4(),
    }
}
