<template>
  <div>
    <Header></Header>
    <form class="bar" style="margin-top: .86rem;">
      <div class="item item-img">
        <div style="line-height:3">头像</div>
        <label><img :src="imgUrl"><input type="file" class="upload" :v-model="imgUrl" @change="handleChange"></label>
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
          <option value=积极分子 >积极分子</option>
          <option value=预备党员 >预备党员</option>
          <option value=党员 >党员</option>
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
      imgUrl:''
    };
  },
  methods: {
    getData() {
      this.$axios.get("/user/userInfo.do").then(res => {
        this.userinfo = res.data;
        this.imgUrl = res.data.header
      });
    },
    submit() {
      delete this.userinfo.idCard;
      if(this.imgUrl == ""){
        delete this.userinfo.header
      }
      this.$axios.post("/user/modifyInfo.do", this.userinfo).then(res => {
        if ((res.code = 1)) {
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
    },
    handleChange(e) {
      let _this = this;
      let file = e.target.files[0]; //取得所上传图片的所有信息
      let reader = new FileReader(); //html5读文件
      reader.readAsDataURL(file); //转BASE64
      reader.onload = function() {
        //读取完毕后调用接口
        let url = reader.result.split(",")[1];
        let formData = new FormData();
        formData.append("myFile", url);
        _this.$axios.post("/image/uploadBase64.do", formData).then(res => {
          _this.userinfo.header = res.url;
          _this.imgUrl = reader.result;
        });
      };
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
    display: none;
  }
}
</style>