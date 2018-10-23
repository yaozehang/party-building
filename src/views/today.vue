<template>
  <div class="container">
    <Header></Header>
    <div v-html="content" class="content"></div>
  </div>
</template>

<script>
import cheerio from "cheerio";
import getURL from "./util/getUrl.js"
import { Indicator } from "mint-ui";


export default {
  data() {
    return {
      content: "",
    };
  },
  methods: {
    getData() {
      Indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      });
      var month = new Date().getMonth() + 1
      month = month < 10 ? "0" + month : "" + month
      var day = new Date().getDate()
      day = day < 10 ? "0" + day : "" + day
      let url = getURL(month,day)
      this.$axios
        .get("/proxy/proxy.do", {
          url
        })
        .then(res => {
          const $ = cheerio.load(res);
          this.content = $("div.p1_02").html();
          Indicator.close();
        });
    }
  },
  created() {
    this.getData();
  }
};
</script>

<style scoped>
.container {
  font-size: 14px;
}
.content {
  margin-top: 0.86rem;
  padding: 10px;
  box-sizing: border-box;
}
</style>
<style>
h1 {
  font-size: 24px;
  margin-top: 0;
  margin-bottom: 0;
  font-weight: 500;
}
h2 {
  font-weight: 500;
  line-height: 1.2;
  font-size: 20px;
  margin-bottom: 10px;
  margin-top: 10px;
}
p {
  line-height: 2;
}
</style>
