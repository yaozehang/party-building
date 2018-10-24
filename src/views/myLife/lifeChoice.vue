<template>
  <div>
    <Header></Header>
    <div class="submitWarp">
      <router-link to="/personalsummary">个人总结</router-link>
      <router-link to="/discuss">{{titleDesc}}</router-link>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      titleDesc:''
    }
  },
  methods:{
    getData(){
      let user_id = window.localStorage.getItem("token")
      this.$axios.get('/nationComment/judgeComment.do',{user_id}).then(res => {
        this.titleDesc = res.tbComment.titleDesc
      })
    }
  },
  mounted(){
    this.getData()
  }
};
</script>

<style scoped lang="scss">
.submitWarp {
  margin-top: 0.86rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -100%); 
  a {
    display: block;
    border-color: transparent;
    background-color: #ef473a;
    color: #fff;
    font-size: 16px;
    width: 200px;
    min-height: 47px;
    text-align: center;
    border-radius: 4px;
    line-height: 3;
    margin: 20px auto;
  }
}
</style>