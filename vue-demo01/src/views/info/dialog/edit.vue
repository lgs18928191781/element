<template>
    
    <el-dialog title="编辑" :visible.sync="dialog_info_flag" @close="close" width="580" @opened="openDialog">
         <el-form :model="form" ref="addInfoForm">
           <el-form-item label="类型" :label-width="formLabelWidth">
            <el-select v-model="form.categoryId" placeholder="请选择活动区域">
              <el-option v-for="item in categoryOption.item" 
              :key="item.id" 
              :label="item.category_name"
              :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="标题" :label-width="formLabelWidth">
          <el-input v-model="form.title" placeholder="请输入标题"></el-input>
          </el-form-item>
          
           <el-form-item label="概况" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="form.content" placeholder="请输入内容"></el-input>
          </el-form-item>
      </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="close">取消</el-button>
            <el-button type="danger" @click="submit()" :loading="submitLoading">确定</el-button>
          </div>
    </el-dialog>
    
    
</template>
<script>
import {AddInfo,GetList,EditInfo} from "@/api/news.js";
export default {
    name:'DialogInfo',
    data(props){
        
        return{
          dialog_info_flag:false,
          //表单数据
          form: {
            categoryId:'',
            title:'',
            content:'',
        },
            categoryOption:{
              item:[]
            },
            formLabelWidth:"70px",
            submitLoading:false
            }
        },
    methods:{
        close(){
              this.dialog_info_flag=false,
              this.resetForm()
              // this.$emit("updata:flag",false);
              this.$emit("update:flag",false)
                // this.$emit('close',false) //emit调的是父组件的@close方法 
                //回调时如果需要处理逻辑，则不能用修饰器，反之则可以
            },
        openDialog(){
                let _this=this;
                let props={..._this._props};
                this.categoryOption.item=props.category
                 this.getInfo()
              
        },
        getInfo(){
            let _this=this;
            let props={..._this._props};
            let requestData={
                pageNumber:1,
                pageSize:1,
                id:props.id,
            }
            GetList(requestData).then(response=>{
                let requestData=response.data.data.data[0]
                this.form={
                    categoryId:requestData.categoryId,
                    title:requestData.title,
                    content:requestData.content,
                }
                
                })
        },
        submit(){
                let _this=this;
                let props={..._this._props};
                let requestData={
                id:props.id,
                categoryId:this.form.categoryId,
                title:this.form.title,
                content:this.form.content,
            
              }
              if(!this.form.categoryId){
                   this.$message({
                      message: "分类不能为空",
                      type:"error",
                 })
                 return false;
                 }
                this.submitLoading=true
               EditInfo(requestData).then(response=>{
                 let data=response.data
                 this.$message({
                      message: data.message,
                      type:'success',
                 })
                 this.submitLoading=false
                 //刷新数据方式
                 //1.暴力刷新(调父组件的方法)
                 this.$emit("getList");
                 //2.返回列表，手动修改指定数据
                 //重置表单
                //  this.$refs["addInfoForm"].resetFields();
                      // this.resetForm()
               }).catch(error=>{
                 this.submitLoading=false
               })
        },
        resetForm(){
          
          this.form.categoryId=''
          this.form.title=''
          this.form.content=''
        }
    },
    mounted(){
      // let _this=this;
      // let props={..._this._props};
      return this.openDialog()
      return this.resetForm()
      
    },
    
    //父组件往子组件传值是单向数据流，不能反向修改
    props:{ //props中的数据只读，无法重新赋值，data中数据可读可写
       flag:{
         type:Boolean,
         defalut:false
       },
       category:{
         type:Array,
         defalut:()=>[]
       },
        id:{
         type:String,
         defalut:" ",
       }
    },
    watch:{
        flag:{
            handler(newValue,oldValue){
              this.dialog_info_flag=newValue             
            },           
        },
        
        }
          
        
       

        
    
    
    
}
</script>
<style lang="scss" scoped>

</style>