import _axios from 'axios';
const axios = baseURL => {
const instance = _axios.create({
baseURL: baseURL || 'http://localhost:3003',
timeout: 1000
});
// 配置拦截器器
return instance;
};

export default axios();