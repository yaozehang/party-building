<template>
  <div class="life w750">
    <Header></Header>
    <div class="life-img" style="margin-top: .86rem;">
      <img src="/static/img/timg.jpg">
    </div>
    <div class="life-icon">
      <router-link to="/study">
        <img src="/static/img/icon1.png">
        政治学习
      </router-link>
      <router-link to="/">
        <img src="/static/img/icon2.png">
        思想汇报
      </router-link>
      <router-link to="/">
        <img src="/static/img/icon3.png">
        心得总结
      </router-link>
      <router-link to="/lifeChoice">
        <img src="/static/img/icon4.png">
        民主评议
      </router-link>
      <router-link to="/findorg">
        <img src="/static/img/icon5.png">
        流动党员找组织
      </router-link>
    </div>
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style scoped lang="scss">
img {
  display: block;
  width: 100%;
}

.life-icon {
  display: flex;
  flex-wrap: wrap;
  a {
    width: 2.5rem;
    text-align: center;
    font-size: 14px;
    color: #666;
    padding: 15px 0;
    img {
      margin: 8px auto;
      width: 1.7rem;
      height: 1.7rem;
    }
  }
}
</style>