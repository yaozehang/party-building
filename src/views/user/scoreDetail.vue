<template>
  <div>
    <Header></Header>
    <div ref="wrapper" :style="{ height: wrapperHeight + 'px' }" style="overflow:auto; margin-top:.86rem;">
          <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" @top-status-change="handleTopChange"  @bottom-status-change="handleBottomChange" :auto-fill="auto">
          <div class="item" v-for="(item,index) in data" v-bind:key="index">
            <div>
              <div style="font-size:18px;margin-bottom:10px;">{{item.typeName}}</div>
              <div style="font-size:13px;color:#666;">{{item.timeFormat}}</div>
            </div>
            <div class="right">+{{item.singleDesc}}</div>
          </div>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [],
      page: 1,
      allLoaded: false,
      topStatus: "",
      bottomStatus: "",
      wrapperHeight: 0,
      total: 0,
      auto: false
    };
  },
  methods: {
    getData(page) {
      this.$axios.get("/integral/integralList.do", { page, rows: 10 }).then(res => {
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
    },
    handleBottomChange(status) {
      this.bottomStatus = status;
    },
  },
  mounted() {
    this.getData(this.page);
    this.wrapperHeight =
      document.documentElement.clientHeight -
      this.$refs.wrapper.getBoundingClientRect().top;
  }
};
</script>

<style scoped lang="scss">
.item {
  width: 7.5rem;
  box-sizing: border-box;
  background-color: #fff;
  border-bottom: 1px solid #ddd;
  padding: 16px;
  display: flex;
  justify-content: space-between;
}
.right {
  font-size: 14px;
  color: #f00;
}

.loadmore__footer {
  font-size: 14px;
  text-align: center;
  padding: 10px;
}
</style>