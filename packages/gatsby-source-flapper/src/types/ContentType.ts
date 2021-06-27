import { get_value } from "../utils";

import { Asset } from ".";


export class ContentType extends Array<Asset> {
    include(filter) {
        return this.filter(filter)
    }

    exclude(filter) {
        return this.filter(item => !filter(item))
    }

    include_matching(attr, test) {
        return this.filter(item => {
            const value = get_value(item, attr)
            return value === test;
        })
    }

    exclude_matching(attr, test) {
        return this.filter(item => {
            const value = get_value(item, attr)
            return value !== test;
        })
    }

    find(test) {
        for (const item of this) {
            if (test(item)) {
                return item;
            }
        }
    }

    find_matching(attr, test) {
        for (const item of this) {
            const value = get_value(item, attr)
            if (value === test) {
                return item
            }
        }
    }

    find_all_matching(attr, test) {
        const items = []
        for (const item of this) {
            const value = get_value(item, attr)
            if (value === test) {
                items.push(item)
            }
        }
        return items
    }
}
