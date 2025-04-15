export const filterAllowedMenu = (user, item) => {
    if (item.permission === false) {
        return item
    }

    if (user.role === null) {
        return
    }

    if ('permission' in item) {
        return user.role.permissions.find((p) => p.name === item.permission)
            ? item
            : null
    }

    if ('items' in item) {
        let items = []
        items = item.items.filter((item) =>
            user.role.permissions.find((p) => p.name === item.permission)
                ? item
                : null
        )

        if (items.length > 0) {
            let activeItem = items.map((item) => route().current(item.active))
            item.open = activeItem.includes(true)
            item.items = items.filter((item) => (item.show ? item : null))
            return item
        }
    }
}
