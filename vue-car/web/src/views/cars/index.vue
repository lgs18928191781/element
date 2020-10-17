<template>
<div class="cars-wrap">
    <div class="cars-swiper-wrap">
        <swiper class="swiper" :options="swiperOption">
        <swiper-slide>
        <CarsItem height="550px"/>
        </swiper-slide>
        <swiper-slide>
        <CarsItem />
        </swiper-slide>
        <swiper-slide>
        <CarsItem />
        </swiper-slide>
         <swiper-slide>
        <CarsItem />
        </swiper-slide>
         <swiper-slide>
        <CarsItem />
        </swiper-slide>
        </swiper>
        <div class="swiper-button-prev" slot="button-prev" ></div>
        <div class="swiper-button-next" slot="button-next"></div>
    </div>
   
    <span @click="user"></span>
</div>
    
</template>
<script>
import CarsItem from "@/components/carsList";
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css';
import Map from "../amap/index";
export default {
    name:'Cars',
     components: {
      Swiper,
      SwiperSlide,
      CarsItem
    },
    data(){
        return{
            swiperOption: {
            slidesPerView: 3,
            spaceBetween: 30,
            navigation:{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
            }
        }
    }
},
    methods:{
        user(){
            this.$router.push({
                name:"User"
            })
        },
        
    }
 
}
</script>
<style lang="scss" scoped>
@import "./index.scss";

</style>