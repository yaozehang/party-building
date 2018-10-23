<template>
  <div class="user w750">
    <div class="user-top">
      <p>我的党建</p>
    </div>
    <div class="user-content">
      <div class="user-avatar" v-if="!islogin" @click="handLogin">
        <img src="/static/img/bt_bg.png">
      </div>
      <div class="user-avatar" v-else>
        <img :src="avatar">
      </div>
      <div class="no-login" v-if="!islogin" @click="handLogin">你还没有登录,请登录</div>
      <div class="no-login" v-else>{{username}}</div>
    </div>
    <div class="user-list">
      <div class="list-item">
        <router-link to="/information">
          <div class="list-title">
            <img src="/static/img/person.png">
            <p>个人信息</p>
          </div>
          <img src="/static/img/right.png">
        </router-link>
      </div>
      <div class="list-item">
        <router-link to="/score">
          <div class="list-title">
            <img src="/static/img/lxjf.png">
            <p>个人量化积分</p>
          </div>
          <img src="/static/img/right.png">
        </router-link>
      </div>
      <div class="list-item">
        <router-link to="/editPassword">
          <div class="list-title">
            <img src="/static/img/xgmm.png">
            <p>修改密码</p>
          </div>
          <img src="/static/img/right.png">
        </router-link>
      </div>
      <div class="list-item">
        <router-link to="/pay">
          <div class="list-title">
            <img src="/static/img/icon3.png">
            <p>党费缴纳</p>
          </div>
          <img src="/static/img/right.png">
        </router-link>
      </div>
      <div class="btn-logout" v-show="islogin">
        <mt-button type="danger" style="width:100%" @click="logout">退出登录</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
import { Indicator } from 'mint-ui';

export default {
  data(){
    return {
      avatar:'',
      username:'',
      islogin:false,
    }
  },
  methods:{
    getData(){
      this.avatar = this.$store.state.userinfo.header
      this.username = this.$store.state.userinfo.jobRank
      if(this.avatar != ""){
        this.islogin = true;
      }
    },
    handLogin(){
      this.$router.push('/')
    },
    logout(){
      sessionStorage.clear()
      window.localStorage.clear()
      this.$router.push('/')
      Toast({
            message:"退出成功",
            duration:1000
      })
    }
  },
  created(){
    this.getData()
  }
};
</script>

<style scoped lang="scss">
.user-top {
  height: .86rem;
  background-color: #c50206;
  color: #fff;
  font-size: 18px;
  text-align: center;
  p {
    padding-top: 0.24rem;
  }
}
.user-content {
  height: 2.62rem;
  background-color: #c50206;
  text-align: center;
  .user-avatar img {
    margin: 0 auto;
    margin-top: 0.6rem;
    width: 1.2rem;
    height: 1.2rem;
    border-radius: 50%;
  }

  .no-login {
    font-size: 12px;
    color: #fff;
  }
}

.user-list {
  height: 1.08rem;
  .list-item a {
    border-bottom: 1px solid #ddd;
    color: #444;
    display: flex;
    justify-content: space-between;
    font-size: 16px;
    img {
      padding: 20px 10px;
      width: 10px;
      height: 13px;
    }
    .list-title img {
      padding: 10px;
      width: 32px;
      height: 32px;
    }
  }
  .list-title {
    display: flex;
    p {
      line-height: 1.08rem;
    }
  }
}

.btn-logout {
  padding: .2rem;
}
</style>