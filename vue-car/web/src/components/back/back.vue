<template>
    <div class="header-back">
        <div class="back">
            <i class="icon"></i>
           <div class="title">{{column}}</div>
        </div>
        
    </div>
</template>
<script>
export default {
    name:"Back",
    props:{
        column:{
            type:String,
            default:''
        }
    },
    data(){
        return{

        }
    }
}
</script>
<style lang="scss" scoped>
.header-back{
    position: relative;
    padding-bottom:147px ;
}
.back{
    position: absolute;
    top:21px;
    left: 0;
    right: 0;
    height: 40px;
    line-height: 40px;
}
.title{
    font-size: 16px;
    margin-left: 33px;
    color: #fff;  
}
.icon{
    width: 40px;
    height: 40px;
    position: absolute;
    left: 0;
    top: 0;
    
    &:before{
        content: '';
        position: absolute;
        left: 12px;
        top: 12px;
        display: block;
        width: 12px;
        height: 12px;
        cursor: pointer;
        border-left: 2px solid $color-blur;
        border-top: 2px solid $color-blur;
        @include webkit(transform,rotate(-45deg));
    }
}
</style>