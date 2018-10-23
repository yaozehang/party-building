<template>
  <div class="color">
    <div class="container">
      <Header></Header>
          <div ref="wrapper" :style="{ height: wrapperHeight + 'px' }" style="overflow:auto; margin-top:.86rem;">
          <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" @top-status-change="handleTopChange"  @bottom-status-change="handleBottomChange" :auto-fill="auto">
          <div class="cd-item" v-for="(item,index) in data" v-bind:key="index">
            <div class="cd-header clearfix">
              <div class="cd fll">
                <img :src="item.header" class="fll">
                <div class="cd-title fll">
                  <div class="nickname">{{item.username}}</div>
                  <div class="time">
                    <div class="clock fll"></div>
                    <div class="fll" style="margin-right:5px">{{item.currentTime}}</div>
                    <div class="bell fll"></div>
                    <div class="fll">公开</div>
                  </div>
                </div>
              </div>
              <div class="cd-chat flr">党员互动</div>
            </div>
            <div class="cd-content">
              {{item.content}}
            </div>
            <div class="cd-response">
              <div class="box" @click="response(item,item.forumId)">
                <div class="response"></div>
                <div style="line-height:1.5;">回复</div>
              </div>
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
      <div class="xinzeng" @click="handleShow" v-show="!isShow"></div>
      <div class="discuss w750" v-show="isShow">
        <form action class="dis-form">
          <textarea class="dis-text" v-model="text"></textarea>
          <div class="dis-btn">
            <button type="button" size="small" class="btn-submit" @click="submit">发布</button>
            <button type="button" size="small" class="btn-cancel" @click="cancel">取消</button>
          </div>
        </form>
      </div>
    </div>
    <div class="mask" v-show="isShow" @click="handleShow"></div>
  </div>
</template>

<script>
import { Indicator } from "mint-ui";

export default {
  data() {
    return {
      data: [],
      page: 1,
      isShow: false,
      text: "",
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
      this.$axios.get("/forum/forumList.do", { page, rows: 10 }).then(res => {
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
    handleShow() {
      this.isShow = !this.isShow;
    },
    submit() {
      this.$axios
        .post("/forum/saveForum.do", { content: this.text, type: 1 })
        .then(res => {
          console.log(res);
          if ((res.code = 1)) {
            Toast({
              message: res.msg,
              duration: 1000
            });
            this.isShow = false;
            this.getData(1)
            this.text = ""
          } else {
            Toast({
              message: res.msg,
              duration: 1000
            });
          }
        });
    },
    cancel() {
      this.isShow = false;
    },
    handleTopChange(status){
      this.topStatus = status;
    },
    handleBottomChange(status){
      this.bottomStatus = status
    },
    response(data,id){
      this.$router.push({path:'/cloudDetail',query:{data:data,id:id}})
    }
  },
   mounted(){
    this.getData(this.page);  
    this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top ;
  },
};
</script>

<style scoped lang="scss">
.color {
  background-color: #f1f1f1;
}
.cd-item {
  width: 7.5rem;
  box-sizing: border-box;
  background-color: #fff;
  margin-bottom: 10px;
  padding: 16px;
  position: relative;
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
.bell {
  width: 12px;
  height: 12px;
  background: url("/static/img/喇叭.png") no-repeat;
  background-size: 12px 12px;
  margin-right: 5px;
}
.cd-content {
  font-size: 16px;
  padding: 10px 0;
}
.cd-response {
  font-size: 14px;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  .box {
    display: flex;
    .response {
      width: 22px;
      height: 22px;
      background: url("/static/img/回复.png") no-repeat;
      background-size: 22px 22px;
    }
  }
}

.xinzeng {
  position: fixed;
  right: 0;
  bottom: 25px;
  width: 64px;
  height: 64px;
  background: url("/static/img/新增.png");
  background-size: 64px 64px;
}

.dis-form {
  z-index: 999;
  width: 100%;
  position: fixed;
  bottom: 0;
  padding: 10px;
  background: #f1f1f1;
  box-sizing: border-box;
}
.dis-text {
  resize: none;
  border: none;
  outline: none;
  display: block;
  box-sizing: border-box;
  font-size: 14px;
  width: 100%;
  height: 100px;
  border-radius: 3px;
  padding: 4px;
  margin-bottom: 10px;
}
.dis-btn {
  display: flex;
  justify-content: space-between;
}
.btn-submit {
  color: #fff;
  text-decoration: none;
  border-color: transparent;
  background-color: #ef473a;
  padding: 2px;
  width: 34px;
  height: 30px;
  font-size: 12px;
  border-radius: 4px;
}
.btn-cancel {
  color: #666;
  text-decoration: none;
  border-color: transparent;
  background-color: #fff;
  padding: 2px;
  width: 34px;
  height: 30px;
  font-size: 12px;
  border-radius: 4px;
}

.mask {
  z-index: 998;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  width: 7.5rem;
  height: 100vh;
  background-color: #999;
  opacity: 0.5;
}

.loadmore__footer {
  font-size: 14px;
  text-align: center;
  padding: 10px;
}
</style>