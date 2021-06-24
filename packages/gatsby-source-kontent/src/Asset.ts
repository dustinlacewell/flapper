import { v4 } from 'uuid';


export class Asset {
    public target: string = undefined;
    public id: string;

    constructor(
        public source: string,
        public content: string,
        metadata: any,
        public type = "Unidentified"
    ) {
        this.id = v4();
        for (const [key, value] of Object.entries(metadata)) {
            this[key] = value
        }
    }
}
