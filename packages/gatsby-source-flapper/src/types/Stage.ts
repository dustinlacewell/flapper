import { Proc } from ".";


export type Stage = {
    [key: string]: Proc[]
}

export type Stages = {
    [key: string]: Stage
}
