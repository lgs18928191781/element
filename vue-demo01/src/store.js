import Vue from "vue";
import Vuex from "vuex";
import {Login} from "@/api/login.js"
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isCollapse:false,
    isCollapse:JSON.parse(sessionStorage.getItem('isCollapse')) || false
    // count:10
  },
  getters:{
    isCollapse:state=>state.isCollapse
     //computed 如果有做属性计算就用Getters，没有做计算用state
    // count:state=>state.count+10
  },
  mutations: {//同步处理，没有回调
    SET_COLLAPSE(state){
    state.isCollapse=!state.isCollapse
    //html5本地存储
    sessionStorage.setItem('isCollapse',JSON.stringify(state.isCollapse))    
    // SET_COUNT(state,value){
    //   state.count=value
    //   console.log(state.count)
    // }
  }
},
  actions: {//可以回调处理
    setMenuStatus(content,data){
      //content指向state/getters/commit,名字可以随便定
      //可以解构{state/gettters等等}
      content.commit('SET_COLLAPSE')
      //异步请求接口返回数据后接着去做别的事
    },
    login(content,requestData){
      return new Promise((resolve,reject)=>{
        //接口
      Login(requestData).then((response)=>{
        resolve(response)
      }).catch(error =>{
          reject(error)
      })  
      })
    } 
  }
});
