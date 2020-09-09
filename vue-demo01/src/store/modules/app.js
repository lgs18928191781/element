import {Login} from "@/api/login";
import {setToKen,setUserName,getUserName,removeToKen,removeUserName} from "@/util/app.js"
const state={
        isCollapse: false,
        isCollapse: JSON.parse(sessionStorage.getItem('isCollapse')) || false,
        to_ken:'',
        username:getUserName() || '',
        // count:10
    }
const getters={
        isCollapse: state => state.isCollapse,
        
        //computed 如果有做属性计算就用Getters，没有做计算用state
        // count:state=>state.count+10
    }
const mutations= {//同步处理，没有回调
        SET_COLLAPSE(state) {
            state.isCollapse = !state.isCollapse
            //html5本地存储
            sessionStorage.setItem('isCollapse', JSON.stringify(state.isCollapse))
            // SET_COUNT(state,value){
            //   state.count=value
            //   console.log(state.count)
            // }
            },
            SET_TOKEN(state,value){
                state.to_ken=value
        },
            SET_USERNAME(state,value){
                state.username=value
            },
            
    }
const actions= {//可以回调处理
        setMenuStatus(content, data) {
            //content指向state/getters/commit,名字可以随便定
            //可以解构{state/gettters等等}
            content.commit('SET_COLLAPSE')
            //异步请求接口返回数据后接着去做别的事
        },
        login(content, requestData) {
            return new Promise((resolve, reject) => {
                //接口
                Login(requestData).then((response) => {
                    let data=response.data.data
                    //普通方式
                    content.commit('SET_TOKEN',data.token);
                    content.commit('SET_USERNAME',data.username);
                    setToKen(data.token);
                    setUserName(data.username);
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        exit({ commit }){
            return new Promise((resolve, reject)=>{
                
                removeToKen();
                removeUserName();
                commit('SET_TOKEN','');
                commit('SET_USERNAME','');
                resolve();

            })
            
            
        }


    }

    export default{
        namespaced:true,
        state,
        getters,
        mutations,
        actions
    };

