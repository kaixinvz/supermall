import axios from 'axios'

export function  request(config) {
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:8000/api/w6',
    timeout: 5000
  })
  //发送真正的网络请求

//axios的拦截器
//请求拦截的作用
  instance.interceptors.request.use(config => {
    // console.log(config);
    // 1.比如config中的一些信息不符合服务器的要求
    // 2.https://github.com/kaixinvz/supermall.git比如每次发送网络请求时，都希望在界面中显示一个请求的图标
    // 3.某些网络请求（比如登录token），必须携带一些特殊的信息
    return config
  }, err => {
    // console.log(err);
  })


//响应拦截
  instance.interceptors.response.use(res => {
    // console.log(res);
    return res.data
  }, err => {
    // console.log(err);
  })

  return instance(config)
}

// export function  request(config) {
//     return new Promise((resolve,reject)=> {
//       const instance = axios.create({
//         baseURL: 'http://152.136.185.210:8000/api/w6',
//         timeout: 5000
//       })
//
//       instance(config)
//         .then(res => {
//               resolve(res)
//         })
//         .catch(err => {
//               reject(err)
//         })
//     })



