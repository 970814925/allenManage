import Cookie from 'js-cookie'
// import router from '../router'
export default {
    namespace:true,
    
    state: {
    //tips:侧边栏是否收缩
        isCollapse: false,
    //tips:生成面包屑的跳转按钮，默认值只有首页
        tabsList: [
            {
                path: '/',
                name: 'home',
                label: '首页',
                icon: 'home'
            }
        ],
    //tips:当前面包屑
        // currentMenu: null,
        menu: []
    },
    mutations: {
        collapseMenu(state) {
            state.isCollapse = !state.isCollapse
        },
        //tips:mutations接收两个参数 一个是state一个是传来的参数
        selectMenu(state, val) {
            if (val.name !== 'home') {
        //tips:如果点的不是home则将高亮改为点的菜单名
                // state.currentMenu = val
        //tips: findIndex处理数组 返回第一个符合条件的元素的下标 如果没有则返回-1
                const result = state.tabsList.findIndex(item => item.name === val.name)
        //tips: 如果点击的菜单没有在面包屑中展示，则添加对应的面包屑
                if (result === -1) {
                    state.tabsList.push(val)
                }
            } else {
        //tips:如果点击页面为首页则重置
                // state.currentMenu = null
            }
        },
        //tips:关闭标签
        closeTag(state, val) {
            const result = state.tabsList.findIndex(item => item.name === val.name)
            state.tabsList.splice(result, 1)
        },
        setMenu(state, val) {
            state.menu = val
            Cookie.set('menu', JSON.stringify(val))
        },
        clearMenu(state) {
            state.menu = []
            Cookie.remove('menu')
        },
        //tips:接收的参数为router实例this.$router   生成对应的路由
        addMenu(state, router) {
            if (!Cookie.get('menu')) {
                return
            }
            const menu = JSON.parse(Cookie.get('menu'))
            state.menu = menu
            const menuArray = []
            menu.forEach(item => {
                if (item.children) {
                    item.children = item.children.map(item2 => {
                        item2.component = () => import(`../views/${item2.url}`)
                        return item2
                    })
                    menuArray.push(...item.children)
                } else {
                    item.component = () => import(`../views/${item.url}`)
                    menuArray.push(item)
                }
            });
            // 路由的动态添加
            console.log(menuArray,'menuArray')
            menuArray.forEach(item => {
                router.addRoute('Main', item)                
            })
        }
    }
}