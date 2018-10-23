<template>
  <div ref="wrapper" :style="{ height: wrapperHeight + 'px' }" style="overflow:auto;">
    <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" @top-status-change="handleTopChange"  @bottom-status-change="handleBottomChange" :auto-fill="auto">
    <router-link :to="{name:'newsDetail',params:{id: item.newsId}}" class="item" v-for="(item,index) in data" v-bind:key="index">
        <img :src="item.pic">
        <div class="content">
          <div class="title">
            {{item.title}}
          </div>
          <div class="time">
              <div>{{item.currentTime}}</div> 
              <div class="num">
                <div class="eye"></div>
                {{item.count}}
              </div>
          </div>
        </div>
      </router-link>
      <div slot="top" class="mint-loadmore-top">
            <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }"><img src="/static/img/下拉.png" style="width:30px;height:30px;"></span>
            <span v-show="topStatus === 'loading'"><img src="/static/img/ring.gif" style="width:30px;height:30px;"></span>
          </div>
          <div slot="bottom" class="mint-loadmore-bottom">
            <span v-show="bottomStatus !== 'loading'" :class="{ 'rotate': bottomStatus === 'drop' }"><img src="/static/img/上拉.png" style="width:30px;height:30px;"></span>
            <span v-show="bottomStatus === 'loading'"><img src="/static/img/ring.gif" style="width:30px;height:30px;"></span>
          </div>
          <div class="loadmore__footer">
            <span v-show="allLoaded">没有更多了</span>
          </div>
    </mt-loadmore>
  </div>
</template>

<script>
import { Indicator } from "mint-ui";

export default {
  data() {
    return {
      data: [],
      page:1,
      allLoaded:false,
      topStatus: '',
      bottomStatus:'',
      wrapperHeight: 0,
      total:0,
      auto:false
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
         this.total = res.total
          let p = this.page*10
          if (p > this.total){
            this.allLoaded = true
          }
          if(page>1){
            this.data = [...this.data,...res.rows];
          } else {
            this.data = res.rows;
          }
          Indicator.close();
        });
    },
    loadTop() {
      this.getData(this.page)
      setTimeout(() => {
        this.$refs.loadmore.onTopLoaded();
      },1000)
    },
    loadBottom() {
      if (!this.allLoaded) {
          setTimeout(() => {
            this.$refs.loadmore.onBottomLoaded();
          }, 1000);//通知loadmore组件从新渲染，计算
          this.page ++
          this.getData(this.page)
        } else {
          setTimeout(() => {
            this.$refs.loadmore.onBottomLoaded();
          }, 1000);
        }
      setTimeout(() => {
        this.$refs.loadmore.onBottomLoaded();
      }, 1000);
    },
    handleTopChange(status){
      this.topStatus = status;
    },
    handleBottomChange(status){
      this.bottomStatus = status
    }
  },
   mounted(){
    this.getData(this.page);  
    this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top ;
  },
};
</script>

<style scoped lang="scss">
.item {
  display: flex;
  color: #666;
  padding: 0.2rem;
  border-bottom: 1px solid #ddd;
  img {
    width: 1.6rem;
    height: 1.6rem;
    padding-right: 0.2rem;
  }
  .content {
    width: 5.3rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .title {
    font-size: 15px;
    line-height: 1.5;
  }
  .time {
    font-size: 10px;
    display: flex;
    justify-content: space-between;
  }
  .num {
    display: flex;
    img {
      display: block;
      width: 0.36rem;
      height: 0.36rem;
    }
  }
}

.eye {
  width: 15px;
  height: 10px;
  background: url("/static/img/眼睛.png") no-repeat;
  background-size: 12px 12px;
}
.loadmore__footer {
  font-size: 14px;
  text-align: center;
  padding: 10px;
}
</style>