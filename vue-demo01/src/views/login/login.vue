<template>
    <div id="login">
    <div class="login-wrap">
        <ul class="menu-tab">
            <li v-for="item in menuTab" :key="item.id" :class="{'current': item.current}" @click="toggle(item)">{{item.txt}}</li>
        </ul>
        <!--表单-->
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="login-form" size="medium">
            
        <el-form-item prop="username" class="item-form">
        <label>用户名</label>
        <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item prop="password" class="item-form">
        <label>密码</label>
        <el-input type="password" v-model="ruleForm.password" autocomplete="off" minlength="6" maxlength="20"></el-input>
        </el-form-item>

         <el-form-item prop="passwords" class="item-form" v-show="model==='register'">
        <label>重复密码</label>
        <el-input type="password" v-model="ruleForm.passwords" autocomplete="off" minlength="6" maxlength="20"></el-input>
        </el-form-item>

        <el-form-item prop="code" class="item-form">
        <label>验证码</label>
        <el-row :gutter="10">
        <el-col :span="15">
            <el-input v-model="ruleForm.code" minlength="6" maxlength="6"></el-input>
        </el-col>
        <el-col :span="9">
            <el-button type="success" class="block" @click="getsms()" :disabled='codeButtonStatus.status'>{{codeButtonStatus.text}}</el-button>
        </el-col>
        </el-row>
        
        </el-form-item>

        <el-form-item>
        <el-button type="danger" @click="submitForm('ruleForm')" class="login-btn block" :disabled='loginButtonStatus'>{{model==="login" ? "登录" : "注册"}}</el-button>
        </el-form-item>
        </el-form>    
    </div>
    </div>
</template>
<script>
import sha1 from 'js-sha1'
import {GetSms,Regisiter,Login} from "@/api/login.js"
import{stripscript} from "@/util/filtter.js"
export default{
    name:"login",
    data(){
        //验证验证码
        var validateCode = (rule, value, callback) => {
        if (value==='') {
          return callback(new Error('请输入验证码'));
        }else{
            callback();
        }
        };
      
      //用户名验证
      var validateUsername = (rule, value, callback) => {
        let reg = /^[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*\.[a-z]{2,}$/;
        if (value === '') {
          callback(new Error('请输入用户名'));
        } 
        else if(!reg.test(value)){
          callback(new Error('用户名格式有误'));
          }else{
              callback();
          }
        };
      //密码验证
      var validatePassword = (rule, value, callback) => {
        this.ruleForm.password=stripscript(value);
        value=this.ruleForm.password;
          let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if (!reg.test(value)) {
          callback(new Error('密码为6-20位数字+字母'));
        } else {
          callback();
        }
      };
      //再次输入密码
      var validatePasswords = (rule, value, callback) => {
        //如果model是login，就放行
        if(this.model==='login'){callback()}
        this.ruleForm.passwords=stripscript(value);
        value=this.ruleForm.passwords;
          let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value!=this.ruleForm.password) {
          callback(new Error('您输入密码与第一次密码不相符'));
        } else {
          callback();
        }
      };

        return{
        menuTab:[
            {txt:'登录', current:true, type:"login"},
            {txt:'注册', current:false, type:"register"}
            ],
            //切换注册登录
            model:'login',
            //登录按钮禁用
            loginButtonStatus:true,
            //验证码按钮禁用
            codeButtonStatus:{
                status:false,
                text:'获取验证码'
        
            },
            //倒计时计数
            timer:null,
            //表单数据
            ruleForm: {
                    username: '',
                    password: '',
                    passwords:'',
                    code: ''
          },
            rules: {
              username: [
                { validator: validateUsername, trigger: 'blur' }
              ],
              password: [
                { validator: validatePassword, trigger: 'blur' }
              ],
              passwords: [
                { validator: validatePasswords, trigger: 'blur' }
              ],
              code: [
                { validator: validateCode, trigger: 'blur' }
              ]
            }
          };
        },
        created(){
            

        },
        //挂载完成
        mouted(){
          
        },
        //方法
        methods: {
            //获取验证码
            getsms(){
                //修改获取验证码按钮状态
                this.codeButtonStatus.status=true
                this.codeButtonStatus.text='发送中'
                
                //获取验证码前判断
                if(this.ruleForm.username==""){
                this.$message.error('用户不能为空');
                    return false
                }
                return GetSms({username:this.ruleForm.username,module:this.model})
                .then(response=>{
                    let data=response.data
                    this.$message({
                    message: data.message,
                    type: 'success'
                })
                console.log(data)
                //启动登录注册按钮
                this.loginButtonStatus=false
                //调定时器
                this.countDown(5)

                    
                }).catch(error=>{
                    console.log(error)
                })
            },
            
            //切换注册登录
            toggle(data){
            this.menuTab.forEach((elem,index) => {
            elem.current= false   
            });
            //高光
            data.current=true
            //修改登录注册
            this.model=data.type
            //重置表单
            this.$refs["ruleForm"].resetFields();
            //清除定时器
             this.clearCountDown()
            },
            //提交表单
            submitForm(formName) {
            
            this.$refs[formName].validate((valid) => {
              if (valid) {
                  //表单验证通过后
                  if(this.model==='login'){
                      this.login()
                  }else{
                      this.register()
                  } 
              } else {
                console.log('注册失败');
                return false;
              }
            });
          },
          /**
           * 登录
           */
          login(){
           let requestData={
                username:this.ruleForm.username,
                password:sha1(this.ruleForm.password),
                code:this.ruleForm.code,
            }
            this.$store.dispatch('app/login',requestData).then(response =>{
                console.log('登录成功')
                console.log(response)
            //跳转到后台
            this.$router.push({
                name:'console'
                
            })
              }).catch(error =>{});
                       
          },
          /**
           * 注册
           */
          register(){
              let requestData={
                    username:this.ruleForm.username,
                    password:sha1(this.ruleForm.password),
                    code:this.ruleForm.code,
                    module:'register'
                }
                //注册接口
                Regisiter(requestData).then(response=>{
                    let data=response.data
                    this.$message({
                        message:data.message,
                        type:'success'
                    })
                    //注册成功则调用
                    this.toggle(this.menuTab[0])
                    //调用清除定时器方法
                    this.clearCountDown()
                }).catch(error=>{

                })

          },
          /**
           * 倒计时
           */
           countDown(number){
            //判断定时器是否存在，存在就清除
            if(this.timer){clearInterval(this.timer)}
            let time=number
            this.timer=setInterval(()=>{
            time--;
            console.log(time)
            if(time===0){
             clearInterval(this.timer)
            this.codeButtonStatus.status=false
            this.codeButtonStatus.text='再次获取'   
            }else{
            this.codeButtonStatus.text=`倒计时${time}秒` //'倒计时'+time+'秒’
            }
            },1000)

          },
          /**
           * 清除倒计时
           */
          clearCountDown(){
              //还原验证码按钮默认状态
              this.codeButtonStatus.status=false
              this.codeButtonStatus.text='获取验证啊'
              //清除倒计时
              clearInterval(this.timer)

          },
          //清空表单
          resetForm(formName) {
            this.$refs[formName].resetFields();
          }
        }
      } 
</script>
<style lang="scss" scoped>
#login{
    background-color:#344a5f;
    height: 100vh;
}
.login-wrap{
    width: 330px;
    margin:auto;
}
.menu-tab{
    text-align: center;
    li{
        display: inline-block;
        width:88px;
        border-radius: 2px;
        line-height: 36px;
        font-size: 14px;
        color:#fff;
        cursor: pointer;    
        }
.current{
    background-color: rgba(0,0,0,.1);

    }
}
.login-form{
    margin-top: 29px;
    label {
        display:block;
        margin-top: 3px;
        font-size:20px;
        color:#fff;
    } }
.item-form{margin-bottom: 13px;}
.block{
    display: block;
    width: 100%;
    }
.login-btn{margin-top:19px}            
</style> 