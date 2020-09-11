<template>
    
    <el-dialog title="新增" :visible.sync="dialog_info_flag" @close="close" width="580">
         <el-form :model="form">
           <el-form-item label="类型" :label-width="formLabelWidth">
            <el-select v-model="form.region" placeholder="请选择类型">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="标题" :label-width="formLabelWidth">
          <el-input v-model="form.name" placeholder="请输入标题"></el-input>
          </el-form-item>
          
           <el-form-item label="概况" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="form.name" placeholder="请输入内容"></el-input>
          </el-form-item>
      </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @close="close">取消</el-button>
            <el-button type="danger" @click="dialogFormVisible = false">确定</el-button>
          </div>
    </el-dialog>
    
    
</template>
<script>
export default {
    name:'dialogInfo',
    data(){
        
        return{
          dialog_info_flag:false,
          //表单数据
          form: {
            name: '',
            region: '',
            date1: '',
            date2: '',
            delivery: false,
            type: [],
            resource: '',
            desc: ''
        },
            formLabelWidth:"70px",
            }
        },
    methods:{
        close(){
              this.dialog_info_flag=false,
              // this.$emit("updata:flag",false);
              this.$emit("close",false)
                // this.$emit('close',false) //emit调的是父组件的@close方法 
                //回调时如果需要处理逻辑，则不能用修饰器，反之则可以
            }
    },
    //父组件往子组件传值是单向数据流，不能反向修改
    props:{ //props中的数据只读，无法重新赋值，data中数据可读可写
       flag:{
         type:Boolean,
         defalut:false
       }
    },
    watch:{
        flag:{
            handler(newValue,oldValue){
              this.dialog_info_flag=newValue
              
            },
            
        }
    },
    
    
}
</script>
<style lang="scss" scoped>

</style>