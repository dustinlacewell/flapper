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
