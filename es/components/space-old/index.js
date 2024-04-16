import _regeneratorRuntime from "@babel/runtime/helpers/esm/regeneratorRuntime";
import _objectSpread from "@babel/runtime/helpers/esm/objectSpread2";
import _asyncToGenerator from "@babel/runtime/helpers/esm/asyncToGenerator";
import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import React, { useEffect, useState } from 'react';
import { Popup, Checkbox, SafeArea, DotLoading } from 'antd-mobile';
import styles from "../index.module.css";
import { SearchOutline, RightOutline } from 'antd-mobile-icons';
import Search from '../search';
import Executor from '../executor';
import { getResidentManagerLeftTree, getSpaceList } from '../../apis';
import { uniqBy, cloneDeep } from 'lodash';
export default function Space(props) {
  var visible = props.visible,
    title = props.title,
    radio = props.radio,
    info = props.info;
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    visibleSearch = _useState2[0],
    setVisibleSearch = _useState2[1];
  var _useState3 = useState(false),
    _useState4 = _slicedToArray(_useState3, 2),
    visibleExecutor = _useState4[0],
    setVisibleExecutor = _useState4[1];
  // 等待框
  var _useState5 = useState(false),
    _useState6 = _slicedToArray(_useState5, 2),
    isLoading = _useState6[0],
    setIsLoading = _useState6[1];
  // 数据
  var _useState7 = useState({}),
    _useState8 = _slicedToArray(_useState7, 2),
    listInfo = _useState8[0],
    setListInfo = _useState8[1];
  // 导航栏
  var _useState9 = useState([]),
    _useState10 = _slicedToArray(_useState9, 2),
    navList = _useState10[0],
    setNavList = _useState10[1];
  //   等级
  var _useState11 = useState(1),
    _useState12 = _slicedToArray(_useState11, 2),
    level = _useState12[0],
    setLevel = _useState12[1];
  //   点击下一级的数据
  var _useState13 = useState({}),
    _useState14 = _slicedToArray(_useState13, 2),
    nextInfo = _useState14[0],
    setNextInfo = _useState14[1];
  //   用户选择数据
  var _useState15 = useState([]),
    _useState16 = _slicedToArray(_useState15, 2),
    userList = _useState16[0],
    setUserList = _useState16[1];
  //   是全选，还是取消全选
  var _useState17 = useState(false),
    _useState18 = _slicedToArray(_useState17, 2),
    isSelectAll = _useState18[0],
    setIsSelectAll = _useState18[1];
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
      var _res1$data, _res2$data, _res2$data$response, parentId, sourceTableType, param, res1, data1, queryInfo, res2, data2, selectIds;
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
              res1 = _context.sent;
              data1 = ((_res1$data = res1.data) === null || _res1$data === void 0 ? void 0 : _res1$data.response) || []; //获取空间
              queryInfo = {};
              queryInfo[sourceTableType + 'Id'] = parentId;
              _context.next = 14;
              return getSpaceList(queryInfo);
            case 14:
              res2 = _context.sent;
              data2 = ((_res2$data = res2.data) === null || _res2$data === void 0 ? void 0 : (_res2$data$response = _res2$data.response) === null || _res2$data$response === void 0 ? void 0 : _res2$data$response.dataList) || [];
              data2.forEach(function (item) {
                item.isSpace = true;
              });
              param[level] = [].concat(_toConsumableArray(data1), _toConsumableArray(data2));
              //如果当前选中的有就,只需要在多选模式下
              if (userList.length && !radio) {
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
              _context.next = 26;
              break;
            case 23:
              _context.prev = 23;
              _context.t0 = _context["catch"](0);
              setIsLoading(false);
            case 26:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 23]]);
    }));
    return function getList(_x) {
      return _ref.apply(this, arguments);
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
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(item) {
      var select, list, _res$data, _res$data$response, queryInfo, res, data;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              select = item.select;
              list = userList; //还得考虑点击的是部门还是员工按钮
              if (!item.isSpace) {
                _context2.next = 9;
                break;
              }
              //点击空间按钮
              if (select) {
                //取消
                list = list.filter(function (v) {
                  return v.id != item.id;
                });
              } else {
                list = [].concat(_toConsumableArray(list), [item]);
              }
              //数组去重
              list = uniqBy(list, 'id');
              setUserList(list);
              item.select = select ? false : true;
              _context2.next = 22;
              break;
            case 9:
              if (!item.userList) {
                _context2.next = 13;
                break;
              }
              //部门按钮，然后看看是否有绑定成员信息
              selectOrCancel(item);
              _context2.next = 22;
              break;
            case 13:
              // 获取当前部门以及子部门下面的所有的用户
              queryInfo = {};
              queryInfo[item.sourceTableType + 'Id'] = item.id;
              _context2.next = 17;
              return getSpaceList(queryInfo);
            case 17:
              res = _context2.sent;
              data = ((_res$data = res.data) === null || _res$data === void 0 ? void 0 : (_res$data$response = _res$data.response) === null || _res$data$response === void 0 ? void 0 : _res$data$response.dataList) || []; //判断是否是选中状态
              data.forEach(function (itemSmall) {
                itemSmall.isSpace = true;
                // 如果是多选就根据上级选中
                if (!radio) {
                  itemSmall.select = !item.select;
                }
              });
              item.userList = data;
              selectOrCancel(item);
            case 22:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));
    return function deptMultipleSelect(_x2) {
      return _ref2.apply(this, arguments);
    };
  }();
  //成员选中还是取消
  var selectOrCancel = function selectOrCancel(item) {
    //判断是选中还是取消
    var select = item.select;
    var list = userList;
    //是选中状态，那么就是取消
    if (select && item.userList) {
      list = list.filter(function (v) {
        return !item.userList.some(function (s) {
          return s.id == v.id;
        });
      });
    } else {
      list = [].concat(_toConsumableArray(list), _toConsumableArray(item.userList));
    }
    //将子数据的状态也修改下
    if (item.userList) {
      item.userList.forEach(function (u) {
        u.select = !select;
      });
    }
    //数组去重
    list = uniqBy(list, 'id');
    item.select = !select;
    setUserList(list);
  };
  //   点击选中框
  var selectInfo = function selectInfo(item) {
    radio ? radioSelect(item) : multipleSelect(item);
  };
  //   全选，取消全选
  var selectAllOrCancel = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
      var list, index, item;
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              setIsLoading(true);
              // 只针对当前的页，上下级无效，不然搞死人---
              list = userList;
              for (index = 0; index < listInfo[level].length; index++) {
                item = listInfo[level][index];
                item.select = !isSelectAll;
                // //如果选择的是机构，那么就请求下级的小区
                // if (item.sourceTableType == 'organization') {
                //   //判断有没有子数据
                //   if (item.children) {
                //     if (item.select) {
                //       //取消
                //       list = list.filter((v: any) => {
                //         return !item.children.some((s: any) => s.id == v.id);
                //       });
                //     } else {
                //       list = [...list, ...item.children];
                //     }
                //   } else {
                //     let res = await getSpaceList({ organizationId: item.id });
                //     let dataList = res?.data?.response?.dataList || [];
                //     item.children = dataList;
                //     list = [...list, ...dataList];
                //   }
                // } else {
                //   //小区
                //   if (item.select) {
                //     list = [...list, item];
                //   } else {
                //     //先过滤当前项
                //     list = list.filter((f: any) => {
                //       return f.id != item.id;
                //     });
                //   }
                // }
              }

              setIsLoading(false);
              setIsSelectAll(!isSelectAll);
              //数组去重
              list = uniqBy(list, 'id');
              setUserList(list);
            case 7:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));
    return function selectAllOrCancel() {
      return _ref3.apply(this, arguments);
    };
  }();
  var filterSel = function filterSel() {
    // 匹配当前的选中或者非选中状态
    var selectIds = userList.map(function (item) {
      return item.id;
    }) || [];
    listInfo[level] && listInfo[level].map(function (item) {
      if (item.isSpace) {
        var ls = selectIds.includes(item.id) ? true : false;
        item.select = ls;
      }
    });
    setListInfo(_objectSpread({}, listInfo));
  };
  //   初始化数据
  var getRootDepartment = /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
      var _res$data2, res;
      return _regeneratorRuntime().wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              setIsLoading(true);
              _context4.next = 4;
              return getResidentManagerLeftTree({
                parentId: '0'
              });
            case 4:
              res = _context4.sent;
              setListInfo({
                1: ((_res$data2 = res.data) === null || _res$data2 === void 0 ? void 0 : _res$data2.response) || []
              });
              setIsLoading(false);
              _context4.next = 12;
              break;
            case 9:
              _context4.prev = 9;
              _context4.t0 = _context4["catch"](0);
              setIsLoading(false);
            case 12:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[0, 9]]);
    }));
    return function getRootDepartment() {
      return _ref4.apply(this, arguments);
    };
  }();
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
    //初始化
    if (info && Object.prototype.toString.call(info) === '[object Object]' && Object.keys(info).length > 0) {
      setLevel(1);
      setUserList([]);
      setListInfo({
        1: [info]
      });
    } else {
      //初始化
      getRootDepartment();
    }
  }, [info]);
  useEffect(function () {}, []);
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
  }, title || '选择空间'), /*#__PURE__*/React.createElement("div", {
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
    }, !radio || item.isSpace ? /*#__PURE__*/React.createElement("div", {
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
        if (item.sourceTableType == 'house') {
          //如果选择的是房屋就不用管
          return;
        }
        if (item.isSpace) {
          selectInfo(item);
        } else {
          next(item);
        }
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: styles.name
    }, item.name || '')), !item.isSpace && item.sourceTableType != 'house' ? /*#__PURE__*/React.createElement("div", {
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
      setVisibleExecutor(true);
    }
  }, radio || !userList.length ? null : /*#__PURE__*/React.createElement("div", {
    className: styles.itemAll
  }, "\u5168\u90E8"), userList.map(function (item) {
    return /*#__PURE__*/React.createElement("div", {
      key: item.id,
      className: styles.itemDet
    }, item.isSpace ? "".concat(item.belongName || '').concat(item.belongName ? '/' : '').concat(item.name) : item.name);
  }))), /*#__PURE__*/React.createElement("div", {
    className: styles.btn,
    onClick: onConfirm
  }, "\u786E\u5B9A", userList.length ? "(".concat(userList.length, ")") : null)), /*#__PURE__*/React.createElement(SafeArea, {
    position: "bottom"
  }))), /*#__PURE__*/React.createElement(Search, {
    visible: visibleSearch,
    radio: radio,
    type: 7,
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
    title: '全部空间',
    visible: visibleExecutor,
    type: 5,
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