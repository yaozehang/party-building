import Vue from 'vue'
import Router from 'vue-router'

const components = {
  login: () => import('@/views/login'),
  layout:() => import('@/views/layout'),
  index: () => import('@/views/index'),
  message:() => import('@/views/message'),
  user: () => import('@/views/user'),
  news: () => import('@/views/news/news'),
  myLife: () => import('@/views/myLife/index')
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
          component:components.message
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
        title:'信工新闻眼'
      }
    },
    {
      path:'/mylife',
      name:'myLife',
      component:components.myLife,
      meta:{
        title:'掌上组织生活'
      }
    }
  ]
})
