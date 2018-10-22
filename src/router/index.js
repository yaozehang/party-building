import Vue from 'vue'
import Router from 'vue-router'

const components = {
  login: () => import('@/views/login'),
  layout:() => import('@/views/layout'),
  index: () => import('@/views/index'),
  message:() => import('@/views/message'),
  user: () => import('@/views/user/user'),
  news: () => import('@/views/news/news'),
  myLife: () => import('@/views/myLife/index'),
  newsDetail:() => import('@/views/news/newsDetail'),
  study:() => import('@/views/myLife/study'),
  partyMember: () => import('@/views/news/partyMember'),
  cloud: () => import('@/views/cloud/cloud'),
  cloudDetail: () => import('@/views/cloud/cloudDetail'),
  activity:() => import('@/views/four/activity'),
  anytimephoto: () => import('@/views/four/anytimephoto'),
  anytimestudy: () => import('@/views/four/anytimestudy'),
  systembuliding: () => import('@/views/four/systembuliding'),
  information: () => import('@/views/user/information'),
  change: () => import('@/views/user/change'),
  score: () => import('@/views/user/score')
}

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      name:'login',
      component:components.login,
      meta:{
        title:'登录'
      }
    },
    {
      path:'/layout',
      name:'layout',
      component:components.layout,
      redirect:'/layout/index',
      children:[
        {
          path:'index',
          name:'index',
          component:components.index
        },
        {
          path:'message',
          name:'message',
          component:components.message,
          meta:{
            type:2
          }
        },
        {
          path:'user',
          name:'user',
          component:components.user
        }
      ]
    },
    {
      path:'/news',
      name:'news',
      component:components.news,
      meta:{
        title:'信工新闻眼',
        type:0
      }
    },
    {
      path:'/partyMember',
      name:'partyMember',
      component:components.partyMember,
      meta:{
        title:'党员亮身份',
        type:5
      }
    },
    {
      path:'/newsDetail',
      name:'newsDetail',
      component:components.newsDetail,
      meta:{
        title:'新闻详情'
      }
    },
    {
      path:'/mylife',
      name:'myLife',
      component:components.myLife,
      meta:{
        title:'掌上组织生活'
      }
    },
    {
      path:'/study',
      name:'study',
      component:components.study,
      meta:{
        title:'政治学习',
        type:8
      }
    },
    {
      path:'/cloud',
      name:'cloud',
      component:components.cloud,
      meta:{
        title:'党员云互动',
      }
    },
    {
      path:'/cloudDetail',
      name:'cloudDetail',
      component:components.cloudDetail,
      meta:{
        title:'党员云互动'
      }
    },
    {
      path:'/activity',
      name:'activity',
      component:components.activity,
      meta:{
        title:'特色活动',
        type:1
      }
    },
    {
      path:'/anytimephoto',
      name:'anytimephoto',
      component:components.anytimephoto,
      meta:{
        title:'随时随地拍',
        type:7
      }
    },
    {
      path:'/anytimestudy',
      name:'anytimestudy',
      component:components.anytimestudy,
      meta:{
        title:'随时随地学',
        type:6
      }
    },
    {
      path:'/systembuliding',
      name:'systembuliding',
      component:components.systembuliding,
      meta:{
        title:'制度建设',
        type:4
      }
    },
    {
      path:'/information',
      name:'information',
      component:components.information,
      meta:{
        title:'个人信息'
      }
    },
    {
      path:'/change',
      name:'change',
      component:components.change,
      meta:{
        title:'修改信息'
      }
    },
    {
      path:'/score',
      name:'score',
      component:components.score,
      meta:{
        title:'个人量化积分'
      }
    }
  ]
})
