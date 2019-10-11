import axios from 'axios'

//import store from './store'





let instance = axios.create({
    baseURL: 'http://127.0.0.1:5002/pc/',
    timeout: 5000
  });


instance.interceptors.request.use(config=>{
   
   // console.log(config.headers)
    //加载动画
   // startLoading()
   // console.log(config.method)
   
        return config
    
    
},error =>{
    return Promise.reject(error)
})


instance.interceptors.response.use(response=>{
    

    return response;

},error =>{
   
   return Promise.reject(error)
})
export default instance