import axios from "axios"
import { Message } from 'element-ui';
const BASEURL=process.env.NODE_ENV === 'production' ? '' : '/devApi';
const service = axios.create({
  baseURL: BASEURL, //http://www.web-jshtml.cn/productApi/devApi/ 在config.js中遇到devApi会替换成空串
  timeout: 10000,
});

// 添加请求拦截器
//请求接口前做一些数据处理
service.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    //后端需要前端这边传相关的参数
    //token,userId,SID
    //config.headers['Token']="",最后return出去
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
//请求接口后，返回数据进行拦截
service.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    let data=response.data
    if(data.resCode!== 0){
      Message.error(data.message);
      return Promise.reject(data);
    }else{
      return response;
    }

  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });
  
  export default service;