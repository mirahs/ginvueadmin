import util_menu from "@/util/util_menu";


const state = {
    menus: [], //所有菜单
    routes: [], //所有路由

    headerMenus: {}, //顶部 key 对应的菜单数据
    headerRoutes: {}, //顶部 key 对应的路由数据

    menusAside: [], //左侧菜单
    activeHeader: "", //顶部 key
    breadcrumbs: {}, //菜单面包屑数据
};

const mutations = {
    init(state, userType) {
        const [genMenus, genRoutes] = util_menu.gen(userType)

        state.menus = genMenus
        state.routes = genRoutes

        state.activeHeader = genMenus[0].name

        for (let i = 0; i < genMenus.length; i++) {
            state.headerMenus[genMenus[i].name] = genMenus[i]
        }
        state.headerRoutes = util_menu.getHeaderRoutes(genMenus)

        state.breadcrumbs = util_menu.getBreadcrumbs(genMenus)
    },

    onHeaderTap(state, key) {
        const menu = state.headerMenus[key];
  
        state.activeHeader = key;
        state.menusAside = menu.children;
    },

    onAsideTap(state, key) {
        state.headerRoutes[state.activeHeader] = key;
    }
}

const actions = {
    async init({ commit, rootState }) {
        commit('init', rootState.userInfo.type)
    }
}

const getters = {
    isInit(state) {
        return state.menus.length > 0
    },

    dynamicRoutes(state) {
        return state.routes
    }
}


export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
}
