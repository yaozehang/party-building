<template>
  <div class="msg w750">
    <div class="msg-top">
      <p>通知早知道</p>
    </div>
    <div style="overflow:auto">
      <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" @top-status-change="handleTopChange">
      <router-link :to="{name:'newsDetail',params:{id: item.newsId}}" class="msg-item" v-for="item in data" v-bind:key="item.newsId">
        <img src="/static/img/tongzhi.png">
        <div class="msg-content">
          <div class="msg-title">
            {{item.title}}
          </div>
          <div class="msg-time">
            {{item.currentTime}}
          </div>
        </div>
      </router-link>
      <div slot="top" class="mint-loadmore-top">
            <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }"><img src="/static/img/下拉.png" style="width:30px;height:30px;"></span>
            <span v-show="topStatus === 'loading'"><img src="/static/img/ring.gif" style="width:30px;height:30px;"></span>
      </div>
      <div slot="bottom" class="mint-loadmore-bottom">
            <span v-show="bottomStatus !== 'loading'" :class="{ 'is-rotate': bottomStatus === 'drop' }"><img src="/static/img/ring.gif" style="width:30px;height:30px;"></span>
      </div>
      <div class="loadmore__footer">
            <span v-show="allLoaded">没有更多了</span>
      </div>
      </mt-loadmore>
    </div>
  </div>
</template>

<script>
import { Indicator } from "mint-ui";

export default {
  data() {
    return {
      data: [],
      page: 1,
      topStatus: "",
      allLoaded: false,
      bottomStatus: "",
      wrapperHeight: 0,
      total: 0
    };
  },
  methods: {
    getData(page) {
      Indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      });
      this.$axios
        .get("/news/newsList.do", {
          page,
          rows: 10,
          type: this.$route.meta.type
        })
        .then(res => {
          this.total = res.total;
          let p = this.page * 10;
          if (p > this.total) {
            this.allLoaded = true;
          }
          if (page > 1) {
            this.data = [...this.data, ...res.rows];
          } else {
            this.data = res.rows;
          }
          Indicator.close();
        });
    },
    loadTop() {
      this.getData(this.page);
      setTimeout(() => {
        this.$refs.loadmore.onTopLoaded();
      }, 1000);
    },
    loadBottom() {
      if (!this.allLoaded) {
        setTimeout(() => {
          this.$refs.loadmore.onBottomLoaded();
        }, 1000); //通知loadmore组件从新渲染，计算
        this.page++;
        this.getData(this.page);
      } else {
        setTimeout(() => {
          this.$refs.loadmore.onBottomLoaded();
        }, 1000);
      }
      setTimeout(() => {
        this.$refs.loadmore.onBottomLoaded();
      }, 1000);
    },
    handleTopChange(status) {
      this.topStatus = status;
    }
  },
  created() {
    this.getData(this.page);
  }
};
</script>

<style scoped lang="scss">
.msg-top {
  height: 0.86rem;
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
  padding: 0.3rem;
  border-bottom: 1px solid #ddd;
  img {
    padding: 0.4rem;
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
.loadmore__footer {
  font-size: 14px;
  text-align: center;
  padding: 10px;
}
</style>