<template>
<div>
    
        <el-row :gutter="14">
            <el-col :span="4">
                <div class="label-wrap category">
                    <label for="">分类：</label>
                    <div class="wrap-content">
                        <el-select v-model="category_value" placeholder="请选择" style="width:100%;">
                        <el-option
                        v-for="item in options.category"
                        :key="item.id"
                        :label="item.category_name"
                        :value="item.id">
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
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd HH:mm:ss"
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
                <el-button type="danger" style="width:100%;" size='medium' @click="search">搜索</el-button>
            </el-col>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="2">
                <el-button type="danger" class="pull-right" style="width:100%;" size='medium' @click='dialogInfo=true'>新增</el-button>
            </el-col>           
    </el-row>

    <!--表格数据-->
    <div class="black-space-30"></div>
    <el-table :data="table_data.item" border style="width: 100%" v-loading="loadingData" @selection-change="handleSelectionChange">
    <el-table-column type="selection" width="45"></el-table-column>
    <el-table-column prop="title" label="标题" width="450"></el-table-column>
    <el-table-column prop="categoryId" label="类型" width="150" :formatter="toCategory"></el-table-column>
    <el-table-column prop="createData" label="日期" width="250" :formatter="toDate"></el-table-column>
    <el-table-column prop="user" label="管理员" width="100"></el-table-column>
    <el-table-column label="操作">
        <template slot-scope="scope">
            <el-button type='danger' size='small' @click="deleteItem(scope.row.id)">删除</el-button>
            <el-button type='success' size='small' @click='editInfo(scope.row.id)'>编辑</el-button>
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
            :total="total"
            :page-sizes="[10,20,30,40]"
            @size-change="handleSizeChange()"
            @current-change="handleCurrentChange()">
        </el-pagination>
        </el-col>
    </el-row>


    
    <!--新增弹窗-->
    <DialogInfo :flag.sync="dialogInfo" :category="this.options.category" />
     <!--编辑弹窗-->
    <DialogEditInfo :flag.sync="dialogInfoEdit"  :id='infoId' :category="this.options.category" @getList='getList' />
    
</div>
    
</template>
<script>
import DialogInfo from './dialog/dialog.vue'
import DialogEditInfo from './dialog/edit.vue'
import{GetCategory,GetList,DeleteInfo} from '@/api/news.js'
import {timestampToTime} from '@/util/common.js'


export default {
    name:'infoIndex',
    components:{DialogInfo,DialogEditInfo},
   
    data(){
      
        return{
        dialogInfo:false,
        dialogInfoEdit:false,
        //搜索ID
        search_key:'id',
        //类型
        category_value: '',
        //日期
        data_value:'',
        //搜索关键字
        search_keyWord:'',

        //数据
        options: {
            category:[],
        },

        //表格数据
        table_data: {
            item:[]
        },
        loadingData:false,
        //页码
        total:0,
        page:{
            pageNumber:1,
            pageSize:10,
        },

        //搜索关键字
        search_option:[
            {value:"id",label:"ID"},
            {value:"title",label:"标题"},
        ],
        //删除
        deleteInfoId:'',
        infoId:'',
        

        }
    },
    methods:{
        //选择页码数量
        handleSizeChange(val){
            this.page.pageSize=val
        },
        //当前页码
        handleCurrentChange(val){
            this.page.pageNumber=val
            this.getList()
        },
        // closeDialog(){
        //      this.dialogInfo=false
        // },
        //删除数据
        deleteItem(id){
            this.deleteInfoId=[id]
                this.confirm({
                    content:'确认删除当前信息，删除后将无法恢复',
                    fn:this.confirmDelete
                }
                )
        },
        deleteAll(){
            if(!this.deleteInfoId || this.deleteInfoId.length ==0){
                this.$message({
                    message:'请选择要删除的数据！',
                    type:'error'
                })
                return false;
            }
                this.confirm({
                    content:'确认删除全部选中信息，删除后将无法恢复',
                    fn:this.confirmDelete
                })
                
        },
        //确认删除
        confirmDelete(){
            DeleteInfo({id:this.deleteInfoId}).then(response=>{
                this.deleteInfoId='';
                this.getList()
            })
        },
   
        // 获取分类
        getCategory(){
            GetCategory({}).then(response=>{
                let data=response.data.data.data
                this.options.category=data
            }).catch(error=>{

            })
        },
        formatData(){
            let requestData={
                pageNumber:this.page.pageNumber, 
                pageSize:this.page.pageSize
            };
            //分类ID
            if(this.category_value){
                requestData.categoryId=this.category_value
            }
            //日期
            
            if(this.data_value.length>0){
                requestData.startTiem=this.data_value[0]
                requestData.endTime=this.data_value[1]   
            }
            //关键字 search_key
            if(this.search_keyWord){
                requestData[this.search_key] = this.search_keyWord
            }
            

            return requestData;

        },
        //搜索
        search(){
            let requestData=this.formatData()
            this.getList()
        },
        //获取列表
        getList(){
        //单独处理数据
            let requestData=this.formatData();
        
            this.loadingData=true
            GetList(requestData).then(response=>{
                
                let data=response.data.data
                //更新数据
                this.table_data.item=data.data
                //统计页码数量
                this.total=data.total
                //加载状态
                this.loadingData=false
            }).catch(error=>{
                this.loadingData=false
            })
        },
        
        toDate(row){
            return timestampToTime(row.createDate)
        },
        toCategory(row){
            //调用一个函数，返回一个新值替换原始值
            let category=row.categoryId;
            
            let categoryData = this.options.category.filter(item=>item.id==row.categoryId)[0]
            // return categoryData.category_name
            return categoryData.category_name
            
        },
        handleSelectionChange(val){
            let id=val.map(item=>item.id);
            this.deleteInfoId=id

        },
        //编辑
        editInfo(id){
            this.infoId=id
           
            this.dialogInfoEdit=true;
        }
     },
    
    
    mounted(){
        //获取分类
       return this.getCategory();
       
       //获取列表
    //    return this.getList();
    //    return this.$store.dispatch('common/getInfoCategory').then(response=>{
    //    })      
    },
    created(){
        return this.getList();
        
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