<template>
<div id="header-wrap">
   <div class='pull-left header-icon' @click="navMenuState()"><svg-icon iconClass='file' className='file' /></div>
   <div class='pull-right'>
   <div class="user-info pull-left" >
       <img src="" alt="">
       {{username}}
   </div>
   <div class="header-icon pull-left" @click="exit()">
       <svg-icon iconClass='quit' className='quit' /></div>
</div>
</div>
    
</template>
<script>
export default {
    data(){
        return{

        }
    },
    methods:{
        navMenuState(){
            return this.$store.commit('app/SET_COLLAPSE') 
            //dispatch第一个参数是要触发的action的方法名，第二参数对应action方法里面的data
            
        },
        //点击退出
        exit(){
            return this.$store.dispatch('app/exit').then(()=>{
                this.$router.push(
                    {name:'login'}
                )
            })
        }
    },
    computed:{
        username:function(){
            return this.$store.state.app.username
        }
    }
   
    
}
</script>
<style lang="scss" scoped>
@import "../../../style/config.scss";
#header-wrap{
    position: fixed;
    top: 0;
    right: 0;
    left: $navMenu;
    height: 75px;
    background-color: #fff;
    line-height: 75px;
    @include webkit(box-shadow, 0 3px 16px 0 rgba(0,0,0,.1));
    @include webkit(transition,all .3s ease 0s);
}
.open{
    #header-wrap{left:$navMenu ;}
}
.close{
    #header-wrap{left:$navMenuMin;}
}
.header-icon{
    padding:0 32px;
    svg {
        margin-bottom:-8px;
        font-size: 25px;
        cursor: pointer;
        color: gray;
    }
}
.userinfo{
height: 100%;
padding: 0 32px;
border-right: 1px solid #ededed;
+ .header-icon{
    padding: 0 28px;
    }
img{
    display: inline-block;
    margin-bottom: -12px;
    margin-right: 18px;
    border-radius: 50px;
}
}


</style>