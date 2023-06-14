export const filterOpenMenu = (user, item) => {
    const isAdmin = user.role === null
    if ('items' in item) {
        let items = []
        if (isAdmin) {
            items = item.items
        } else {
            items = item.items.filter((item) =>
                user.role.permissions.find((p) => p.name === item.permission)
                    ? item
                    : null
            )
        }

        if (items.length > 0) {
            let activeItem = items.map((item) => route().current(item.active))
            item.open = activeItem.includes(true)
            item.items = items.filter((item) => (item.show ? item : null))
            return item
        }
    }
    if (isAdmin) {
        return item
    }
}
