<template>
<div>
    
        <el-row :gutter="14">
            <el-col :span="4">
                <div class="label-wrap category">
                    <label for="">类型：</label>
                    <div class="wrap-content">
                        <el-select v-model="category_value" placeholder="请选择" style="width:100%;">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                        </el-select> 
                    </div>
                </div>

            </el-col>
            <el-col :span="7">
                <div class="label-wrap data">
                    <label for="">日期:&nbsp;&nbsp;</label>
                    <div class="wrap-content">
                        <el-date-picker
                        style="width:100%"
                        v-model="data_value"
                        type="datetimerange"
                        align="right"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :default-time="['12:00:00', '08:00:00']">
                    </el-date-picker> 
                    </div>
                </div>
                
            </el-col>
            <el-col :span="4">
                <div class="label-wrap key-word">
                    <label for="">关键字:&nbsp;</label>
                    <div class="wrap-content">
                        <el-select v-model="search_key" style="width:100%;">
                        <el-option v-for="item in search_option" 
                        :key="item.value"
                        :value="item.value"
                        :label="item.label">
                        </el-option>
                    </el-select> 
                    </div>
                </div>
                
            </el-col>
            <el-col :span="3">
                <el-input v-model="search_keyWord" placeholder="请输入内容" style="width:100%;"></el-input>
            </el-col>
            <el-col :span="2">
                <el-button type="danger" style="width:100%;" size='medium'>搜索</el-button>
            </el-col>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="2">
                <el-button type="danger" class="pull-right" style="width:100%;" size='medium' @click='dialogInfo=true'>新增</el-button>
            </el-col>           
    </el-row>

    <!--表格数据-->
    <div class="black-space-30"></div>
    <el-table :data="table_data" border style="width: 100%">
    <el-table-column type="selection" width="45"></el-table-column>
    <el-table-column prop="title" label="标题" width="450"></el-table-column>
    <el-table-column prop="category" label="类型" width="150"></el-table-column>
    <el-table-column prop="data" label="日期" width="250"></el-table-column>
    <el-table-column prop="user" label="管理员" width="100"></el-table-column>
    <el-table-column label="操作">
        <template slot-scope="scope">
            <el-button type='danger' size='small' @click="deleteItem()">删除</el-button>
            <el-button type='success' size='small' @click='dialogInfo=true'>编辑</el-button>
        </template>
    </el-table-column>
    </el-table>
    <div class="black-space-30"></div>

    <!--底部分页-->
    <el-row>
        <el-col :span='12'>
            <el-button size='medium' @click="deleteAll()">批量删除</el-button>
        </el-col>
        <el-col :span="12">
            <el-pagination class="pull-right" 
            background 
            layout="total,sizes,prev,next,pager,jumper" 
            :total="1000"
            :page-sizes="[100,200,300,400]"
            @size-change="handleSizeChange()"
            @current-change="handleCurrentChange()">
        </el-pagination>
        </el-col>
    </el-row>


    
    <!--新增弹窗-->
    <DialogInfo :flag.sync="dialogInfo" @close="closeDialog" />
</div>
    
</template>
<script>
import DialogInfo from './dialog/dialog.vue'

export default {
    name:'infoIndex',
    components:{DialogInfo},
   
    data(){
        
        return{
        dialogInfo:false,
        //搜索ID
        search_key:'id',
        //类型
        category_value: '',
        //日期
        data_value:'',
        //搜索关键字
        search_keyWord:'',

        //数据
        options: [{
          value: '选项1',
          label: '国际信息'
        }, {
          value: '选项2',
          label: '国内信息'
        }, {
          value: '选项3',
          label: '行业信息'
        }, 
        ],

        //表格数据
        table_data: [
        {
          title: '2016-05-02',
          category: '王小虎',
          data: '上海市普陀区',
          user:'管理员',
        }, 
        {
          title: '2016-05-02',
          category: '王小虎',
          data: '上海市普陀区金沙江路 1518 弄',
          user:'管理员',
        }, 
        {
          title: '2016-05-02',
          category: '王小虎',
          data: '上海市普陀区金沙江路 1518 弄',
          user:'管理员',
        }, 
        {
          title: '2016-05-02',
          category: '王小虎',
          data: '上海市普陀区金沙江路 1518 弄',
          user:'管理员',
        }
        ],

        //搜索关键字
        search_option:[
            {value:"id",label:"ID"},
            {value:"title",label:"标题"},
        ],
        

        }
    },
    methods:{
        handleSizeChange(val){

        },
        handleCurrentChange(val){

        },
        closeDialog(){
            return this.dialogInfo=false
        },
        deleteItem(){
                this.confirm({
                    content:'确认删除当前信息，删除后将无法恢复',
                    fn:this.confirmDelete
                }
                )
        },
        deleteAll(){
                this.confirm({
                    content:'确认删除全部选中信息，删除后将无法恢复',
                    fn:this.confirmDelete
                })
                
        },
        confirmDelete(){
            
        }

       
        
      
        
       
       },
    computed:{
        
    },

}
        
            
            
          
        

    
    

</script>
<style lang="scss" scoped>
@import "@/style/config.scss";
.label-wrap{
    &.category{@include labelDom(left,60,40);}
    &.data{@include labelDom(right,93,40);}
    &.key-word{@include labelDom(right,99,40);}


    

}

</style>