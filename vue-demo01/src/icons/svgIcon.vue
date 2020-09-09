<template>
    <svg :class="svgClass" aria-hidden="true">
        <use :xlink:href="iconName"></use>
    </svg>
</template>
<script>
export default {
    name:'svgIcon',
    props:['iconClass','className'],
    // props:{
    //     iconClass:{
    //         type:String,
    //         default:'',
    //        },
    //     className:{
    //         type:String,
    //         default:'',
    //     }
        
    // },
    data(props){
        
        return{
            msg:'123',
            

            
        }
    },
    //方法
    methods:{

    },
    //监听属性变化并计算属性
    computed:{
        //计算属性得出最终结果并返回
        iconName:(props)=>`#icon-${props.iconClass}`,
        svgClass:(props)=>{
            if(props.className){
                return `svg-icon ${props.className}`
            }else{
                return `svg-icon`
            }
        }
    },
    
    
   
    
}
</script>
<style lang="scss" scoped>
.svg-icon{
    width: 1em;
    height:1em;
    fill:currentColor;
    color:#fff;
    
    
}
</style>