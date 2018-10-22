import axios from "axios"
import qs from "qs"

  const instance = axios.create({
    baseURL:"http://211.67.177.56:8080/hhdj/",
    timeout:15000,
  })

  instance.interceptors.request.use( 
    config => {
      let token = localStorage.getItem("token")
      if (token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
          config.headers.token = token;
      }
      return config;
  },
    error  => {
        return Promise.reject(error );
    }
  )

  const xhr = {
    get(url, data, config){
      return new Promise((resolve, reject) => {
        instance.get(url, {params:data}, config).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    },
  
     post(url, data, config){
      return new Promise((resolve, reject) => {
        instance.post(url, qs.stringify(data), config).then(res => {
          resolve(res.data)
        }).catch(err => {
          reject(err)
        })
      })
    }
}

export const $axios = xhr;
   

