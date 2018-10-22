<template>
  <div>
    <Header></Header>
    <router-link to="/change" class="edit">编辑</router-link>
    <div class="bar" style="margin-top: .86rem;">
      <div class="item">
        <div style="line-height:3">头像</div>
        <div><img :src="userinfo.header"></div>
      </div>
      <div class="item">
        <div>姓名</div>
        <div>{{userinfo.username}}</div>
      </div>
      <div class="item">
        <div>身份证</div>
        <div>{{userinfo.idCard}}</div>
      </div>
      <div class="item">
        <div>家庭住址</div>
        <div>{{userinfo.hometown}}</div>
      </div>
      <div class="item">
        <div>工作地区</div>
        <div>{{userinfo.address}}</div>
      </div>
      <div class="item">
        <div>民族</div>
        <div>{{userinfo.nation}}</div>
      </div>
      <div class="item">
        <div>微信号</div>
        <div>{{userinfo.wxNum}}</div>
      </div>
      <div class="item">
        <div>qq号</div>
        <div>{{userinfo.qqNum}}</div>
      </div>
      <div class="item">
        <div>性别</div>
        <div>{{userinfo.sex}}</div>
      </div>
      <div class="item">
        <div>最高学历</div>
        <div>{{userinfo.education}}</div>
      </div>
      <div class="item">
        <div>职称</div>
        <div>{{userinfo.jobRank}}</div>
      </div>
      <div class="item">
        <div>薪资水平</div>
        <div>{{userinfo.salary}}</div>
      </div>
      <div class="item">
        <div>入党时间</div>
        <div>{{userinfo.joinPartyTime}}</div>
      </div>
      <div class="item">
        <div>党费最后缴纳时间</div>
        <div>{{userinfo.lastPayTime}}</div>
      </div>
      <div class="item">
        <div>当前身份</div>
        <div>{{userinfo.partyIdentity}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userinfo: {}
    };
  },
  methods: {
    getData() {
      this.$axios.get("/user/userInfo.do").then(res => {
        this.userinfo = res.data;
        if (this.userinfo.sex == 0) {
          this.userinfo.sex = "男";
        } else {
          this.userinfo.sex = "女";
        }
      });
    },
    sumit() {
      this.$axios.post("/user/modifyInfo.do");
    }
  },
  created() {
    this.getData();
  }
};
</script>

<style scoped>
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

.edit {
  z-index: 999;
  position: fixed;
  top: 5px;
  right: 5px;
  padding-right: 5px;
  padding-top: 8px;
  font-weight: 500;
  font-size: 17px;
}
</style>