"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.axios = void 0;

var _axios2 = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var axios = function axios(baseURL) {
  var instance = _axios2["default"].create({
    baseURL: baseURL || 'http://localhost:3003',
    timeout: 1000
  }); // 配置拦截器器


  instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    var jwToken = global.auth.getToken();
    config.headers['Authorization'] = 'Bearer ' + jwToken;
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });
  return instance;
};

exports.axios = axios;

var _default = axios();

exports["default"] = _default;