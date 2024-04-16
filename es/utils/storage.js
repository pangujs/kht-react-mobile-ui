import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
var Storage = /*#__PURE__*/function () {
  function Storage(name) {
    _classCallCheck(this, Storage);
    this.func = '';
    this.func = name;
  }
  _createClass(Storage, [{
    key: "get",
    value: function get(key) {
      var val = this.func.getItem(key);
      try {
        return val ? JSON.parse(val) : '';
      } catch (err) {
        return val ? val : '';
      }
    }
  }, {
    key: "set",
    value: function set(key, data) {
      if (typeof data === 'undefined') {
        return;
      }
      var val = data;
      if (Object.prototype.toString.call(data) === '[object Object]') val = JSON.stringify(data);
      this.func.setItem(key, val);
    }
  }, {
    key: "clear",
    value: function clear() {
      this.func.clear();
    }
  }, {
    key: "remove",
    value: function remove(key) {
      this.func.removeItem(key);
    }
  }]);
  return Storage;
}();
export var Local = new Storage(localStorage);
export var Session = new Storage(sessionStorage);