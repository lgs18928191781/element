import router from "./index";
import store from "@/store/index.js";
import {getToken,removeToKen,removeUserName} from '@/util/app.js'

const whiteRouter=['/login']; //indexOf方法判断数组中是否存在指定某个对象,如果不存在则返回 -1
//路由守卫
router.beforeEach((to,from,next)=>{
    // console.log(to) //to index页面
    if(getToken()){
        if(to.path ==='/login'){
            removeToKen();
            removeUserName();
            store.commit("app/SET_TOKEN",'');
            store.commit("app/SET_USERNAME",'');
            next();
        }else{
            //获取用户角色
            //动态分配路由权限
            next();
        }
        
        
        console.log('存在')
        /**
         * 1.to=/console
         * 2.to=/index
         */
    }else{
         //路由指向重新执行路由守卫，
        //  console.log("不存在");
        if(whiteRouter.indexOf(to.path) !== -1){ //存在执行next
                next(); //to 
         }else{
                next('/login') //路由指向指向beforeEach
         }
    }
}
)
// to 要进入的页面
// from 离开之前的上一个页面
 //不带参数会执行to 如果带参数就会执行beforeEach(死循环执行)
//通过token来设置权限



/**
 * 1.直接进入index时候，参数的to被改变成"/index"触发路由指向，就会跑beforeEach
 * 2.再一次next指向了login，再次发生路由指向，又会跑beforeEach,参数的to被改变成"/login"
 * 3.进入白名单判断存在，则直接执行next（），因为没有参数，所以不会再跑beforeEach
 */