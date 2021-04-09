"use strict";

var _jwtDecode = _interopRequireDefault(require("jwt-decode"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var JWT = 'store_token_id';

var setToken = function setToken(token) {
  localStorage.setItem(JWT, token);
};

var getToken = function getToken(token) {
  return localStorage.getItem(JWT);
};

var isLogin = function isLogin() {
  var jwToken = getToken();
  return !!jwToken && !isTokenExpired(jwToken);
};

var isTokenExpired = function isTokenExpired(token) {
  try {
    var _info = (0, _jwtDecode["default"])(token);

    if (_info.exp < Date.now() / 1000) {
      return true;
    } else return false;
  } catch (error) {
    return false;
  }
};

var getUser = function getUser() {
  var jwToken = getToken();

  if (isLogin()) {
    var user = (0, _jwtDecode["default"])(jwToken);
    return user;
  } else {
    return null;
  }
};

var logout = function logout() {
  localStorage.removeItem(JWT);
};

global.auth = {
  setToken: setToken,
  getToken: getToken,
  getUser: getUser,
  isLogin: isLogin,
  logout: logout
};