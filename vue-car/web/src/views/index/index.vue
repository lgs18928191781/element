<template>
<div>
    <!--地图-->
    <Map />
    <!--cars data渲染-->
    <!-- <Cars /> -->
    <!--导航-->
    <Navbar />
    <!--会员-->
    <div id="children-view" :class="{open:show}">
       <router-view />
    </div>
    <!--login-->
    <Login />

</div>
    
</template>
<script>
import Map from "../amap/index";
import Cars from "../cars/index";
import Navbar from "@/components/navbar/index";
import Login from "./login.vue";
export default {
    name:'Index',
    components:{Map,Cars,Navbar,Login},
    data(){
        return{
        
        }
    },
    computed:{
        show(){
            const router=this.$route;
            return router.name==='Index' ? false : true;
            
        }
    },
    mounted(){
        document.addEventListener('mouseup',(e)=>{
            const userCon=document.getElementById('children-view');
            if(userCon && !userCon.contains(e.target)){
                    this.$router.push({
                        name:'Index'
                    })
                }
        })
    },
    watch:{
        
    }
 
}
</script>
<style lang="scss" scoped>
#children-view{
    position: fixed;
    top: 0;
    bottom: 0;
    right: -600px;
    width: 410px;
    background-color: #34393f;
    z-index: 101;
    @include webkit(transition,all .3s ease 0s);
    @include webkit(box-shadow,-5px 0 38px 0 rgba(0,0,0,.4));
    &.open{
        right: 0px;
    }
}
</style>