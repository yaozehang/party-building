<template>
  <div>
    <Header></Header>
    <div style="margin-top:1.26rem">
      <div class="firctr">
        <p class="firhead">评议须知</p>
        <div class="content" v-html="content">
        </div>
      </div>
      <div class="firbtnctrl ">
        <select class="branch" v-model="select_branch">
          <option value="0">请选择</option>
          <option :value="item.id" v-for="(item,index) in data" v-bind:key="index" >{{item.branch}}</option>
        </select>
        <div class="nextBtn" @click="next">下一步</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      content: "",
      data: "",
      select_branch: "",
    };
  },
  methods: {
    getData() {
      this.$axios.get("branch/findAll.do").then(res => {
        this.data = res.rows;
      });
    },
    getCom() {
      this.$axios.get("/nationComment/getComment.do").then(res => {
        this.content = res.content;
      });
    },
    next() {
      let user_id = window.localStorage.getItem("token")
      let member = []
      this.$axios.get("/nationComment/userList.do",{select_branch:this.select_branch,user_id}).then(res => {
        member = res.rows
        this.$router.push({name:'members',params:{member,select_branch:this.select_branch}})
      })
    }
  },
  mounted() {
    this.getData();
    this.getCom();
  }
};
</script>

<style scoped lang="scss">
.firctr {
  .firhead {
    font-size: 16px;
    text-align: center;
    margin-bottom: 10px;
  }
  .content {
    padding: 10px;
    font-size: 14px;
    line-height: 1.5;
    color: #666;
  }
}
.branch {
  margin-left: 40px;
  border: 1px solid transparent;
  height: 40px;
  width: 180px;
  background: #c50206;
  color: #fff;
  border-radius: 5px;
  text-align: center;
  font-weight: 400;
  font-size: 14px;
  line-height: 1.42857;
  outline: none;
}
.nextBtn {
  margin-left: 15px;
  width: 90px;
  height: 40px;
  border-radius: 5px;
  font-size: 14px;
  line-height: 40px;
  text-align: center;
  background: #c50206;
  color: #fff;
}
.firbtnctrl {
  display: flex;
  top: 460px;
  position: absolute;
}
</style>
<style>
p {
  margin-bottom: 10px;
}
</style>
