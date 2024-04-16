import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _regeneratorRuntime from "@babel/runtime/helpers/esm/regeneratorRuntime";
import _objectSpread from "@babel/runtime/helpers/esm/objectSpread2";
import _asyncToGenerator from "@babel/runtime/helpers/esm/asyncToGenerator";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import React, { useState, useEffect } from 'react';
import { Checkbox, DotLoading, Popup, SafeArea } from 'antd-mobile';
import styles from "./index.module.css";
import { DownOutline, RightOutline } from 'antd-mobile-icons';
import { publicApiList } from '../../apis';
import { cloneDeep, uniqBy } from 'lodash';
export default function ClassifyLevel(props) {
  var visible = props.visible,
    title = props.title,
    _props$fieldNames = props.fieldNames,
    fieldNames = _props$fieldNames === void 0 ? {
      label: 'name',
      value: 'id'
    } : _props$fieldNames,
    _props$multiple = props.multiple,
    multiple = _props$multiple === void 0 ? false : _props$multiple,
    apiUrl = props.apiUrl,
    _props$parentId = props.parentId,
    parentId = _props$parentId === void 0 ? 'parentId' : _props$parentId,
    _props$queryInfo = props.queryInfo,
    queryInfo = _props$queryInfo === void 0 ? {} : _props$queryInfo,
    _props$defaultValue = props.defaultValue,
    defaultValue = _props$defaultValue === void 0 ? [] : _props$defaultValue,
    _props$onNextOperatio = props.onNextOperation,
    onNextOperation = _props$onNextOperatio === void 0 ? function () {
      //默认有下级
      return true;
    } : _props$onNextOperatio;
  // 等待框
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    isLoading = _useState2[0],
    setIsLoading = _useState2[1];
  //   等级
  var _useState3 = useState(1),
    _useState4 = _slicedToArray(_useState3, 2),
    level = _useState4[0],
    setLevel = _useState4[1];
  // 数据
  var _useState5 = useState({}),
    _useState6 = _slicedToArray(_useState5, 2),
    listInfo = _useState6[0],
    setListInfo = _useState6[1];
  //   点击下一级的数据
  var _useState7 = useState({}),
    _useState8 = _slicedToArray(_useState7, 2),
    nextInfo = _useState8[0],
    setNextInfo = _useState8[1];
  //   用户选择数据
  var _useState9 = useState([]),
    _useState10 = _slicedToArray(_useState9, 2),
    userList = _useState10[0],
    setUserList = _useState10[1];
  //   是全选，还是取消全选
  var _useState11 = useState(false),
    _useState12 = _slicedToArray(_useState11, 2),
    isSelectAll = _useState12[0],
    setIsSelectAll = _useState12[1];
  var onClose = function onClose() {
    props.onClose && props.onClose();
  };
  // 确定
  var onConfirm = function onConfirm() {
    props.onConfirm && props.onConfirm({
      data: userList
    });
    onClose();
  };
  // 取消
  var onCancel = function onCancel() {
    if (level == 1) {
      onClose();
      return;
    }
    setLevel(level - 1);
  };
  //   下一级
  var next = function next(obj) {
    var item = cloneDeep(obj);
    setNextInfo(item);
    setLevel(level + 1);
  };
  var getList = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(obj) {
      var _res$data, _res$data$response, query, res, list, selectIds, param;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              setIsLoading(true);
              query = _objectSpread({}, queryInfo);
              query[parentId] = obj[fieldNames.value];
              _context.next = 6;
              return publicApiList(apiUrl, query);
            case 6:
              res = _context.sent;
              list = ((_res$data = res.data) === null || _res$data === void 0 ? void 0 : (_res$data$response = _res$data.response) === null || _res$data$response === void 0 ? void 0 : _res$data$response.dataList) || []; //如果当前选中的有就,只需要在多选模式下
              if (userList.length) {
                selectIds = userList.map(function (item) {
                  return item.id;
                }) || [];
                list.map(function (item) {
                  var ls = selectIds.includes(item.id) ? true : false;
                  item.select = ls;
                });
              }
              //判断是否是首层
              if (obj[fieldNames.value] == '0') {
                setListInfo({
                  1: list
                });
              } else {
                param = _objectSpread({}, listInfo); //判断上级是否选中
                // list.map((item: any) => {
                //   item.select = obj.select;
                // });
                param[level] = list;
                setListInfo(param);
              }
              setIsLoading(false);
              _context.next = 17;
              break;
            case 13:
              _context.prev = 13;
              _context.t0 = _context["catch"](0);
              console.log(_context.t0, 'err');
              setIsLoading(false);
            case 17:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 13]]);
    }));
    return function getList(_x) {
      return _ref.apply(this, arguments);
    };
  }();
  var selectInfo = function selectInfo(item) {
    var select = item.select;
    if (multiple) {
      //多选
      var list = userList;
      if (select) {
        //取消
        list = list.filter(function (v) {
          return v[fieldNames.value] != item[fieldNames.value];
        });
      } else {
        list = [].concat(_toConsumableArray(list), [item]);
      }
      //数组去重
      list = uniqBy(list, fieldNames.value);
      setUserList(list);
      item.select = select ? false : true;
    } else {
      if (select) {
        //取消
        setUserList([]);
      } else {
        //新增
        setUserList([item]);
        //其它的都设置为取消状态
        listInfo[level].map(function (l) {
          l.select = false;
        });
        setListInfo(listInfo);
      }
      item.select = select ? false : true;
    }
  };
  //   全选，取消全选
  var selectAllOrCancel = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
      var list, _loop, index;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              // 只针对当前的页，上下级无效
              list = userList;
              _loop = function _loop(index) {
                var item = listInfo[level][index];
                item.select = !isSelectAll;
                if (item.select) {
                  list = [].concat(_toConsumableArray(list), [item]);
                } else {
                  //先过滤当前项
                  list = list.filter(function (f) {
                    return f[fieldNames.value] != item[fieldNames.value];
                  });
                }
              };
              for (index = 0; index < listInfo[level].length; index++) {
                _loop(index);
              }
              setIsSelectAll(!isSelectAll);
              //数组去重
              list = uniqBy(list, fieldNames.value);
              setUserList(list);
            case 6:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));
    return function selectAllOrCancel() {
      return _ref2.apply(this, arguments);
    };
  }();
  var filterSel = function filterSel() {
    // 匹配当前的选中或者非选中状态
    var selectIds = userList.map(function (item) {
      return item.id;
    }) || [];
    listInfo[level] && listInfo[level].map(function (item) {
      //只有小区才行
      var ls = selectIds.includes(item.id) ? true : false;
      item.select = ls;
    });
    setListInfo(_objectSpread({}, listInfo));
  };
  //   当值更新后就获取数据
  useEffect(function () {
    //初始化全选反选
    if (level != 1) {
      //先清空当前页，再请求
      var parms = _objectSpread({}, listInfo);
      listInfo[level] = [];
      setListInfo(parms);
      //没有就获取数据)
      getList(nextInfo);
    }
  }, [nextInfo]);
  useEffect(function () {
    if (visible && Object.keys(listInfo).length == 0) {
      //初始化
      var obj = {};
      obj[fieldNames.value] = '0';
      getList(obj);
    }
    if (!visible && isLoading) {
      setIsLoading(false);
    }
  }, [visible]);
  useEffect(function () {
    filterSel();
  }, [level]);
  useEffect(function () {
    filterSel();
  }, [userList]);
  useEffect(function () {
    if (defaultValue && defaultValue.length > 0) {
      setUserList(defaultValue);
    }
  }, [defaultValue]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Popup, {
    visible: visible,
    position: "bottom",
    onClose: onClose,
    onMaskClick: onClose,
    bodyStyle: {
      height: '80vh',
      borderTopLeftRadius: '8px',
      borderTopRightRadius: '8px'
    },
    getContainer: document.getElementById('root')
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.containerInfo
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.headerInfo
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.left,
    onClick: onCancel
  }, level == 1 ? /*#__PURE__*/React.createElement(DownOutline, null) : /*#__PURE__*/React.createElement("img", {
    className: styles.backIcon,
    src: require('../../assets/images/right.png'),
    alt: ""
  })), level != 1 ? /*#__PURE__*/React.createElement("div", {
    className: styles.close,
    onClick: onClose
  }, /*#__PURE__*/React.createElement("img", {
    className: styles.closeIcon,
    src: require('../../assets/images/close.png'),
    alt: ""
  })) : null, /*#__PURE__*/React.createElement("div", {
    className: styles.title
  }, title ? title : '请选择'), /*#__PURE__*/React.createElement("div", {
    className: styles.right,
    onClick: function onClick() {
      if (!multiple) return;
      selectAllOrCancel();
    }
  }, multiple ? isSelectAll ? '取消全选' : '全选' : '')), isLoading ? /*#__PURE__*/React.createElement("div", {
    className: styles.lodaing
  }, /*#__PURE__*/React.createElement(DotLoading, {
    color: "primary"
  })) : null, listInfo[level] && listInfo[level].length > 0 ? /*#__PURE__*/React.createElement("div", {
    className: styles.list
  }, listInfo[level].map(function (item, index) {
    return /*#__PURE__*/React.createElement("div", {
      key: item[fieldNames.value],
      className: styles.item
    }, /*#__PURE__*/React.createElement("div", {
      className: styles.left,
      onClick: function onClick() {
        selectInfo(item);
      }
    }, /*#__PURE__*/React.createElement(Checkbox, {
      key: item[fieldNames.value],
      className: styles.checkbox,
      checked: item.select
    })), /*#__PURE__*/React.createElement("div", {
      className: styles.info,
      onClick: function onClick() {
        if (onNextOperation(item)) {
          next(item);
        } else {
          selectInfo(item);
        }
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: styles.name
    }, item[fieldNames.label])), onNextOperation(item) ? /*#__PURE__*/React.createElement("div", {
      className: styles.right,
      onClick: function onClick() {
        next(item);
      }
    }, /*#__PURE__*/React.createElement(RightOutline, null)) : null);
  })) : /*#__PURE__*/React.createElement("div", {
    className: styles.noEmptyInfo
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.noEmpty
  }, /*#__PURE__*/React.createElement("img", {
    src: require('../../assets/images/normal_empty.png'),
    alt: ""
  }), /*#__PURE__*/React.createElement("span", null, "\u6682\u65E0\u6570\u636E"))), /*#__PURE__*/React.createElement("div", {
    className: styles.footer
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.listBox
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.list
  }, userList.map(function (item, index) {
    return /*#__PURE__*/React.createElement("div", {
      key: index,
      className: styles.itemDet
    }, item[fieldNames.label]);
  }))), /*#__PURE__*/React.createElement("div", {
    className: styles.btn,
    onClick: onConfirm
  }, "\u786E\u5B9A", userList.length ? "(".concat(userList.length, ")") : null)), /*#__PURE__*/React.createElement(SafeArea, {
    position: "bottom"
  }))));
}