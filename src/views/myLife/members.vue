<template>
  <div>
    <Header></Header>
    <div ref="wrapper" :style="{ height: wrapperHeight + 'px' }" style="overflow:auto;margin-top:.86rem">
      <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" @top-status-change="handleTopChange" :auto-fill="auto">
      <div  class="mem-item" v-for="(item,index) in member" v-bind:key="index">
        <img :src="item.header">
        <div class="mem-content">
          <div class="mem-title">
            {{item.username}}
          </div>
          <div class="mem-loc">
            {{item.branchName}}
          </div>
        </div>
      </div>
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
export default {
  data() {
    return {
      member: [],
      page: 2,
      topStatus: "",
      allLoaded: false,
      bottomStatus: "",
      wrapperHeight: 0,
      total: 0,
      auto:false
    };
  },
  methods: {
    getData(page) {
      this.member = this.$route.params.member;
      let user_id = window.localStorage.getItem("token");
      let select_branch = this.$route.params.select_branch;
      this.$axios
        .get("/nationComment/userList.do", {
          select_branch,
          user_id,
          page,
          rows: 10
        })
        .then(res => {
          console.log(res);
          this.total = res.total;
          let p = this.page * 10;
          if (p > this.total) {
            this.allLoaded = true;
          }
          if (page > 2) {
            this.member = [...this.member, ...res.rows];
          } else {
            this.member = res.rows;
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
    }
  },
  mounted() {
    this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top ;
    this.getData(this.page);
  }
};
</script>

<style scoped lang="scss">
.mem-top {
  height: 0.86rem;
  background-color: #c50206;
  color: #fff;
  font-size: 18px;
  text-align: center;
  p {
    padding-top: 0.24rem;
  }
}

.mem-item {
  display: flex;
  color: #666;
  padding: 0.3rem;
  border-bottom: 1px solid #ddd;
  img {
    padding: 0.4rem;
    width: 32px;
    height: 32px;
    border-radius: 50%;
  }
  .mem-content {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
  .mem-title {
    font-size: 15px;
    line-height: 1.5;
  }
  .mem-loc {
    font-size: 12px;
  }
}
.loadmore__footer {
  font-size: 14px;
  text-align: center;
  padding: 10px;
}
</style>