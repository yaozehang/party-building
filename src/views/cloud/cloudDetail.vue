<template>
  <div class="container">
    <Header></Header>
    <div style="width:100%;height:10px;"></div>
    <div class="item">
    <div class="cd-header">
    <div class="cd fll">
      <img :src="data.header" class="fll">
      <div class="cd-title fll">
        <div class="nickname">{{data.username}}</div>
        <div class="time">
          <div class="clock fll"></div>
          <div class="fll" style="margin-right:5px">{{data.currentTime}}</div>
        </div>
        </div>
      </div>
    </div>
    <div class="cd-content">
      {{data.content}}
    </div>
    </div>
    <div ref="wrapper" :style="{ height: wrapperHeight + 'px' }" style="overflow:auto;">
    <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" @top-status-change="handleTopChange"  @bottom-status-change="handleBottomChange" :auto-fill="auto">
    <div class="response" v-for="(item,index) in resData" v-bind:key="index">
    <div class="cd-header">
    <div class="cd fll">
      <img :src="item.header" class="fll">
      <div class="cd-title fll">
        <div class="nickname">{{item.username}}</div>
        <div class="time">
          <div class="clock fll"></div>
          <div class="fll" style="margin-right:5px">{{item.timeFormat}}</div>
        </div>
        </div>
      </div>
    </div>
    <div class="cd-content">
      {{item.comment}}
    </div>
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
  <div class="bottom">
    <div class="bottom-list">
      <div class="bottom-inp">
        <input type="text" placeholder="评论内容" v-model="text">
      </div>
      <div class="bottom-btn">
        <button @click="submit">评价</button>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: "",
      data: [],
      resData: [],
      page: 1,
      isShow: false,
      text: "",
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
      let id = this.$route.query.id;
      this.data = this.$route.query.data;
      this.$axios
        .get("/forum/forumCommentList.do", { page, forum_id: id })
        .then(res => {
          this.total = res.total;
          let p = this.page * 10;
          if (p > this.total) {
            this.allLoaded = true;
          }
          if (page > 1) {
            this.resData = [...this.resData, ...res.rows];
          } else {
            this.resData = res.rows;
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
    submit(){
      let id = this.$route.query.id;
      this.$axios.post('/forum/addComment.do',{forum_id:id ,comment:this.text}).then(res => {
        if(res.code == 1){
          Toast({
            message:res.msg,
            duration: 1000
          })
          this.text = ""
          this.getData()
        } else {
          Toast({
            message:res.msg,
            duration: 1000
          })
        }
      })
    }
  },
  mounted: function() {
    this.getData(this.page);
    this.wrapperHeight =
      document.documentElement.clientHeight -
      this.$refs.wrapper.getBoundingClientRect().top;
  }
};
</script>

<style scoped lang="scss">
.container {
  height: calc(100vh - 0.86rem);
  overflow: hidden;
  background-color: #efeff4;
  margin-top: 0.86rem;
}
.item {
  width: 7.14rem;
  margin: 0 10px 10px 10px;
  box-sizing: border-box;
  background-color: #fff;
  padding: 16px;
}
.response {
  width: 7.5rem;
  margin: 10px 0;
  box-sizing: border-box;
  background-color: #fff;
  padding: 16px;
}
.cd-header {
  height: 45.8px;
}
.cd {
  img {
    width: 0.66rem;
    height: 0.66rem;
    border-radius: 50%;
  }
  .cd-title {
    margin-left: 10px;
    margin-bottom: 5px;
    .nickname {
      font-size: 16px;
      margin-bottom: 5px;
    }
  }
  .time {
    font-size: 11px;
    color: #999;
  }
}
.cd-chat {
  height: 20px;
  line-height: 20px;
  font-size: 12px;
  padding: 2px 8px;
  color: red;
  border: 1px solid red;
  border-radius: 15%/50%;
}
.clock {
  width: 12px;
  height: 12px;
  background: url("/static/img/时钟.png") no-repeat;
  background-size: 12px 12px;
  margin-right: 5px;
}
.cd-content {
  font-size: 16px;
  padding: 10px 0;
}
.loadmore__footer {
  font-size: 14px;
  text-align: center;
  padding: 10px;
}
.bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #fff;
}
.bottom-list {
  width: 100%;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  padding: 8px 8px 0 8px;
  box-sizing: border-box;
  .bottom-inp {
    width: 100%;
    height: 30px;
    border-radius: 4px;
    padding-right: 8px;
    padding-left: 8px;
    box-sizing: border-box;
    border: 1px solid #c50206;
    input {
      width: 100%;
      display: block;
      padding-left: 4px;
      height: 29px;
      background: 0 0;
      line-height: 18px;
      padding-top: 2px;
      color: #111;
      box-sizing: border-box;
      border: 0;
      outline: none;
    }
  }
  .bottom-btn {
    margin-left: 10px;
    width: 44px;
    height: 40px;
  }
  button {
    background: #c50206;
    color: #fff;
    padding: 2px 4px 1px;
    width: 38px;
    height: 30px;
    font-size: 12px;
    line-height: 26px;
    border: 1px solid transparent;
    border-radius: 4px;
  }
}
</style>