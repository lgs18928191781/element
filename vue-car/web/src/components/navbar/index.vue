<template>
    <div class="navbar">
        <ul>
            <li><i class="icon icon-help icon-w-44"></i></li>
            <li><i class="icon icon-help icon-w-44"></i></li>
            <li> 
                <a href="javascript:void(0);" class="select-car-btn">选择车辆</a>
            </li>
            <li><i class="icon icon-help icon-w-44"></i></li>
            <li><i class="icon icon-help icon-w-44" @click="toUser"></i></li>
        </ul>
    </div>
</template>
<script>
export default {
    name:"Navbar",
    methods:{
        toUser(){
            this.$router.push({
                name:"User"
            })
        },
    }
}
</script>
<style lang="scss" scoped>
.navbar{
    position: fixed;
    left: 0;
    right: 0;
    bottom: 86px;
    z-index: 10;
    text-align: center;
    li{
        display: inline-block;
    }
    .icon{
        vertical-align: middle;
        margin: 0 17px;
        cursor: pointer;
        background-color:$color-main;
        border-radius:100px ;
    }
}

</style>