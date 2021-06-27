import Handlebars from 'handlebars'

import { Asset, Proc } from '../types';


export class Menu {
    name: string;
    parent_name: string;
    asset_id: string;
    asset_target: string;
    children: Menu[];
    label: string;
    priority: number;

    constructor(
        name: string,
        asset: Asset = null,
        parent_name: string = null,
        label: string = null,
        priority: number = 0
    ) {
        this.init(name, asset, parent_name, label, priority)
    }

    init(
        name: string,
        asset: Asset = null,
        parent_name: string = null,
        label: string = null,
        priority: number = 0
    ) {
        this.name = name;
        this.parent_name = parent_name
        this.asset_id = asset === null ? null : asset.id;
        this.asset_target = asset === null ? "" : asset.target;
        this.children = [];
        this.priority = priority;
        this.label = label || name;
    }

    copy(menu: Menu) {
        this.name = menu.name
        this.parent_name = menu.parent_name
        this.asset_id = menu.asset_id
        this.asset_target = menu.asset_target
        this.children = menu.children
        this.priority = menu.priority
        this.label = menu.label
    }

    add(child: Menu) {
        if (this.children.findIndex(c => c.asset_id === child.asset_id) === -1) {
            this.children.push(child)
            this.children.sort((a, b) => a.priority - b.priority)
        }
    }

    render(level = 0) {
        let indent = ""
        for (let i = 0; i <= level; i++) {
            indent += "-"
        }
        const children = this.children.map(c => c.render(level+1)).join("\n")
        return `${indent} ${this.name}\n${children}`
    }
}

export const GetMenus = (context) => {
    let menus = context['menus']
    if (menus === undefined) {
        menus = context['menus'] = {}
    }
    return menus
}

export const GetMenu = (context, name) => {
    const menus = GetMenus(context)
    let menu = menus[name]
    if (menu === undefined) {
        menus[name] = menu = new Menu(name)
    }
    return menu
}

export const AddMenu = (context, new_menu) => {
    const menu = GetMenu(context, new_menu.name)
    menu.copy(new_menu)

    if (menu.parent_name) {
        const parent = GetMenu(context, menu.parent_name)
        parent.add(menu)
    }
}

export const MakeMenu: Proc = (name: string, parent: string = null, label: string = '', priority: number = 0) => {
    const name_template = Handlebars.compile(name)
    const parent_template = Handlebars.compile(parent || '')
    const label_template = Handlebars.compile(label || '')

    return async (context, type, assets) => {
        const menus = GetMenus(context)

        for (const asset of assets) {
            const menu_name = name_template(asset)
            const parent_name = parent_template(asset)
            const menu_label = label_template(asset)

            let menu = menus[menu_name]
            if (menu) {
                throw new Error(`Duplicate menu in type ${type}: ${menu_name} : ${name}`)
            } else {
                menu = new Menu(menu_name, asset, parent_name, menu_label, priority)
            }
            console.log(`*** Menu: ${type}: ${menu.label} => ${menu.asset_target}`)
            AddMenu(context, menu)
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
