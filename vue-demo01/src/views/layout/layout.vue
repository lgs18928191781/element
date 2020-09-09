<template>
<div id="layout" :class="[menuStatus ? 'close' : 'open']">
<LayoutHeader />
<LayoutMain />
<LayoutNav />
</div>
    
</template>
<script>
import LayoutHeader from './Components/Header.vue'
import LayoutMain from './Components/Main.vue'
import LayoutNav from './Components/Nav.vue'
export default {
    name:'layout',
    components:{LayoutHeader,LayoutMain,LayoutNav},
    data(){
       
       
       
        return{
           


        }
    
    },
    computed:{
        menuStatus:function(){
            return this.$store.state.app.isCollapse
        }
}
}
</script>
<style lang="scss" scoped>

</style>