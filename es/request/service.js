import _objectSpread from "@babel/runtime/helpers/esm/objectSpread2";
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import axios from 'axios';
import Qs from 'qs';
import { Toast } from 'antd-mobile';
import { Session } from '../utils/storage';
import { TOKEN, COMPANY_CODE, CROP_ID } from '../types';
var Service = /*#__PURE__*/function () {
  //blob

  function Service(config) {
    _classCallCheck(this, Service);
    this.instance = void 0;
    this.messageState = true;
    this.responseType = 'json';
    this.pendingRequest = void 0;
    this.instance = axios.create(config);
    this.interceptors();
    this.pendingRequest = new Map(); // 存储请求url
  }
  _createClass(Service, [{
    key: "generateReqKey",
    value: function generateReqKey(config) {
      var method = config.method,
        url = config.url,
        params = config.params,
        data = config.data;
      return [method, url, Qs.stringify(params), Qs.stringify(data)].join('&');
    }
  }, {
    key: "addPendingRequest",
    value: function addPendingRequest(config) {
      var _this = this;
      //添加请求信息添加到pendingRequest对象中
      var requestKey = this.generateReqKey(config);
      config.cancelToken = config.cancelToken || new axios.CancelToken(function (cancel) {
        if (!_this.pendingRequest.has(requestKey)) {
          _this.pendingRequest.set(requestKey, cancel);
        }
      });
    }
  }, {
    key: "removePendingRequest",
    value: function removePendingRequest(config) {
      //pendingRequest对象中移除请求
      var requestKey = this.generateReqKey(config);
      if (this.pendingRequest.has(requestKey)) {
        var cancelToken = this.pendingRequest.get(requestKey);
        cancelToken(requestKey);
        this.pendingRequest.delete(requestKey);
      }
    }
  }, {
    key: "interceptors",
    value: function interceptors() {
      //拦截器
      this.interceptorsRequest();
      this.interceptorsResponse();
    }
  }, {
    key: "interceptorsRequest",
    value: function interceptorsRequest() {
      var _this2 = this;
      //请求拦截器
      this.instance.interceptors.request.use(function (config) {
        _this2.responseType = config.responseType || 'json';
        //设置token
        var token = Session.get(TOKEN);
        token && (config.headers[TOKEN] = token);
        // 设置公司编号
        var companycode = Session.get(CROP_ID);
        companycode && (config.headers[COMPANY_CODE] = companycode);
        _this2.removePendingRequest(config); //检查是否存在重复请求，存在则取消
        _this2.addPendingRequest(config); //把当前的请求信息添加到pendingRequest对象中
        return Promise.resolve(config);
      }, function (error) {
        return Promise.reject(error);
      });
    }
  }, {
    key: "interceptorsResponse",
    value: function interceptorsResponse() {
      var _this3 = this;
      //响应拦截器
      this.instance.interceptors.response.use(function (response) {
        _this3.removePendingRequest(response.config); //pendingRequest对象中移除请求
        return response;
      }, function (error) {
        console.log('response--------error: ', error);
        _this3.removePendingRequest(error.config || {}); //pendingRequest对象中移除请求
        if (axios.isCancel(error)) {
          console.log('已取消的重复请求：' + error.message);
          return Promise.reject({
            message: 'cancel request code cancel'
          });
        } else {
          //异常处理
          console.log('异常处理');
          return Promise.reject(error);
        }
      });
    }
  }, {
    key: "request",
    value: function request(config) {
      var _this4 = this;
      //请求封装
      //默认messageState：true ，有传值则取传进来的值
      this.messageState = typeof config.messageState !== 'undefined' ? config.messageState : true;
      return new Promise(function (resolve, reject) {
        _this4.instance.request(config).then(function (response) {
          var data = response.data;
          if (_this4.responseType === 'blob') {
            //文档流格式
            return resolve(response);
          }
          if (!data.success) {
            //业务异常
            if ([1007, 403].includes(data.code)) {
              Toast.show({
                content: data.message || '登录失效'
              });
            } else {
              //默认提示
              if (_this4.messageState) {
                Toast.show({
                  content: data.message || '网络请求失败'
                });
              }
            }
            reject(response);
          } else {
            resolve(response);
          }
        }).catch(function (error) {
          console.log('error: ', error);
          if (!window.navigator.onLine) {
            //断网了
            Toast.show({
              content: '网络链接失败，请检查网络是否正常'
            });
            return;
          } else {
            var msg = error.message;
            var code = msg.split(' ');
            _this4.setMessageTip(code[code.length - 1]);
            return;
          }
        });
      });
    }
  }, {
    key: "setMessageTip",
    value: function setMessageTip(code) {
      var tipsText;
      switch (code) {
        case '404':
          tipsText = '找不到资源';
          break;
        case '500':
          tipsText = '服务器内部错误';
          break;
        case '502':
          tipsText = '网关错误';
          break;
        case '503':
          tipsText = '服务不可用';
          break;
        case '504':
          tipsText = '网关超时';
          break;
        case 'cancel':
          tipsText = '';
          break;
        default:
          tipsText = '网络请求失败';
          break;
      }
      if (tipsText) Toast.show({
        content: tipsText
      });
    }
  }, {
    key: "get",
    value: function get(config) {
      return this.request(_objectSpread(_objectSpread({}, config), {}, {
        method: 'GET'
      }));
    }
  }, {
    key: "delete",
    value: function _delete(config) {
      return this.request(_objectSpread(_objectSpread({}, config), {}, {
        method: 'DELETE'
      }));
    }
  }, {
    key: "patch",
    value: function patch(config) {
      return this.request(_objectSpread(_objectSpread({}, config), {}, {
        method: 'PATCH'
      }));
    }
  }, {
    key: "post",
    value: function post(config) {
      return this.request(_objectSpread(_objectSpread({}, config), {}, {
        method: 'POST'
      }));
    }
  }]);
  return Service;
}();
export default Service;