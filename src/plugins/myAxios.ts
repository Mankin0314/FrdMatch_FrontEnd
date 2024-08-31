import axios from "axios";
// Set config defaults when creating the instance
const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api'
});

axiosInstance.defaults.withCredentials =true;
// 添加请求拦截器
axiosInstance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    console.log("我要发送请求啦",config)
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
axiosInstance.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    console.log("我收到响应啦",response)
    console.log(response)
    return response.data;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default axiosInstance;
