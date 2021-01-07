import Home from '@v/Home.vue'
import cart from '@v/cart/index.vue'
import cartList from '@v/cartList/index.vue'
import lottery from '@v/lottery/index.vue'

// 使用children实现子路由时  children里面的路由不要加 "/" 不然是以根目录来请求  不好理解   
export const authRoutes = [ // 权限路由
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
            path: 'cart',
            name: 'cart',
            component: cart,
        },
        {
            path: 'cartList',
            name: 'cartList',
            component: cartList,
        },
        {
            path: 'lottery',
            name: 'lottery',
            component: lottery,
        },
        {
            path: 'product',
            name: 'product',
            component: () => import('@v/product/index.vue'),
            children:[
                {
                    path: 'lottery1',
                    name: 'lottery1',
                    component: lottery,
                },
                {
                    path: 'store1',
                    name: 'store1',
                    component: () => import('@v/store/index.vue'),
                }
            ]
        },
        {
            path: 'shop',
            name: 'shop',
            component: () => import('@v/shop/index.vue'),
        },
        {
            path: 'store',
            name: 'store',
            component: () => import('@v/store/index.vue'),
        },
      ],
    },
    {
         path:'*', 
         name:'*',
        component:{ render:h=>h('h1',{},'Not Found') } 
    }
];