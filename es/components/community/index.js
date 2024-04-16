import _regeneratorRuntime from "@babel/runtime/helpers/esm/regeneratorRuntime";
import _objectSpread from "@babel/runtime/helpers/esm/objectSpread2";
import _asyncToGenerator from "@babel/runtime/helpers/esm/asyncToGenerator";
import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import React, { useEffect, useState } from 'react';
import { Popup, Checkbox, SafeArea, DotLoading, Toast } from 'antd-mobile';
import styles from "../index.module.css";
import { SearchOutline, RightOutline } from 'antd-mobile-icons';
import Search from '../search';
import Executor from '../executor';
import { getResidentManagerLeftTree, getCommunityList } from '../../apis';
import { uniqBy, cloneDeep } from 'lodash';
export default function Community(props) {
  var visible = props.visible,
    title = props.title,
    radio = props.radio,
    _props$defaultValue = props.defaultValue,
    defaultValue = _props$defaultValue === void 0 ? [] : _props$defaultValue,
    _props$isMustSelect = props.isMustSelect,
    isMustSelect = _props$isMustSelect === void 0 ? false : _props$isMustSelect;
  // 等待框
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    isLoading = _useState2[0],
    setIsLoading = _useState2[1];
  // 数据
  var _useState3 = useState({}),
    _useState4 = _slicedToArray(_useState3, 2),
    listInfo = _useState4[0],
    setListInfo = _useState4[1];
  // 导航栏
  var _useState5 = useState([]),
    _useState6 = _slicedToArray(_useState5, 2),
    navList = _useState6[0],
    setNavList = _useState6[1];
  //   等级
  var _useState7 = useState(1),
    _useState8 = _slicedToArray(_useState7, 2),
    level = _useState8[0],
    setLevel = _useState8[1];
  //   点击下一级的数据
  var _useState9 = useState({}),
    _useState10 = _slicedToArray(_useState9, 2),
    nextInfo = _useState10[0],
    setNextInfo = _useState10[1];
  //   用户选择数据
  var _useState11 = useState([]),
    _useState12 = _slicedToArray(_useState11, 2),
    userList = _useState12[0],
    setUserList = _useState12[1];
  //   是全选，还是取消全选
  var _useState13 = useState(false),
    _useState14 = _slicedToArray(_useState13, 2),
    isSelectAll = _useState14[0],
    setIsSelectAll = _useState14[1];
  var _useState15 = useState(false),
    _useState16 = _slicedToArray(_useState15, 2),
    visibleSearch = _useState16[0],
    setVisibleSearch = _useState16[1];
  var _useState17 = useState(false),
    _useState18 = _slicedToArray(_useState17, 2),
    visibleExecutor = _useState18[0],
    setVisibleExecutor = _useState18[1];
  // 关闭
  var onClose = function onClose() {
    props.onClose && props.onClose();
  };
  // 取消
  var onCancel = function onCancel() {
    if (level == 1) {
      onClose();
      return;
    }
    console.log(level, 'level');
    setLevel(level - 1);
  };
  // 确定
  var onConfirm = function onConfirm() {
    if (isMustSelect && userList.length == 0) {
      Toast.show('请选择项目');
      return;
    }
    props.onConfirm && props.onConfirm({
      data: userList
    });
    onClose();
  };
  //   下一级
  var next = function next(obj) {
    var item = cloneDeep(obj);
    setNextInfo(item);
    setLevel(level + 1);
    // 保存到导航
    setNavList([].concat(_toConsumableArray(navList), [obj]));
    //如果有数据就跟着一起变化
    if (item.userList) {
      item.userList.forEach(function (u) {
        u.select = !item.select;
      });
    }
  };
  //   获取数据
  var getList = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(obj) {
      var _res$data, parentId, sourceTableType, param, res, data, selectIds;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              setIsLoading(true);
              // 获取部门
              parentId = obj.id;
              sourceTableType = obj.sourceTableType;
              param = _objectSpread({}, listInfo);
              if (!parentId) setLevel(1);
              _context.next = 8;
              return getResidentManagerLeftTree({
                parentId: parentId,
                sourceTableType: sourceTableType
              });
            case 8:
              res = _context.sent;
              data = ((_res$data = res.data) === null || _res$data === void 0 ? void 0 : _res$data.response) || []; //如果是单纯部门的话，就不需要请求
              param[level] = _toConsumableArray(data);
              //如果当前选中的有就,只需要在多选模式下
              if (userList.length) {
                selectIds = userList.map(function (item) {
                  return item.id;
                }) || [];
                param[level].map(function (item) {
                  var ls = selectIds.includes(item.id) ? true : false;
                  item.select = ls;
                });
              }
              setListInfo(param);
              setIsLoading(false);
              _context.next = 19;
              break;
            case 16:
              _context.prev = 16;
              _context.t0 = _context["catch"](0);
              setIsLoading(false);
            case 19:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 16]]);
    }));
    return function getList(_x) {
      return _ref.apply(this, arguments);
    };
  }();
  //   初始化数据
  var getRootDepartment = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
      var _res$data2, res;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              setIsLoading(true);
              _context2.next = 4;
              return getResidentManagerLeftTree({
                parentId: '0'
              });
            case 4:
              res = _context2.sent;
              setListInfo({
                1: ((_res$data2 = res.data) === null || _res$data2 === void 0 ? void 0 : _res$data2.response) || []
              });
              setIsLoading(false);
              _context2.next = 12;
              break;
            case 9:
              _context2.prev = 9;
              _context2.t0 = _context2["catch"](0);
              setIsLoading(false);
            case 12:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 9]]);
    }));
    return function getRootDepartment() {
      return _ref2.apply(this, arguments);
    };
  }();
  // 单选
  var radioSelect = function radioSelect(item) {
    deptRadioSelect(item);
  };
  // 多选
  var multipleSelect = function multipleSelect(item) {
    deptMultipleSelect(item);
  };
  // 选择--单选
  var deptRadioSelect = function deptRadioSelect(item) {
    var select = item.select;
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
  };
  // 选择--多选
  var deptMultipleSelect = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(item) {
      var select, list, _res$data3, _res$data3$response, res, dataList;
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              select = item.select;
              list = userList; //如果选择的是机构，那么就请求下级的小区
              if (!(item.sourceTableType == 'organization')) {
                _context3.next = 29;
                break;
              }
              if (!item.children) {
                _context3.next = 9;
                break;
              }
              if (select) {
                //取消
                list = list.filter(function (v) {
                  return !item.children.some(function (s) {
                    return s.id == v.id;
                  });
                });
              } else {
                list = [].concat(_toConsumableArray(list), _toConsumableArray(item.children));
              }
              //数组去重
              list = uniqBy(list, 'id');
              item.select = !select;
              setUserList(list);
              return _context3.abrupt("return");
            case 9:
              if (!select) {
                _context3.next = 12;
                break;
              }
              //取消
              item.select = !select; //子数据都没有，就不用管了
              return _context3.abrupt("return");
            case 12:
              _context3.prev = 12;
              setIsLoading(true);
              _context3.next = 16;
              return getCommunityList({
                organizationId: item.id
              });
            case 16:
              res = _context3.sent;
              dataList = (res === null || res === void 0 ? void 0 : (_res$data3 = res.data) === null || _res$data3 === void 0 ? void 0 : (_res$data3$response = _res$data3.response) === null || _res$data3$response === void 0 ? void 0 : _res$data3$response.dataList) || [];
              item.children = dataList;
              list = [].concat(_toConsumableArray(list), _toConsumableArray(dataList));
              setUserList(list);
              item.select = !select;
              setIsLoading(false);
              _context3.next = 28;
              break;
            case 25:
              _context3.prev = 25;
              _context3.t0 = _context3["catch"](12);
              setIsLoading(false);
            case 28:
              return _context3.abrupt("return");
            case 29:
              //项目小区
              if (select) {
                //取消
                list = list.filter(function (v) {
                  return v.id != item.id;
                });
              } else {
                list = [].concat(_toConsumableArray(list), [item]);
              }
              setUserList(list);
              item.select = !select;
            case 32:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[12, 25]]);
    }));
    return function deptMultipleSelect(_x2) {
      return _ref3.apply(this, arguments);
    };
  }();
  //   点击选中框
  var selectInfo = function selectInfo(item) {
    radio ? radioSelect(item) : multipleSelect(item);
  };
  //   全选，取消全选
  var selectAllOrCancel = /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
      var list, _loop, index;
      return _regeneratorRuntime().wrap(function _callee4$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              setIsLoading(true);
              // 只针对当前的页，上下级无效，不然搞死人---
              list = userList;
              _loop = /*#__PURE__*/_regeneratorRuntime().mark(function _loop(index) {
                var item, _res$data4, _res$data4$response, res, dataList;
                return _regeneratorRuntime().wrap(function _loop$(_context4) {
                  while (1) {
                    switch (_context4.prev = _context4.next) {
                      case 0:
                        item = listInfo[level][index];
                        item.select = !isSelectAll;
                        //如果选择的是机构，那么就请求下级的小区
                        if (!(item.sourceTableType == 'organization')) {
                          _context4.next = 15;
                          break;
                        }
                        if (!item.children) {
                          _context4.next = 7;
                          break;
                        }
                        if (item.select) {
                          //取消
                          list = list.filter(function (v) {
                            return !item.children.some(function (s) {
                              return s.id == v.id;
                            });
                          });
                        } else {
                          list = [].concat(_toConsumableArray(list), _toConsumableArray(item.children));
                        }
                        _context4.next = 13;
                        break;
                      case 7:
                        _context4.next = 9;
                        return getCommunityList({
                          organizationId: item.id
                        });
                      case 9:
                        res = _context4.sent;
                        dataList = (res === null || res === void 0 ? void 0 : (_res$data4 = res.data) === null || _res$data4 === void 0 ? void 0 : (_res$data4$response = _res$data4.response) === null || _res$data4$response === void 0 ? void 0 : _res$data4$response.dataList) || [];
                        item.children = dataList;
                        list = [].concat(_toConsumableArray(list), _toConsumableArray(dataList));
                      case 13:
                        _context4.next = 16;
                        break;
                      case 15:
                        //小区
                        if (item.select) {
                          list = [].concat(_toConsumableArray(list), [item]);
                        } else {
                          //先过滤当前项
                          list = list.filter(function (f) {
                            return f.id != item.id;
                          });
                        }
                      case 16:
                      case "end":
                        return _context4.stop();
                    }
                  }
                }, _loop);
              });
              index = 0;
            case 4:
              if (!(index < listInfo[level].length)) {
                _context5.next = 9;
                break;
              }
              return _context5.delegateYield(_loop(index), "t0", 6);
            case 6:
              index++;
              _context5.next = 4;
              break;
            case 9:
              setIsLoading(false);
              setIsSelectAll(!isSelectAll);
              //数组去重
              list = uniqBy(list, 'id');
              setUserList(list);
            case 13:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee4);
    }));
    return function selectAllOrCancel() {
      return _ref4.apply(this, arguments);
    };
  }();
  var filterSel = function filterSel() {
    // 匹配当前的选中或者非选中状态
    var selectIds = userList.map(function (item) {
      return item.id;
    }) || [];
    listInfo[level] && listInfo[level].map(function (item) {
      //只有小区才行
      if (item.sourceTableType == 'community') {
        var ls = selectIds.includes(item.id) ? true : false;
        item.select = ls;
      }
    });
    setListInfo(_objectSpread({}, listInfo));
  };
  useEffect(function () {
    if (visible && (!listInfo[1] || Object.keys(listInfo[1]).length == 0)) {
      getRootDepartment(); //获取初始数据
    }
  }, [visible]);
  //   当值更新后就获取数据
  useEffect(function () {
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
    if (level == 1) {
      setNavList([]);
    } else {
      //只需要少
      setNavList(_toConsumableArray(navList).splice(0, level - 1));
    }
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
    bodyStyle: {
      height: '100vh',
      background: '#F5F5F5'
    },
    position: "bottom",
    onClose: onClose,
    getContainer: document.getElementById('root')
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.containerInfo
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.containerHeader
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.left,
    onClick: onCancel
  }, level == 1 ? '取消' : /*#__PURE__*/React.createElement("img", {
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
  }, title || '选择项目'), /*#__PURE__*/React.createElement("div", {
    className: styles.right
  })), /*#__PURE__*/React.createElement("div", {
    className: styles.containerSearch
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.searchInfo,
    onClick: function onClick() {
      setVisibleSearch(true);
    }
  }, /*#__PURE__*/React.createElement(SearchOutline, {
    className: styles.searchIcon
  }), /*#__PURE__*/React.createElement("span", null, "\u641C\u7D22"))), navList.length ? /*#__PURE__*/React.createElement("div", {
    className: styles.containerNav
  }, navList.map(function (item, index) {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
      key: index,
      className: "".concat(styles.containerNavItem, " ").concat(index == 0 || index != navList.length - 1 ? styles.containerNavItemActive : ''),
      onClick: function onClick() {
        setLevel(index + 2);
      }
    }, item.name), index != navList.length - 1 ? /*#__PURE__*/React.createElement("div", {
      className: styles.containerNavItemIcon
    }, /*#__PURE__*/React.createElement(RightOutline, null)) : null);
  })) : null, /*#__PURE__*/React.createElement("div", {
    className: styles.containerContent
  }, isLoading ? /*#__PURE__*/React.createElement("div", {
    className: styles.lodaing
  }, /*#__PURE__*/React.createElement(DotLoading, {
    color: "primary"
  })) : null, listInfo[level] && listInfo[level].length > 0 ? /*#__PURE__*/React.createElement("div", {
    className: styles.list
  }, listInfo[level].map(function (item) {
    return /*#__PURE__*/React.createElement("div", {
      key: item.id,
      className: styles.item
    }, !radio || item.sourceTableType == 'community' ? /*#__PURE__*/React.createElement("div", {
      className: styles.left,
      onClick: function onClick() {
        selectInfo(item);
      }
    }, /*#__PURE__*/React.createElement(Checkbox, {
      key: item.id,
      indeterminate: item.halfSelected,
      checked: item.select,
      className: styles.checkbox
    })) : null, /*#__PURE__*/React.createElement("div", {
      className: styles.info,
      onClick: function onClick() {
        //如果没有下一级别了就选中，如果有那就是下一级
        if (item.sourceTableType == 'community') {
          selectInfo(item);
        } else {
          next(item);
        }
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: styles.name
    }, item.name || '')), item.sourceTableType !== 'community' ? /*#__PURE__*/React.createElement("div", {
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
  }), /*#__PURE__*/React.createElement("span", null, "\u6682\u65E0\u6570\u636E")))), /*#__PURE__*/React.createElement("div", {
    className: styles.containerFooter
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.listBox
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.list,
    onClick: function onClick() {
      if (radio) {
        setUserList([]);
        return;
      }
      setVisibleExecutor(true);
    }
  }, radio || !userList.length ? null : /*#__PURE__*/React.createElement("div", {
    className: styles.itemAll
  }, "\u5168\u90E8"), userList.map(function (item) {
    return /*#__PURE__*/React.createElement("div", {
      key: item.id,
      className: styles.itemDet
    }, item.name);
  }))), /*#__PURE__*/React.createElement("div", {
    className: styles.btn,
    onClick: onConfirm
  }, "\u786E\u5B9A", userList.length ? "(".concat(userList.length, ")") : null)), /*#__PURE__*/React.createElement(SafeArea, {
    position: "bottom"
  }))), /*#__PURE__*/React.createElement(Search, {
    visible: visibleSearch,
    radio: radio,
    type: 4,
    onClose: function onClose() {
      setVisibleSearch(false);
    },
    onConfirm: function onConfirm(info) {
      var list = info.data || [];
      //判断是单选还是多选
      if (radio) {
        list.length && setUserList(list);
      } else {
        list = [].concat(_toConsumableArray(userList), _toConsumableArray(list));
        //再去重
        list = uniqBy(list, 'id');
        setUserList(list);
      }
    }
  }), /*#__PURE__*/React.createElement(Executor, {
    title: '全部项目',
    visible: visibleExecutor,
    type: 1,
    onClose: function onClose() {
      setVisibleExecutor(false);
    },
    onChange: function onChange(item) {
      var user = _toConsumableArray(userList);
      user = user.filter(function (i) {
        return i.id != item.id;
      });
      setUserList(user);
    },
    onCloseAll: function onCloseAll() {
      setUserList([]);
    },
    list: userList
  }));
}