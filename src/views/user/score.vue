<template>
  <div class="container">
    <Header></Header>
    <div class="w750">
      <div class="sco-show">
        <img src="/static/img/jifen.png">
        <span style="font-size: 16px; position: absolute; top: 50%; left: 50%; color: white; transform: translate(-50%, -50%);">{{totalScore}}</span>
      </div>
      <router-link to="/scoreDetail" class="sco-detail">
        <img src="/static/img/lxjf.png" class="icon1 fll ">
        <span class="det-title">积分明细</span>
        <img src="/static/img/right.png" class="icon2 flr">
      </router-link>
      <div class="sco-rule">
        <span style="font-size:14px;">积分规则</span>
        <img src="/static/img/wenhao.png">
      </div>
      <div class="sco-list">
        <div class="item">
          <span class="item-left">登录APP</span>
          <span class="item-right">5</span>
        </div>
        <div class="item">
          <span class="item-left">完善个人信息</span>
          <span class="item-right">2</span>
        </div>
        <div class="item">
          <span class="item-left">查看积分</span>
          <span class="item-right">1</span>
        </div>
        <div class="item">
          <span class="item-left">按时交纳党费</span>
          <span class="item-right">10</span>
        </div>
        <div class="item">
          <span class="item-left">查看通知</span>
          <span class="item-right">2</span>
        </div>
        <div class="item">
          <span class="item-left">了解学院工作动态</span>
          <span class="item-right">5</span>
        </div>
        <div class="item">
          <span class="item-left">上交思想汇报经审核通过</span>
          <span class="item-right">5</span>
        </div>
        <div class="item">
          <span class="item-left">主动学习相关文件</span>
          <span class="item-right">10</span>
        </div>
        <div class="item">
          <span class="item-left">认真撰写心得体会并上交,经审核通过</span>
          <span class="item-right">5</span>
        </div>
        <div class="item">
          <span class="item-left">提交个人总结,并参与评审</span>
          <span class="item-right">2</span>
        </div>
        <div class="item">
          <span class="item-left">积极参与互动</span>
          <span class="item-right">5</span>
        </div>
        <div class="item">
          <span class="item-left">学习党建知识</span>
          <span class="item-right">5</span>
        </div>
        <div class="item">
          <span class="item-left">学习党史</span>
          <span class="item-right">10</span>
        </div>
        <div class="item">
          <span class="item-left">创先争优事迹</span>
          <span class="item-right">10</span>
        </div>
        <div class="item">
          <span class="item-left">学党章,学习习近平总书记系列讲话</span>
          <span class="item-right">10</span>
        </div>
        <div class="item">
          <span class="item-left">用镜头记录两学一做过程中令人感动的人和事</span>
          <span class="item-right">3</span>
        </div>
        <div class="item">
          <span class="item-left">关注并积极参与特色活动</span>
          <span class="item-right">5</span>
        </div>
        <div class="item">
          <span class="item-left">制度化、常态化建设</span>
          <span class="item-right">5</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      totalScore:""
    }
  },
  methods: {
    getData(){
      this.$axios.get('/user/userInfo.do').then(res => {
        this.totalScore = res.data.totalScore
      })
    }
  },
  created(){
    this.getData()
  }
};
</script>

<style scoped lang="scss">
.container {
  height: calc(100vh - 0.86rem);
  background-color: #efeff4;
  margin-top: 0.86rem;
}
.sco-show {
  position: relative;
  img {
    width: 100%;
    height: 100%;
  }
}
.sco-detail {
  display: block;
  color: #666;
  width: 100%;
  font-size: 16px;
  border-bottom: 1px solid #ddd;
  background-color: #fff;
  padding: 16px;
  box-sizing: border-box;
  position: relative;
  .icon1 {
    width: 30px;
    height: 30px;
    align-items: center;
    position: absolute;
    top: 0;
    padding: 10px 0;
  }
  .det-title {
    padding-left: 40px;
  }
  .icon2 {
    width: 10px;
    height: 15px;
  }
}
.sco-rule {
  display: flex;
  justify-content: space-between;
  padding:7px 10px ;
  border-bottom: 1px solid #ddd;
}
.sco-list {
  background-color: #fff;
  overflow: scroll;
  height: 55vh;
}
.item {
  font-size: 14px;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ddd;
  .item-left {
    color: #999;
  }
  .item-right {
    color:#f00;
  }
}
</style>