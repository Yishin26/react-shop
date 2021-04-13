"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = UserProfile;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function UserProfile(props) {
  var logout = function logout() {
    global.auth.logout();
    props.close('logout');
  };
}