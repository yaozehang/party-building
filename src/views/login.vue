<template>
  <div class="login w750">
    <Header></Header>
    <div class="login-icon">
      <img src="/static/img/logo.png">
    </div>
    <form class="login-form">
      <div class="login-input">
        <input type="text" placeholder="请输入用户名">
      </div>
      <div class="login-input">
        <input type="password" placeholder="请输入密码">
      </div>
      <div class="login-button">
        <input type="button" value="登录">
      </div>
    </form>
  </div>
</template>

<script>
export default {};
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
        padding: 0.24rem 0 0.24rem .12rem;
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
        width: 6.16rem;
        padding: 0.24rem 0 0.24rem .12rem;
        border-radius: 4px;
        background: #E3574f;
        font-size: 14px;
        border:none;
        color: #fff;
      }
    }
  }
}
/*placehodel*/
input:-ms-input-placeholder{color:#fff;}/* Internet Explorer 10+ */ 
input::-webkit-input-placeholder{color:#fff;}/* WebKit browsers */
input::-moz-placeholder{color:#fff;}/* Mozilla Firefox 4 to 18 */ 
input:-moz-placeholder{color:#fff;}/* Mozilla Firefox 19+ */ 
</style>