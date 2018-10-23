<template>
  <div>
    <Header></Header>
    <div style="margin-top:1.26rem;" class="title">请选择支付方法</div>
    <div class="item" @click="handlewepay">
      <img src="/static/img/微信.png" class="icon1 fll">
      <span class="content">微信</span>
      <img src="/static/img/right.png" class="icon2 flr">
    </div>
    <div class="item" @click="handlealipay">
      <img src="/static/img/支付宝.png" class="icon1 fll">
      <span class="content">支付宝</span>
      <img src="/static/img/right.png" class="icon2 flr">
    </div>
    <div class="mask" v-show="isShow" @click="handleShow"></div>
    <img src="/static/img/支付宝二维码.jpg" class="pay" v-show="wepay">
    <img src="/static/img/支付宝二维码.jpg" class="pay" v-show="alipay">
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow: false,
      wepay: false,
      alipay: false
    };
  },
  methods: {
    handleShow() {
      this.isShow = !this.isShow;
      this.wepay = false;
      this.alipay = false;
    },
    handlewepay() {
      this.isShow = !this.isShow;
      this.wepay = true;
    },
    handlealipay() {
      this.isShow = !this.isShow;
      this.alipay = true;
    }
  }
};
</script>

<style scoped>
.title {
  font-size: 15px;
  padding-left: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ddd;
  box-sizing: border-box;
}
.item {
  font-size: 16px;
  padding: 20px;
  box-sizing: border-box;
  border-bottom: 1px solid #ddd;
  position: relative;
}
.content {
  margin-left: 70px;
}
.icon1 {
  width: 70px;
  height: 40px;
  position: absolute;
  top: 10px;
}
.icon2 {
  width: 10px;
  height: 18px;
}
.mask {
  z-index: 998;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  width: 7.5rem;
  height: 100vh;
  background-color: #000;
  opacity: 0.5;
}
.pay {
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
}
</style>