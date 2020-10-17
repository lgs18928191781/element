<template>
    <div>
    <section class="cars-item">
        <header>
            <h4 class="cars-logo">
                <img src="../../assets/cars-logo.png">
                <span class="name">TESLA Model3</span>
            </h4>
            <p class="cars-attr">新能源汽车  5座</p>
        </header>
        <div class="cars-content">
            <div class="info">
                <div>
                    <div class="car-number">粤B77777</div>
                    <div>
                        <ul class="car-electric">
                        <li class="active"></li>
                        <li class="active"></li>
                        <li class="active"></li>
                        <li class="active"></li>
                        <li class="active"></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                    <p class="distance">
                        <sub>约</sub>
                       <strong>600</strong>
                        <sub>KM</sub>
                    </p>
                    </div>  
                </div>
            </div>
            <img src="../../assets/pic001.png">
        </div>
        <footer>
            <a href="javascript:void(0);" class="cars-park">某某停车场</a>
        </footer>
    </section>  
    <section class="cars-item cars-detailed" :style="'height:' + height">
        <div class="scroll">
        <div class="column">某某停车场
        <i class="close"></i>
        </div>
       <header>
            <h4 class="cars-logo">
                <img src="../../assets/cars-logo.png">
                <span class="name">TESLA Model3</span>
            </h4>
            <p class="cars-attr">新能源汽车  5座</p>
        </header>
        <img src="../../assets/pic001.png" style="width:100%">
            <div class="clearfix">
                <div class="pull-left fs-24">粤B77777</div>
                 <p class="distance pull-right">
                    <sub>约</sub>
                    <strong>600</strong>
                    <sub>KM</sub>
                </p>
            </div>    
            <div class="cars-electric-box">
                <div class="p-r">
                    <span class="e-high" style="width:80%;"></span>
                    <span class="e-bg"></span>
                </div>
            </div> 
            <p class="info $color-main text-center fs-12">
                取车约支付12.0元停车费，实际补贴12.0元
            </p>
            <ul class="cars-type-list">
                <li class="current">
                    <div class="name">日租车</div>
                    <span class="price">￥300/1天</span>
                </li>
                <li>
                    <div class="name">日租车</div>
                    <span class="price">￥300/1天</span>
                </li>
                <li>
                    <div class="name">日租车</div>
                    <span class="price">￥300/1天</span>
                </li>
                <li>
                    <div class="name">日租车</div>
                    <span class="price">￥300/1天</span>
                </li>
            </ul>
            <div class="clause-dec">
                <span class="pull-left fs-12">参保《全面保障服务》用车更放心</span>
                <i class="current"></i>
            </div>
            </div>
            <a href="javascript:void(0);" class="select-car-btn">预约用车</a>
    </section>
    </div>
</template>
<script>
export default {
    name:"CarList",
    props:{
        height:{
            type:String,
            defalut:'257px',
        }
    }
}
</script>
<style lang="scss" scoped>
@import "./index.scss";
</style>