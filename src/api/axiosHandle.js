import axios from 'axios';
export default class AxiosHandle {
  static axiosConfigInit() {
    axios.defaults.baseURL = 'http://localhost:3000'
    axios.interceptors.request.use(
      config => {
        const token = localStorage.getItem('userToken');
        if (token) {
          // Bearer是JWT的认证头部信息
          config.headers.common['Authorization'] = 'Bearer ' + token;
        }
        return config;
      },
      error => {
        return Promise.reject(error);
      }
    );
  }
  static async axiosRequest(method = 'get', url, params){
    return new Promise((resolve, reject) => {
        axios[method](url, { params }).then(res => {
          const response =  typeof res.data === 'object' ? res.data : JSON.parse(res.data);
          console.log('response00', response);
          resolve(response);
        }), error => {
          if(error.response){
              reject(error.response.data)
          }else{
              reject(error)
          }
        }
    });
  }
}
