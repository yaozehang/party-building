<template>
  <div class="container w750">
    <div class="con-main">
      <router-view></router-view>
    </div>
    <div class="con-bottom w750">
      <router-link :to="{name:'index'}" class="icon-item">
        <div class="icon-index"></div>
        <div class="icon-title">
            首页
        </div>
      </router-link>
      <router-link :to="{name:'message'}" class="icon-item">
        <div class="icon-message"></div>
        <div class="icon-title">
            通知早知道
        </div>
      </router-link>
      <router-link :to="{name:'user'}" class="icon-item">
        <div class="icon-user"></div>
        <div class="icon-title">
            我的党建
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
.con-main {
  margin-bottom: 1.12rem;
}
.con-bottom {
  display: flex;
  height: 1.12rem;
  position: fixed;
  left: 0;
  bottom: 0;
  background-color: #fff;
  .icon-item {
    width: 2.5rem;
    padding-top: 0.2rem;
    text-align: center;
    font-size: 12px;
    color: #999;
    border-top: 2px solid transparent;
  }
}

.icon-index {
  width: 0.4rem;
  height: 0.4rem;
  margin: 0 auto;
  background: url("/static/img/党_grey.png") no-repeat;
  background-size: 100% 100%;
}
.router-link-active .icon-index {
  width: 0.4rem;
  height: 0.4rem;
  margin: 0 auto;
  background: url("/static/img/党_red.png") no-repeat;
  background-size: 100% 100%;
}
.router-link-active .icon-title {
  color: #f00;
}
.router-link-active:hover {
  border-top: 2px solid #f00;
}
.icon-message {
  width: 0.4rem;
  height: 0.4rem;
  margin: 0 auto;
  background: url("/static/img/消息_grey.png") no-repeat;
  background-size: 100% 100%;
}
.router-link-active .icon-message {
  width: 0.4rem;
  height: 0.4rem;
  margin: 0 auto;
  background: url("/static/img/消息_red.png") no-repeat;
  background-size: 100% 100%;
}
.icon-user {
  width: 0.4rem;
  height: 0.4rem;
  margin: 0 auto;
  background: url("/static/img/会员_grey.png") no-repeat;
  background-size: 100% 100%;
}
.router-link-active .icon-user {
  width: 0.4rem;
  height: 0.4rem;
  margin: 0 auto;
  background: url("/static/img/会员_red.png") no-repeat;
  background-size: 100% 100%;
}
</style>