import Vue from "vue";
import Router from "vue-router";
import Home from "../views/index/index.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "Index",
      component: Home,
      children:[
      {  path: '/user',
        name:"User",
        component:()=>import("../views/user/index")
      },
      //安全设置-首页
      {  path: '/safe',
        name:"Safe",
        component:()=>import("../views/safe/index")
      },
      {  path: '/password',
        name:"Password",
        component:()=>import("../views/safe/password")
      }
      ]
    }
  ]
});
