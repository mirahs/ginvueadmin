/**
 * 生成用户菜单和路由数据
 * @param {number}} userType 用户类型
 * @returns {Array}
 */
function gen(userType) {
    const menusData = require('@/data/menu_data').menus;
    const [genMenus, genRoutes] = gen2(userType, menusData, '/', [], []);

    return [genMenus, genRoutes];
}

function gen2(userType, menus, parentPath, genMenus, genRoutes) {
    for (let i = 0; i < menus.length; i++) {
        const menu = menus[i];
        if (menu.children) {
            const [genMenusChild, genRoutesChild] = gen2(userType, menu.children, parentPath + menu.name + '/', [], []);
            if (genMenusChild.length > 0) {
                genMenus.push({ name: menu.name, desc: menu.desc, children: genMenusChild });
                genRoutes = genRoutes.concat(genRoutesChild);
            }
        } else {
            if (menu.key.indexOf(userType) >= 0) {
                menu.route = parentPath + menu.name
                genMenus.push(menu);

                const genRoute = {
                    path: parentPath + menu.name,
                    name: menu.name,
                    meta: { auth: true },
                    component: () => import('@/views' + parentPath + menu.name),
                }
                genRoutes.push(genRoute);
            }
        }
    }
    return [genMenus, genRoutes];
}

/**
 * 获取顶部菜单对应的初始路由
 * @param {Array} menus 菜单数据
 * @returns {Map<String, String>}
 */
function getHeaderRoutes(menus) {
    const headerRoutes = {}

    for (let i = 0; i < menus.length; i++) {
        const menu = menus[i]

        const header = menu.name
        const route = getHeaderRouteFirst(menu.children[0], '/' + header)
        
        headerRoutes[header] = route
    }

    return headerRoutes
}

function getHeaderRouteFirst(menu, path) {
    path += "/" + menu.name;

    if (menu.children) {
        return getHeaderRouteFirst(menu.children[0], path);
    } else {
        return path;
    }
}


/**
 * 获取菜单面包屑
 * @returns {Map<String, Array>}
 */
function getBreadcrumbs(menus) {
    const bcs = {}

    for (let i = 0; i < menus.length; i++) {
        const menu = menus[i];
        getBreadcrumbs2(bcs, menu.children, '/' + menu.name, [menu.desc]);
    }

    return bcs;
}
function getBreadcrumbs2(bcs, menus, key, value0) {
    for (let i = 0; i < menus.length; i++) {
        const menu = menus[i];

        const value = value0.concat([])
        value.push(menu.desc)

        if (menu.children) {
            getBreadcrumbs2(bcs, menu.children, key + '/' + menu.name, value)
        } else {
            bcs[key + '/' + menu.name] = value
        }
    }
}


export default {
    gen,

    getHeaderRoutes,
    getBreadcrumbs,
};
