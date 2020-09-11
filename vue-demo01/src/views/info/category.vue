<template>
    <div id="category">
        <el-button type="danger" @click="addFirst({type:'category_first_add'})">添加一级分类</el-button>
        <hr class="hr" />
        <div>
            <el-row :gutter="20">
                <el-col :span="10">
                    <div class='category-wrap'>
                    <div class="category" v-for="firstItem in category.item" :key="firstItem.id">
                        <!--一级分类-->
                        <h4>
                        <svg-icon icon-class="add"></svg-icon>
                        {{firstItem.category_name}}
                        <div class='button-group'>
                            <el-button size="mini" type="danger" round @click="editCategory({data:firstItem,type:'category_first_edit'})">编辑</el-button>
                            <el-button size="mini" type="success" round>添加子级</el-button>
                            <el-button size="mini" round @click="deleteCategoryConfirm(firstItem.id)">删除</el-button>
                        </div>
                        </h4>
                        <!--子级分类-->
                        <ul v-if="firstItem.children">
                            <li v-for="childrenItem in firstItem.children" :key="childrenItem.id">
                                {{childrenItem.category_name}}
                                 <div class='button-group'>
                                <el-button size="mini" type="danger" round>编辑</el-button>
                                <el-button size="mini" round >删除</el-button>
                                </div>

                            </li>
                            
                        </ul>
                    </div>
                    
                    </div>
                </el-col>
                <el-col :span="14">
                    <h4 class="menu-title">一级分类编辑</h4>
                    <el-form label-width="142px" class="form-wrap" ref="categoryForm">
                    <el-form-item label="一级分类名称" v-if="category_first">
                        <el-input v-model="form.categoryName" :disabled="category_first_disabled"></el-input>
                    </el-form-item>
                    <el-form-item label="二级分类名称" v-if="category_second">
                        <el-input v-model="form.secCategoryName" :disabled="category_second_disabled"></el-input>
                    </el-form-item>
                      <el-form-item>
                        <el-button type="danger" @click="submit" :loading="submit_button_loading" :disabled="submit_button_disabled">确定</el-button>
                    </el-form-item>
                    </el-form>
                </el-col>

            </el-row>


        </div>

    </div>

    
</template>
<script>
import {AddFirstCategory,GetCategory,DeleteCategory,EditCategory} from "@/api/news.js"
export default {
    name:'category',
    data(){
       
        return{
           form:{
               categoryName:'',
               secCategoryName:'',
               },
            category_first:true,
            category_second:true,
        //分类
        //返回的结果是JASON，用数组方式存储
        category:{
            item:[],
            current:[],
        },
        submit_button_loading:false,
        category_first_disabled:true,
        category_second_disabled:true,
        submit_button_disabled:true,
        deleteId:"",
        submit_button_type:"",

                
               
            

        }
    },
   
    methods:{
        //确定按钮事件
        submit(){
            if(this.submit_button_type=='category_first_add'){
                this.addFirstCategory()
            }
            if(this.submit_button_type=='category_first_edit'){
                this.editFirstCategory()
            }
            
        },
        //添加一级分类
        addFirst(params){
            this.submit_button_type=params.type
            this.category_first=true
            this.category_second=false
            this.category_first_disabled=false
            this.submit_button_disabled=false
        },
        //调用一级分类的API
        getCategory(){
            GetCategory({}).then(response=>{
                let data=response.data.data.data
                this.category.item=data
            }).catch(error=>{

            })
        },
        //删除按钮
        deleteCategoryConfirm(category_id){
            this.deleteId=category_id
            this.confirm({
                    content:'确认删除当前信息，删除后将无法恢复',
                    fn:this.deleteCategory,
                    catchFn:()=>{
                        this.deleteId="";
                        
                    }
                })
            
        },
       
        deleteCategory(){
            DeleteCategory({categoryId:this.deleteId}).then(response=>{
            //用数组的splice方法删除，两个参数时候是删除，三个参数的时候是替换或者插入数据
            //splice(1,2,{}/[])
            //splice("指定起始位置"(第一个参数是起始要删除的位置)，2(要删除多小个数据，number值)，第三个参数是要替换成什么)
            //可以用filter过滤数组id不等于我们删除的id并返回一个新数组
            // let newArray=this.category.item.filter(item=>item.id !==this.deleteId)
            // this.category.item=newArray
            //es6方法findIndex(查找数组索引)
            let index=this.category.item.findIndex(item=>item.id==this.deleteId)
             //删除数组指定元素
            this.category.item.splice(index,1)
            }).catch(error=>{

            })
        },
         //编辑按钮
        editCategory(params){
            this.submit_button_type=params.type
            this.category_second=false
            this.category_first_disabled=false
            this.submit_button_disabled=false
            //一级名称输入还原名称
            this.form.categoryName=params.data.category_name
            //存储当前数据对象
            this.category.current=params.data
        },
        editFirstCategory(){
            if(this.category.current.length==0){
                        this.$message({
                            message:'未选择分类！',
                            type:'error'
                        })
                        return false
                    }
            let requestData={
                id:this.category.current.id,
                categoryName:this.form.categoryName
            }
                EditCategory(requestData).then(response=>{
                    let responseData=response.data
                    this.$message({
                        message:responseData.message,
                        type:"success"
                    })
                    let data=this.category.item.filter(item=>item.id==this.category.current.id)
                    data[0].category_name=responseData.data.data.categoryName
                    //清空输入框名称
                    this.form.categoryName='';
                    this.category.current=[];
                }).catch(error=>{

                })
        },
        //type为add方法
        addFirstCategory(){
            
            if(!this.form.categoryName){
                this.$message({
                    message:"分类名称不能为空",
                    type:"error"
                })
                return false;
            }
            //确定按钮加载状态
            this.submit_button_loading=true
          AddFirstCategory({ categoryName:this.form.categoryName })
          .then(response=>{
              let data=response.data
              if(data.resCode===0){
                  this.$message({
                      message:data.message,
                      type:"success",
                  });
                  //push往数组末尾添加数据
                  this.category.item.push(response.data.data)
                  
              }
              this.submit_button_loading=false
              this.form.categoryName=""
              this.form.secCategoryName=""
              
            }).catch(error=>{
                this.submit_button_loading=false
                this.form.categoryName=""
                this.form.secCategoryName=""
                
            })

        }
    
            
            
        
    },
    //DOM挂载完执行，页面DOM元素完成渲染
    mounted(){
        return this.getCategory()
    }
    
    
    
}
</script>
<style lang="scss" scoped>
@import "../../style/config.scss";
.category-wrap{
    div:first-child{
        &:before{
           top:20px; 
        }
    div:last-child{
         &:before{
             bottom:21px
         }
    }    
        
    }
}
.menu-title{
    line-height: 44px;
    background-color: #f3f3f3;
    padding-left: 220px;

}
.category{
    position: relative;
    line-height: 44px;
    cursor: pointer;
    &:before{
            content:'';
            position: absolute;
            left: 22px;
            top:0;
            bottom:0;
            width: 32px;
            border-left:1px dotted #000;

    }
    h4{
        position: relative;
        padding-left: 40px;
    }
    svg{
        position:absolute;
        left: 14px;
        top:15px;
        background-color: #ffffff;
        font-size:17px;
        color:#303133;
    }
    li{
        position: relative;
        list-style: none;
        padding-left: 36px;
        margin-left: 24px;
        &:before{
            content:'';
            position: absolute;
            left: 0;
            top:22px;
            width: 32px;
            border-bottom:1px dotted #000;

        }
    }
    li,h4{
        @include webkit(transition,all .5s ease 0s);
        &:hover{ 
            background-color: #f3f3f3;
            .button-group{display: block;}

            }
    }
}
.button-group{
    display: none;
    position:absolute;
    right:11px;
    z-index: 2;
    top:-1px;
    button{
        font-size:10px;
    }
}
.form-wrap{ width:410px;
            padding-top: 26px;
}
.hr{
    width:calc(100% + 60px);
    margin-left: -30px;
    border:none;
    margin-top:30px;
    margin-bottom:30px;
    border-bottom: 1px solid #e9e9e9;
}
</style>