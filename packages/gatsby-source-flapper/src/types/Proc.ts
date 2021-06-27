import { ContentType, Context } from ".";


export type Proc =
    (...args: any[]) =>
    (context: Context, type_name: string, assets: ContentType) => Promise<void>
