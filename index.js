import Http from '@/service/http.js'
import {authRoutes} from '@/router/router-auth.js'
const moduleA = {
    namespaced: true,//使用命名空间
    state: () => ({ 
        // 是否获取过权限
        hasPermission: false,
        // 当前用户所拥有的菜单权限
        menu: [], 
        // 用户所拥有的按钮权限
        btnPermissions:[] ,
        // 用户当前页面的按钮权限
        pagePermissions:[],
        // layout重定向页面path
        redirectPaths:[]
     }),
    mutations: { 
        // 获取过权限标志
        hasPermission_m(state,value){
            state.hasPermission = value;
        },
        // 设置菜单
        menu_m(state,value){
            state.menu = value;
        },
        // 设置按钮
        btnPermissions_m(state,value){
            state.btnPermissions = value;
        },
        // 储存重定向页面
        redirectPaths_m(state,value){
            state.redirectPaths = value;
        },
        // 储存当前页面的按钮权限
        pagePermissions_m(state,page){
            state.pagePermissions = setPagePermission(state.menu,page);
        }
     },
    actions: { 
        // 异步请求用户菜单和按钮权限
        async getPermissions_a({commit,dispath,state}){
            let params = {a:1};
            // 异步请求
            let auths = await Http.interface1(params);
            // test 默认数据  实际开发中是 auths
            let menuList = [
                {pid:-1,name:'购物车',id:1,auth:'cart',
                permissions:[
                    {
                        name:'查询',
                        code:'query'
                    },
                    {
                        name:'退出',
                        code:'out'
                    }
                ]},
                {pid:-1,name:'购物车列表',id:4,auth:'cartList'},
                {pid:-1,name:'彩票',id:5,auth:'lottery',
                permissions:[
                    {
                        name:'编辑',
                        code:'edite'
                    }
                ]},
                {pid:-1,name:'商品',id:6,auth:'product',
                permissions:[
                    {
                        name:'删除',
                        code:'delete'
                    },
                    {
                        name:'导出',
                        code:'export'
                    }
                ]
            },
                {pid:-1,name:'商店',id:2,auth:'shop'},
                {pid:-1,name:'个人中心',id:7,auth:'lottery1'},
                // {pid:-1,name:'个人中心',id:3,auth:'store'},
            ];
            commit('menu_m',menuList);
            let {auth} = getMenListAndAuth(menuList);
            // 将首页添加 和 通配
            auth.push('home');
            auth.push('*');
            // 获取过权限
            commit('hasPermission_m',true);
            return getRoutes(auth);
        },
    }
}
// 获取菜单数据和权限数据
const getMenListAndAuth = (value) => {
    let menu = [];
    let sourceMap = {};
    let auth = [];
    value.forEach(m => {
        m.children = []; // 增加孩子列表
        sourceMap[m.id] = m;
        auth.push(m.auth)
        if(m.pid === -1){
            menu.push(m); // 根节点
        }else{
            sourceMap[m.pid] && sourceMap[m.pid].children.push(m);
        }
    });
    return {menu,auth} // 获取菜单数据和权限数据
}
// 遍历获取路由
const getRoutes = (auth) => {
    const filter = (authRoutes)=>{
        return authRoutes.filter(route=>{
                // 包含权限
            if(auth.includes(route.name)){
                if(route.children){
                    route.children = filter(route.children);
                }
                return true;
            }
        })
    }
    return filter(authRoutes);
}

// 获取当前按钮的权限
const setPagePermission = (menus,pageName) => {
    let pagePermission = []
    for (let i = 0; i < menus.length; i++) {
        if (menus[i].auth===pageName) {
            if (menus[i].permissions) {
                menus[i].permissions.forEach(item => {
                    pagePermission.push({
                        name:item.name,
                        code:item.code
                    });
                });
            }
            break;
        }
    }
    return pagePermission;
}
export default moduleA