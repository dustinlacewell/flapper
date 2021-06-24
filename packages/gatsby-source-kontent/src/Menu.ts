import Handlebars from 'handlebars'

import { Asset } from "./Asset"
import { Proc } from "./utils";


const menu_registry = {}
const type_registry = {}

export class Menu {
    name: string;
    asset_id: string;
    asset_target: string;
    children: Menu[];
    label: string;
    parent: Menu;
    priority: number;

    constructor(
        name: string,
        asset: Asset,
        parent: string = null,
        label: string = null,
        priority: number = 0
    ) {
        this.name = name;
        this.asset_id = asset === null ? null : asset.id;
        this.asset_target = asset === null ? "" : asset.target;
        this.children = [];
        this.priority = priority;
        this.label = label || name;
        menu_registry[name] = this;
        this.attach(parent)
    }

    attach(parent: string) {
        if (parent) {
            this.parent = menu_registry[parent]
            if (this.parent === undefined) {
                this.parent = new Menu(parent, null)
            }
            this.parent.add(this)
        }
    }

    add(child: Menu) {
        if (this.children.findIndex(c => c.asset_id === child.asset_id) === -1) {
            this.children.push(child)
            this.children.sort((a, b) => a.priority - b.priority)
        }
    }
}

export const CheckMenu = (menu, asset_id) => {
    if (menu.asset_id === asset_id) {
        return true
    }
    for (const child of menu.children) {
        if (CheckMenu(child, asset_id)) {
            return true
        }
    }

    return false
}

export const MakeMenu: Proc = (name: string, parent: string = null, label: string = '', priority: number = 0) => {
    const name_template = Handlebars.compile(name)
    const parent_template = Handlebars.compile(parent || '')
    const label_template = Handlebars.compile(label || '')

    return async (context, type, assets) => {
        context['menus'] = menu_registry
        for (const asset of assets) {
            const menu_name = name_template(asset)
            const parent_name = parent_template(asset)
            const menu_label = label_template(asset)

            console.log(`Making menu: ${menu_name} => ${parent_name} for ${type} @ ${asset.target}`)

            let menu = menu_registry[menu_name]
            if (menu) {
                menu.priority = priority
                menu.label = menu_label || menu_name
                menu.asset_id = asset.id
                menu.asset_target = asset.target
                menu.attach(parent_name)
            } else {
                menu = new Menu(menu_name, asset, parent_name, menu_label, priority)
            }
            type_registry[type] = menu
        }
    }
}
