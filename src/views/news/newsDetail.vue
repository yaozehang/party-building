<template>
  <div class="detail">
    <Header></Header>
    <div class="news" style="margin-top: .86rem;">
      <div class="title">{{data.title}}</div>
      <div v-html="data.content" class="content"></div>
    </div>
  </div>
</template>

<script>
import { Indicator } from "mint-ui";

export default {
  data() {
    return {
      data: {}
    };
  },
  methods: {
    getData() {
      Indicator.open();
      this.$axios
        .get(`/news/newsContent.do?newsId=${this.$route.params.id}`)
        .then(res => {
          this.data = res.data;
          Indicator.close();
        });
    }
  },
  created() {
    this.getData();
  }
};
</script>

<style scoped lang="scss">
.news {
  padding: 10px;
}
.title {
  font-size: 24px;
  margin-bottom: 10px;
}
.content {
  font-size: 12px;
  line-height: 2;
  width: 7.3rem;
}
</style>

<style lang="scss">
.content {
  p {
    width: 7rem;
    margin-bottom: 10px;
  }
}
.detail {
  img {
    max-width: 7.1rem;
  }
}
</style>
