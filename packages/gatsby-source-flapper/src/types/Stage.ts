import { ContentType, Context } from "@types"


export type Processor =
    (context: Context, type_name: string, assets: ContentType) => Promise<void>

export type Stage = {
    [key: string]: Processor[]
}

export type Plan = {
    [key: string]: Stage
}
