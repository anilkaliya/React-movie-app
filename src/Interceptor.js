import axios from 'axios'
import { getToken } from './service/token-service';

export const interceptor=function requestHandler(){
axios.interceptors.request.use(request=>{
    request.headers["Authorization"] ="Bearer " +getToken();
    return request
  },error=>{
    Promise.reject(error)
  })
}

  


 