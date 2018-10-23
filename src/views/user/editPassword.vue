<template>
  <div>
    <Header></Header>
    <div style="margin-top:1.86rem">
      <form class="edit-from" >
        旧密码:
        <input type="password" v-model="oldPwd">
        新密码:
        <input type="password" v-model="newPwd">
        确认密码:
        <input type="password">
        <input type="button" value="确定" class="btn" @click="submit">
      </form>
    </div>
  </div>
</template>

<script>
import { Indicator } from "mint-ui";

  export default {
    data(){
      return {
        newPwd:'',
        oldPwd:''
      }
    },
    methods:{
      submit(){
        Indicator.open()
        this.$axios.get('/user/updatePwd.do',{newPwd:this.newPwd,oldPwd:this.oldPwd}).then(res => {
          if(res.code == 1){
            Toast({
              message:res.msg,
              duration: 1000
            })
          } else {
            Toast({
              message:res.msg,
              duration: 1000
            })
          }
          Indicator.close();
        })
      }
    }
  }
</script>

<style scoped lang="scss">
.edit-from {
  font-size: 16px;
  width: 300px;
  margin: 0 auto;
  input {
    display: block;
    width: 300px;
    margin: 10px 0;
    border-radius: 5px;
    box-sizing: border-box;
    height: 40px;
    border: 1px solid #999!important;
    outline: none;
    padding-left: 5px;
  }
  .btn {
    background-color: #ef473a;
    color: #fff;
  }
}
</style>