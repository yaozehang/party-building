<template>
  <div class="main w750">
    <div class="main-header">
      <div class="header-left fll">
        <img src="static\img\logo.png" alt="">
      </div>
      <div class="header-right flr" v-show="!islogin">
        <router-link to="/">登录</router-link> 
      </div>
    </div>
    <div class="main-swiper " style="margin-top: .86rem;">
      <swiper :options="swiperOption" style="position: relative; 
      height: 4.6rem" ref="mySwiper">
        <!-- slides -->
        <swiper-slide v-for="(slide, index) in swiperSlides" :key="index" style="height: 4.6rem;">
          <router-link :to="{name:'newsDetail',params:{id: slide.url}}">
            <img :src="slide.imgUrl" >
            <div class="swiper-bottom">
              {{slide.title}}
            </div>  
          </router-link>        
        </swiper-slide>
        <!-- Optional controls -->
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
    <div class="main-menu w750">
      <div class="row">
        <router-link to="/news">
          <img src="/static/img/icon_01.png">
          <div>信工新闻眼</div>
        </router-link>
        <router-link to="/mylife">
          <img src="/static/img/icon_03.png">
          <div>掌上组织生活</div>
        </router-link>
        <router-link :to="rout">
          <img src="/static/img/icon_05.png">
          <div>党员云互动</div>
        </router-link>
      </div>
      <div class="row">
        <router-link to="/">
          <img src="/static/img/icon_04.png">
          <div>党建一点通</div>
        </router-link>
        <router-link to="/">
          <img src="/static/img/icon_06.png">
          <div>党员亮身份</div>
        </router-link>
        <router-link to="/">
          <img src="/static/img/icon_02.png">
          <div>党史上的今天</div>
        </router-link>
      </div>
    </div>
    <div class="banner">
      <img src="/static/img/banner01.png" alt="">
    </div>
    <div class="tese">
      <div class="tese-item"></div>
      <div class="tese-item">
        <router-link to="/anytimestudy"></router-link>
        <router-link to="/systembuliding"></router-link>
      </div>
      <div class="tese-item">
        <router-link to="/anytimephoto"></router-link>
        <router-link to="/activity"></router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";

var _this = {}

export default {
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      swiperOption: {
        slidesPerView: 1,
        spaceBetween: 0,
        // effect: 'fade',
        loop: false,
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        autoplay: {
          delay: 3000,
          stopOnLastSlide: false,
          disableOnInteraction: false
        },
        observer:true,//修改swiper自己或子元素时，自动初始化swiper 
        observeParents:false,//修改swiper的父元素时，自动初始化swiper 
        on:{
            slideChangeTransitionEnd: function(swiper){ 
    　　　    _this.$refs.mySwiper.update();  
    　　　    _this.$refs.mySwiper.swiper.autoplay.start();
          },
        },
      },
      swiperSlides: [
        // {
        //   imgUrl:"/static/img/swiper1.png",
        //   title:'讲形势指方向——图解读习近平这次对省部级干部说了啥'
        // },
        //  {
        //    imgUrl:"/static/img/swiper2.png",
        //    title:'深入开展两学一做'
        //  },
        //  {
        //    imgUrl:'/static/img/swiper3.png',
        //    title:'党的群众路线'
        //  },  
      ],
      islogin:false,
      rout:"/",
    };
  },
  methods:{
    getData(){
      this.$axios.get('/carousel/carouselList.do').then(res => {
        this.swiperSlides = res.rows
      })
    },
    login(){
      if(this.$store.state.userinfo.header != ""){
        this.islogin = true
        this.rout = '/cloud'
      }
    }
  },
  computed: {
        swiper() {
         return this.$refs.mySwiper.swiper
        }
  },
  beforeCreate () {
    _this = this
  },
  created(){
    var _this = this
    this.login()
    this.getData()
  },
};
</script>

<style scoped lang="scss">
.main {
  .main-header {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 998;
    height: 1.13rem;
    background-color: #c50206;
  }
  .header-left {
    margin-left: 0.5rem;
    padding-top: 0.22rem;
    img {
      display: block;
      width: 2.6rem;
      height: 0.7rem;
    }
  }
  .header-right {
    margin-right: 0.5rem;
    padding-top: 0.3rem;
    font-size: 17px;
  }

  .main-swiper {
    img {
      display: block;
      width: 100%;
      min-width: 100%;
      min-height: 100%
    }
  }
  .swiper-bottom {
    z-index: 998;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 7.5rem;
    padding: 0.04rem;
    font-size: 14px;
    color: #fff;
    background: rgba(0, 0, 0, 0.5);
  }
  .main-menu {
    height: 3.8rem;
    background: url("/static/img/hekeda.png");
    background-size: 7.5rem 3.8rem;
    .row {
      display: flex;
      justify-content: space-around;
      font-size: 12px;
      font-weight: 700;
      text-align: center;
      padding: 0.2rem 0;
      a {
        width: 2.5rem;
        color: #666;
      }
      img {
        width: 1rem;
      }
    }
  }
  .banner {
    height: 1.74rem;
    img {
      height: 100%;
      width: 100%;
    }
  }
  .tese {
    height: 3.15rem;
    background: url('/static/img/tese.png');
    background-size: 7.5rem 3.15rem;
    display: flex;
    .tese-item {
      width: 2.5rem;
      height: 3.15rem;
      a{
        display: block;
        height:50%;
      }
    }
  }
}
</style>