<template>
<div class="user-container">
   <div class="user-info">
       <img src="../../assets/face.png">
       <div class="meta">
           <div class="name">172674108@qq.com</div>
           <span>
               文明驾驶分
               <strong>0</strong>
           </span>
       </div>
   </div>
    <ul class="groud-links">
        <router-link to="aa" tag="a" class="arrow">
            <i class="icon icon-acount"></i>
            我的账户
        </router-link>
        <router-link to="aa" tag="a" class="arrow">
            <i class="icon icon-dingdan"></i>
            租车订单
        </router-link>
        <router-link to="aa" tag="a" class="arrow">
            <i class="icon icon-shiming"></i>
            实名认证
        </router-link>
        <router-link to="/safe" tag="a" class="arrow">
            <i class="icon icon-anquan"></i>
            安全设置
        </router-link>
        <router-link to="aa" tag="a" class="arrow">
            <i class="icon icon-bangzhu"></i>
            帮助中心
        </router-link>
    </ul>
    <button class="logout">登出</button>
</div>
    
</template>
<script>

export default {
    name:'User',
    data(){
        return{
           
        }
    },
 
}
</script>
<style lang="scss" scoped>
@import "./index.scss";
.logout{
    position: absolute;
    left: 50%;
    margin-left: -75px;
    width: 130px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    color: #fff;
    background-color:#2d3339 ;
    font-size: 18px;
    border-radius:100px ;
    border: none;
    outline: none;
    bottom: 30px;
}
</style>