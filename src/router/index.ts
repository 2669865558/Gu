import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";


const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import("@/views/Home.vue"),
        meta:{ title:"首 页888" ,icon:"HomeFilled",show:true,useFrame:true}
    },
 
    {
        path: '/venue',
        name: 'venue',
        component: () => import("@/views/venue/Index.vue"),
        meta:{ title:"场所管理" ,icon:"OfficeBuilding",show:true,useFrame:true},
        children: [
     
            {
                path: '/venue/add',
                name: 'venue-add',
                component: () => import("@/views/venue/Add.vue"),
                meta:{ title:"添加场所",icon:"LocationFilled" ,show:true,useFrame:true},
             },
            {
               path: "/venue/list",
               name: 'venue-list',
               component: () => import("@/views/venue/List.vue"),
               meta:{ title:"场所列表",icon:"Guide",show:true ,useFrame:true},
            },{
                path: "/venue/edit",
                name: 'venue-edit',
                component: () => import("@/views/venue/Edit.vue"),
                meta:{ title:"场所修改",icon:"Guide",show:false ,useFrame:true},
            },
      
        ]
    },
    {
        path: '/person',
        name: 'person',
        component: () => import("@/views/person/Index.vue"),
        meta:{ title:"人员管理" ,icon:"User",show:true,useFrame:true},
        children: [
            {
                path: '/person/add',
                name: 'person-add',
                component: () => import("@/views/person/Add.vue"),
                meta:{ title:"添加人员",icon:"CirclePlus" ,show:true,useFrame:true},
            },
            {
                path: "/person/list",
                name: 'person-list',
                component: () => import("@/views/person/List.vue"),
                meta:{ title:"人员列表",icon:"Operation",show:true ,useFrame:true},
            },
            {
                path: "/person/edit",
                name: 'person-edit',
                component: () => import("@/views/person/Edit.vue"),
                meta:{ title:"人员修改",icon:"Guide",show:false ,useFrame:true},
            },
            {
                path: "/person/face",
                name: 'person-face',
                component: () => import("@/views/person/Face.vue"),
                meta:{ title:"人脸采集",icon:"Guide",show:false ,useFrame:true},
            },

        ]
    },

]


const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router