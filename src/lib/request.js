import axios from 'axios'

// create an axios instance
const service = axios.create({
  baseURL: 'http://192.168.0.60:9103', // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // config.url += '?UserNo=' + UserNo;
    

    config.url += `?userNo=${sessionStorage.getItem('userNo')}`;
  
    if(!!config.url.indexOf('/Token/GetToken')){
      // const { token } = store.state.base;
      // sessionStorage.getItem('token')

      config.headers.token = sessionStorage.getItem('token');
    }

    return config
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    return response.data;
  }
)

export default service