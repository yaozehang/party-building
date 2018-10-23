<template>
  <div class="login w750">
    <Header></Header>
    <div style="height: .86rem;"></div>
    <div class="login-icon">
      <img src="/static/img/logo.png">
    </div>
    <form class="login-form">
      <div class="login-input">
        <input type="text" placeholder="请输入用户名" v-model="formData.id_card">
      </div>
      <div class="login-input">
        <input type="password" placeholder="请输入密码" v-model="formData.password ">
      </div>
      <div class="login-button">
        <input type="button" value="登录" @click="login"> 
      </div>
    </form>
  </div>
</template>

<script>
import qs from "qs";
import { Indicator } from "mint-ui";

export default {
  data() {
    return {
      formData: {
        id_card: "",
        password: ""
      }
    };
  },
  methods: {
    login() {
      Indicator.open({
        text: "登录中...",
        spinnerType: "fading-circle"
      });
      let data = qs.stringify(this.formData);
      this.$axios
        .post(`/user/userLogin.do?${data}`, {
          headers: {
            "Content-Type":
              "multipart/form-data; boundary=----WebKitFormBoundaryOrLu35UjaGom0Wmp"
          }
        })
        .then(res => {
          console.log(res);
          if (res.code == 1) {
            let storage = window.localStorage;
            storage.setItem("token", res.token);
            this.$store.commit("CHANGE_USERINFO", res.data);
            Toast({
              message: res.msg,
              duration: 1000
            });
            this.$router.push("/layout/index");
            Indicator.close();
          } else {
            Toast({
              message: res.msg,
              duration: 1000
            });
            Indicator.close();
          }
        });
    }
  }
};
</script>

<style scoped lang="scss">
.login {
  height: 100vh;
  background-color: #c50206;
  color: #fff;
  .login-icon {
    width: 4rem;
    margin: 0.6rem auto;
    img {
      width: 4rem;
      height: 0.96rem;
    }
  }
  .login-form {
    width: 6rem;
    margin: 0 auto;
    .login-input {
      margin-bottom: 0.2rem;
      input {
        display: block;
        width: 100%;
        padding: 0.24rem 0.24rem 0.24rem 0.12rem;
        box-sizing: border-box;
        border: 1px solid #ff0;
        border-radius: 4px;
        background: #c50206;
        font-size: 14px;
        color: #fff;
      }
    }
    .login-button {
      input {
        display: block;
        width: 100%;
        padding: 0.24rem 0.24rem 0.24rem 0.12rem;
        box-sizing: border-box;
        border-radius: 4px;
        background: #e3574f;
        font-size: 14px;
        border: none;
        color: #fff;
      }
    }
  }
}
/*placehodel*/
input:-ms-input-placeholder {
  color: #fff;
} /* Internet Explorer 10+ */
input::-webkit-input-placeholder {
  color: #fff;
} /* WebKit browsers */
input::-moz-placeholder {
  color: #fff;
} /* Mozilla Firefox 4 to 18 */
input:-moz-placeholder {
  color: #fff;
} /* Mozilla Firefox 19+ */
</style>