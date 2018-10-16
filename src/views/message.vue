<template>
  <div class="msg w750">
    <div class="msg-top">
      <p>通知早知道</p>
    </div>
    <div>
      <router-link to="/" class="msg-item">
        <img src="/static/img/tongzhi.png">
        <div class="msg-content">
          <div class="msg-title">
            关于我院党总支近期将举办党的十九大知识竞赛的通知
          </div>
          <div class="msg-time">
            2017-10-30 14:53:56
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style scoped lang="scss">
.msg-top {
  height: .86rem;
  background-color: #c50206;
  color: #fff;
  font-size: 18px;
  text-align: center;
  p {
    padding-top: 0.24rem;
  }
}

.msg-item {
  display: flex;
  color: #666;
  padding: .3rem;
  border-bottom: 1px solid #ddd;
  img {
    padding: .4rem;
  }
  .msg-content {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
  .msg-title {
    font-size: 15px;
    line-height: 1.5;
  }
  .msg-time {
    font-size: 12px;
  }
}
</style>