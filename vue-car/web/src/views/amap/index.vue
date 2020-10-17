<template>
<div class="amap-wrap">
<el-amap vid="amapContainer" class="amap-demo" :events="events"></el-amap>
</div>
    
</template>
<script>
import { AMapManager,lazyAMapApiLoaderInstance } from "vue-amap";
export default {

    name:'amap',
    data(){
        return{
            map:null,
            zoom:18,
            // center:[121.59996, 31.197646],
            // amapManager,
            events: {}
        }
    },
    mounted(){
        lazyAMapApiLoaderInstance.load().then(() => {
        // your code ...
        this.map = new AMap.Map('amapContainer', {
            center:[116.404765, 39.918052],
            zoom:this.zoom //初始化地图层级
        });
        });
    }
}
</script>
<style lang="scss" scoped>
.amap-wrap{
    height: 100vh;
}
</style>