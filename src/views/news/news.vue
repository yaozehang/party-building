<template>
  <div>
    <Header></Header>
    <div>
      <router-link to="/" class="news-item">
        <img src="http://oowantxlb.bkt.clouddn.com/upload/rear/5c09890d0c3a155fe0f0039c2088583c.png">
        <div class="news-content">
          <div class="news-title">
            关于我院党总支近期将举办党的十九大知识竞赛的通知
          </div>
          <div class="news-time">
              <div>2017-10-30 14:53:56</div> 
              <div class="news-num">
                <img src="/static/img/眼睛.png">
                123
              </div>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
.news-item {
  display: flex;
  color: #666;
  padding: 0.2rem;
  border-bottom: 1px solid #ddd;
  img {
    width: 1.6rem;
    height: 1.6rem;
    padding-right: 0.2rem;
  }
  .news-content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .news-title {
    font-size: 15px;
    line-height: 1.5;
  }
  .news-time {
    font-size: 10px;
    display: flex;
    justify-content: space-between;
  }
  .news-num {
    display: flex;
    img {
      display: block;
      width: 0.36rem;
      height: 0.36rem;
    }
  }
}
</style>