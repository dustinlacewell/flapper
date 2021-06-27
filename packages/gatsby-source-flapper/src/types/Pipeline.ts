import { Proc } from ".";


export type Pipeline = [
    string,
    ...Proc[],
]
