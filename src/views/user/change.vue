<template>
  <div>
    <Header></Header>
    <form class="bar" style="margin-top: .86rem;">
      <div class="item item-img">
        <div style="line-height:3">头像</div>
        <div><img :src="userinfo.header"><input type="file" class="upload" :v-bind="picture"></div>
      </div>
      <div class="item">
        <div>姓名</div>
        <div><input type="text" :value="userinfo.username"></div>
      </div>
      <div class="item">
        <div>身份证</div>
        <div>{{userinfo.idCard}}</div>
      </div>
      <div class="item">
        <div>家庭住址</div>
        <div><input type="text" :value="userinfo.hometown"></div>
      </div>
      <div class="item">
        <div>工作地区</div>
        <div><input type="text" :value="userinfo.address"></div>
      </div>
      <div class="item">
        <div>民族</div>
        <div><input type="text" :value="userinfo.nation"></div>
      </div>
      <div class="item">
        <div>微信号</div>
        <div><input type="text" :value="userinfo.wxNum"></div>
      </div>
      <div class="item">
        <div>qq号</div>
        <div><input type="text" :value="userinfo.qqNum"></div>
      </div>
      <div class="item">
        <div>性别</div>
        <div>
         <input type="radio" name="sex" value=1 v-model="userinfo.sex">男 
         <input type="radio" name="sex" value=0 v-model="userinfo.sex">女
        </div>
      </div>
      <div class="item">
        <div>最高学历</div>
        <div><input type="text" :value="userinfo.education"></div>
      </div>
      <div class="item">
        <div>职称</div>
        <div><input type="text" :value="userinfo.jobRank"></div>
      </div>
      <div class="item">
        <div>薪资水平</div>
        <div><input type="text" :value="userinfo.salary"></div>
      </div>
      <div class="item">
        <div>入党时间</div>
        <div><input type="date" :value="userinfo.joinPartyTime"></div>
      </div>
      <div class="item">
        <div>党费最后缴纳时间</div>
        <div><input type="date" :value="userinfo.lastPayTime"></div>
      </div>
      <div class="item">
        <div>当前身份</div>
        <select v-model="userinfo.partyIdentity">
          <option value=0 >积极分子</option>
          <option value=1 >预备党员</option>
          <option value=2 >党员</option>
        </select>
      </div>
    </form>
    <button @click="submit">保存</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userinfo: {},
      picture:''
    };
  },
  methods: {
    getData() {
      this.$axios.get("/user/userInfo.do").then(res => {
        this.userinfo = res.data;
      });
    },
    submit() {
      delete this.userinfo.idCard
      if(this.picture != ""){
        this.userinfo.header = this.picture
      }else {
        delete this.userinfo.header;
      }
      this.$axios.post("/user/modifyInfo.do", this.userinfo).then(res => {
        if(res.code = 1){
          Toast({
              message: res.msg,
              duration: 1000
            });
        } else {
          Toast({
              message: res.msg,
              duration: 1000
            });
        }
      });
    }
  },
  created() {
    this.getData();
  }
};
</script>

<style scoped lang="scss">
.item {
  border-bottom: 1px solid #ddd;
  background-color: #fff;
  color: #444;
  z-index: 2;
  display: block;
  padding: 16px;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
}
img {
  width: 40px;
  height: 40px;
}
input {
  text-align: right;
  background: none;
  outline: none;
  border: none;
}
button {
  color: white;
  outline: none;
  margin: 0;
  padding: 0;
  border: 1px solid transparent;
  z-index: 999;
  position: fixed;
  top: 5px;
  right: 5px;
  padding-right: 5px;
  padding-top: 8px;
  font-weight: 500;
  font-size: 17px;
  background-color: rgba(0, 0, 0, 0);
}

.item-img {
  position: relative;
  .upload {
    position: absolute;
    top: 20px;
    right: 40px;
    cursor: pointer;
    width: 40px;
    height: 40px;
    opacity: 0;
  }
}
</style>