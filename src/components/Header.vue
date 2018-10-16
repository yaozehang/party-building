<template>
  <div class="top">
      <div  @click='$router.go(-1)'>
        <img src="/static/img/返回.png">
      </div>
      <p>{{this.$route.meta.title}}</p>
  </div>
</template>

<script>
  export default {
  }
</script>

<style scoped lang="scss">
.top {
  height: .86rem;
  background-color: #c50206;
  color: #fff;
  font-size: 18px;
  text-align: center;
  p {
    padding-top: 0.24rem;
  }
  img {
      position: absolute;
      top: 0;
      left: 0;
      padding: .17rem;
      width: 0.5rem;
      height: 0.5rem;
    }
}
</style>