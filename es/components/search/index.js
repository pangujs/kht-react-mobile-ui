import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _objectSpread from "@babel/runtime/helpers/esm/objectSpread2";
import _regeneratorRuntime from "@babel/runtime/helpers/esm/regeneratorRuntime";
import _asyncToGenerator from "@babel/runtime/helpers/esm/asyncToGenerator";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import React, { useEffect, useState } from 'react';
import { Popup, Input, Checkbox, SafeArea, DotLoading } from 'antd-mobile';
import styles from "./index.module.css";
import { getEmployeeListByFuzzyName, deptListByFuzzyName, getResidentManagerLeftTree, getHouseList, getResidentManagerList, getTreeListFromSpace, getCustomerWxWorkList } from '../../apis';
import { isMobile } from '../../utils';
export default function PopupSearch(props) {
  var visible = props.visible,
    radio = props.radio,
    type = props.type,
    _props$queryInfo = props.queryInfo,
    queryInfo = _props$queryInfo === void 0 ? {} : _props$queryInfo;
  var typeSourceList = {
    family: '家属',
    proprietor: '业主',
    tenant: '租户'
  };
  var _useState = useState({}),
    _useState2 = _slicedToArray(_useState, 2),
    queryParams = _useState2[0],
    setQueryParams = _useState2[1];
  var _useState3 = useState(false),
    _useState4 = _slicedToArray(_useState3, 2),
    isSearch = _useState4[0],
    setIsSearch = _useState4[1];
  var _useState5 = useState([]),
    _useState6 = _slicedToArray(_useState5, 2),
    list = _useState6[0],
    setList = _useState6[1];
  var _useState7 = useState([]),
    _useState8 = _slicedToArray(_useState7, 2),
    deptList = _useState8[0],
    setDeptList = _useState8[1];
  var _useState9 = useState([]),
    _useState10 = _slicedToArray(_useState9, 2),
    userList = _useState10[0],
    setUserList = _useState10[1];
  var _useState11 = useState(1),
    _useState12 = _slicedToArray(_useState11, 2),
    activeKey = _useState12[0],
    setActiveKey = _useState12[1];
  // 等待框
  var _useState13 = useState(false),
    _useState14 = _slicedToArray(_useState13, 2),
    isLoading = _useState14[0],
    setIsLoading = _useState14[1];
  // 关闭
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
  var submit = function submit() {
    if (!queryParams.content) {
      return;
    }
    if (type == 1) {
      //部门
      getdeptListByFuzzyName();
    } else if (type == 3) {
      //部门+成员
      getdeptListByFuzzyName();
      getEmployeeListByFuzzyNameInfo();
    } else if (type == 4) {
      //项目
      getCommunityLeftTreeInfo();
    } else if (type == 5) {
      //房间
      getHouseListInfo();
    } else if (type == 6) {
      //业户
      getResidentManagerListInfo();
    } else if (type == 7) {
      // 空间
      getSpaceListInfo();
    } else if (type == 8) {
      //客户
      getCustomerWxWorkListInfo();
    } else {
      //成员
      getEmployeeListByFuzzyNameInfo();
    }
    setIsSearch(true); //搜索状态
  };
  // 部门搜索
  var getdeptListByFuzzyName = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      var _res$data, res;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              setIsLoading(true);
              _context.next = 4;
              return deptListByFuzzyName({
                departmentName: queryParams.content
              });
            case 4:
              res = _context.sent;
              setDeptList((res === null || res === void 0 ? void 0 : (_res$data = res.data) === null || _res$data === void 0 ? void 0 : _res$data.response) || []);
              setIsLoading(false);
              _context.next = 12;
              break;
            case 9:
              _context.prev = 9;
              _context.t0 = _context["catch"](0);
              setIsLoading(false);
            case 12:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 9]]);
    }));
    return function getdeptListByFuzzyName() {
      return _ref.apply(this, arguments);
    };
  }();
  // 成员搜索
  var getEmployeeListByFuzzyNameInfo = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
      var _res$data2, res, _list;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              setIsLoading(true);
              _context2.next = 4;
              return getEmployeeListByFuzzyName({
                employeeName: queryParams.content
              });
            case 4:
              res = _context2.sent;
              _list = ((_res$data2 = res.data) === null || _res$data2 === void 0 ? void 0 : _res$data2.response) || [];
              _list.map(function (item) {
                item.isEmployee = true;
              });
              setList(_list);
              setIsLoading(false);
              _context2.next = 14;
              break;
            case 11:
              _context2.prev = 11;
              _context2.t0 = _context2["catch"](0);
              setIsLoading(false);
            case 14:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 11]]);
    }));
    return function getEmployeeListByFuzzyNameInfo() {
      return _ref2.apply(this, arguments);
    };
  }();
  // 项目搜索
  var getCommunityLeftTreeInfo = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
      var _res$data3, res, lists;
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              setIsLoading(true);
              _context3.next = 4;
              return getResidentManagerLeftTree({
                name: queryParams.content,
                sourceTableType: 'community'
              });
            case 4:
              res = _context3.sent;
              lists = ((_res$data3 = res.data) === null || _res$data3 === void 0 ? void 0 : _res$data3.response) || []; //去掉非项目的数据,因为获取list接口需要传递上级的id，比较坑，就用树接口然后做筛选
              lists = lists.filter(function (item) {
                return item.sourceTableType == 'community';
              });
              //就用部门的list名称作为项目的集合
              setDeptList(lists);
              setIsLoading(false);
              _context3.next = 14;
              break;
            case 11:
              _context3.prev = 11;
              _context3.t0 = _context3["catch"](0);
              setIsLoading(false);
            case 14:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[0, 11]]);
    }));
    return function getCommunityLeftTreeInfo() {
      return _ref3.apply(this, arguments);
    };
  }();
  // 房间搜索
  var getHouseListInfo = /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
      var _res$data4, _res$data4$response, res, lists;
      return _regeneratorRuntime().wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              setIsLoading(true);
              _context4.next = 4;
              return getHouseList({
                searchInfo: queryParams.content
              });
            case 4:
              res = _context4.sent;
              lists = ((_res$data4 = res.data) === null || _res$data4 === void 0 ? void 0 : (_res$data4$response = _res$data4.response) === null || _res$data4$response === void 0 ? void 0 : _res$data4$response.dataList) || [];
              lists.map(function (item) {
                item.isHouse = true;
              });
              //就用部门的list名称作为房间的集合
              setDeptList(lists);
              setIsLoading(false);
              _context4.next = 14;
              break;
            case 11:
              _context4.prev = 11;
              _context4.t0 = _context4["catch"](0);
              setIsLoading(false);
            case 14:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[0, 11]]);
    }));
    return function getHouseListInfo() {
      return _ref4.apply(this, arguments);
    };
  }();
  // 业户搜索
  var getResidentManagerListInfo = /*#__PURE__*/function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
      var _res$data5, _res$data5$response, res, lists;
      return _regeneratorRuntime().wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              setIsLoading(true);
              _context5.next = 4;
              return getResidentManagerList(_objectSpread(_objectSpread({}, queryInfo), {}, {
                searchInfo: queryParams.content
              }));
            case 4:
              res = _context5.sent;
              lists = ((_res$data5 = res.data) === null || _res$data5 === void 0 ? void 0 : (_res$data5$response = _res$data5.response) === null || _res$data5$response === void 0 ? void 0 : _res$data5$response.dataList) || [];
              lists.map(function (item) {
                item.isEmployee = true;
              });
              //就用部门的list名称作为房间的集合
              setList(lists);
              setIsLoading(false);
              _context5.next = 14;
              break;
            case 11:
              _context5.prev = 11;
              _context5.t0 = _context5["catch"](0);
              setIsLoading(false);
            case 14:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, null, [[0, 11]]);
    }));
    return function getResidentManagerListInfo() {
      return _ref5.apply(this, arguments);
    };
  }();
  // 空间搜索
  var getSpaceListInfo = /*#__PURE__*/function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
      var _res$data6, res, lists;
      return _regeneratorRuntime().wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              setIsLoading(true);
              _context6.next = 4;
              return getTreeListFromSpace(_objectSpread(_objectSpread({}, queryInfo), {}, {
                searchInfo: queryParams.content
              }));
            case 4:
              res = _context6.sent;
              lists = ((_res$data6 = res.data) === null || _res$data6 === void 0 ? void 0 : _res$data6.response) || [];
              lists.map(function (item) {
                item.isSpace = true;
              });
              //就用部门的list名称作为房间的集合
              setDeptList(lists);
              setIsLoading(false);
              _context6.next = 14;
              break;
            case 11:
              _context6.prev = 11;
              _context6.t0 = _context6["catch"](0);
              setIsLoading(false);
            case 14:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, null, [[0, 11]]);
    }));
    return function getSpaceListInfo() {
      return _ref6.apply(this, arguments);
    };
  }();
  // 客户
  var getCustomerWxWorkListInfo = /*#__PURE__*/function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7() {
      var _res$data7, _res$data7$response, res, lists;
      return _regeneratorRuntime().wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.prev = 0;
              setIsLoading(true);
              _context7.next = 4;
              return getCustomerWxWorkList({
                searchInfo: queryParams.content
              });
            case 4:
              res = _context7.sent;
              lists = ((_res$data7 = res.data) === null || _res$data7 === void 0 ? void 0 : (_res$data7$response = _res$data7.response) === null || _res$data7$response === void 0 ? void 0 : _res$data7$response.dataList) || [];
              lists.map(function (item) {
                item.isEmployee = true;
              });
              setList(lists);
              setIsLoading(false);
              _context7.next = 14;
              break;
            case 11:
              _context7.prev = 11;
              _context7.t0 = _context7["catch"](0);
              setIsLoading(false);
            case 14:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, null, [[0, 11]]);
    }));
    return function getCustomerWxWorkListInfo() {
      return _ref7.apply(this, arguments);
    };
  }();
  // 选择
  var selectInfo = function selectInfo(item) {
    if (radio) {
      radioSelect(item);
    } else {
      multipleSelect(item);
    }
  };
  // 单选
  var radioSelect = function radioSelect(item) {
    var select = item.select;
    if (select) {
      //取消
      setUserList([]);
    } else {
      //新增
      setUserList([item]);
      //其它的都设置为取消状态
      if (type == 3) {
        //部门+成员类型
        deptList.map(function (l) {
          l.select = false;
        });
        list.map(function (l) {
          l.select = false;
        });
        setDeptList(deptList);
        setList(list);
      } else if (type == 2 || type == 6 || type == 8) {
        //成员类型
        list.map(function (l) {
          l.select = false;
        });
        setList(list);
      } else {
        //部门、小区、房间
        deptList.map(function (l) {
          l.select = false;
        });
        setDeptList(deptList);
      }
    }
    item.select = select ? false : true;
  };
  // 多选
  var multipleSelect = function multipleSelect(item) {
    var select = item.select;
    var list = userList;
    if (select) {
      //取消
      list = list.filter(function (v) {
        return v.id != item.id;
      });
    } else {
      list = [].concat(_toConsumableArray(list), [item]);
    }
    setUserList(list);
    item.select = select ? false : true;
  };
  // 部门数据展示
  var deptContent = function deptContent() {
    if (!deptList.length && isSearch) {
      return noEmptyInfo();
    }
    return /*#__PURE__*/React.createElement("div", {
      className: styles.list
    }, content(deptList, 1));
  };
  // 成员数据展示
  var employeeContent = function employeeContent() {
    if (!list.length && isSearch) {
      return noEmptyInfo();
    }
    return /*#__PURE__*/React.createElement("div", {
      className: styles.list
    }, content(list, 2));
  };
  // 项目数据展示
  var communityContent = function communityContent() {
    if (!deptList.length && isSearch) {
      return noEmptyInfo();
    }
    return /*#__PURE__*/React.createElement("div", {
      className: styles.list
    }, content(deptList, 3));
  };
  //房屋数据展示
  var houseContent = function houseContent() {
    if (!deptList.length && isSearch) {
      return noEmptyInfo();
    }
    return /*#__PURE__*/React.createElement("div", {
      className: styles.list
    }, content(deptList, 4));
  };
  // 业户数据展示
  var residentContent = function residentContent() {
    if (!list.length && isSearch) {
      return noEmptyInfo();
    }
    return /*#__PURE__*/React.createElement("div", {
      className: styles.list
    }, content(list, 5));
  };
  // 空间数据展示
  var spaceContent = function spaceContent() {
    if (!deptList.length && isSearch) {
      return noEmptyInfo();
    }
    return /*#__PURE__*/React.createElement("div", {
      className: styles.list
    }, content(deptList, 6));
  };
  // 客户数据展示
  var customerContent = function customerContent() {
    if (!list.length && isSearch) {
      return noEmptyInfo();
    }
    return /*#__PURE__*/React.createElement("div", {
      className: styles.list
    }, contentCustomer(list));
  };
  // 内容展示
  var content = function content(list, classify) {
    //分类 1为展示文件的icon，2/5为展示头像的icon，3/4/6无icon
    return list.map(function (item, index) {
      return /*#__PURE__*/React.createElement("div", {
        className: styles.item,
        key: index
      }, /*#__PURE__*/React.createElement("div", {
        className: styles.left,
        onClick: function onClick() {
          selectInfo(item);
        }
      }, /*#__PURE__*/React.createElement(Checkbox, {
        key: item.id,
        checked: item.select,
        className: styles.checkbox
      })), /*#__PURE__*/React.createElement("div", {
        className: styles.info
      }, [3, 4, 6].includes(classify) ? null : /*#__PURE__*/React.createElement("div", {
        className: styles.icon
      }, classify == 1 ? /*#__PURE__*/React.createElement("img", {
        className: styles.file,
        src: require('../../assets/images/file.png'),
        alt: ""
      }) : /*#__PURE__*/React.createElement("img", {
        className: styles.avatar,
        src: require('../../assets/images/profile-default.png'),
        alt: ""
      })), /*#__PURE__*/React.createElement("div", {
        className: styles.nameInfo
      }, /*#__PURE__*/React.createElement("div", {
        className: styles.name
      }, classify == 4 ? item.houseNumber : item.name), classify != 6 ? /*#__PURE__*/React.createElement("div", {
        className: styles.text
      }, classify == 2 ? item.employeeDeptInfoList && item.employeeDeptInfoList.map(function (m) {
        return m.fullName;
      }).join('、') || '' : classify == 4 ? item.belongName || '' : item.fullName) : null)));
    });
  };
  //客户内容展示
  var contentCustomer = function contentCustomer(lsit) {
    return list.map(function (item, index) {
      return /*#__PURE__*/React.createElement("div", {
        className: styles.itemCustomer,
        key: item.id
      }, /*#__PURE__*/React.createElement("div", {
        className: styles.left,
        onClick: function onClick() {
          selectInfo(item);
        }
      }, /*#__PURE__*/React.createElement(Checkbox, {
        key: item.id,
        checked: item.select,
        className: styles.checkbox
      })), /*#__PURE__*/React.createElement("div", {
        className: styles.right
      }, /*#__PURE__*/React.createElement("img", {
        className: styles.userImage,
        src: item.avatar || require('../../assets/images/profile-default.png'),
        alt: ""
      }), /*#__PURE__*/React.createElement("div", {
        className: styles.info
      }, /*#__PURE__*/React.createElement("div", {
        className: styles.title
      }, /*#__PURE__*/React.createElement("span", null, item.name || ''), item.type == 'wechat' ? /*#__PURE__*/React.createElement("span", {
        className: styles.type
      }, "@\u5FAE\u4FE1") : /*#__PURE__*/React.createElement("span", {
        className: "".concat(styles.type, " ").concat(styles.type2)
      }, "@", item.corpName || '')), item.residentHouseInfoReqDtoList && item.residentHouseInfoReqDtoList[0] ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
        className: styles.address
      }, item.residentHouseInfoReqDtoList[0].fullName || '', " \u7B49", item.residentHouseInfoReqDtoList.length, "\u4F4D\u4F4F\u6237"), /*#__PURE__*/React.createElement("div", {
        className: styles.identity
      }, item.residentHouseInfoReqDtoList[0].name, "/", typeSourceList[item.residentHouseInfoReqDtoList[0].type])) : null, item.tagInfoList && item.tagInfoList.length > 0 ? /*#__PURE__*/React.createElement("div", {
        className: styles.tags
      }, item.tagInfoList.map(function (itemSmall) {
        return /*#__PURE__*/React.createElement("div", {
          className: styles.tag,
          key: itemSmall.id
        }, itemSmall.name || '');
      })) : null)));
    });
  };
  /* 无数据 */
  var noEmptyInfo = function noEmptyInfo() {
    return /*#__PURE__*/React.createElement("div", {
      className: styles.noEmptyInfo
    }, /*#__PURE__*/React.createElement("div", {
      className: styles.noEmpty
    }, /*#__PURE__*/React.createElement("img", {
      src: require('../../assets/images/normal_empty.png'),
      alt: ""
    }), /*#__PURE__*/React.createElement("span", null, "\u641C\u7D22\u65E0\u7ED3\u679C")));
  };
  // 当弹窗关闭时候初始化
  useEffect(function () {
    if (!visible) {
      //初始化
      setQueryParams({
        content: ''
      });
      setIsSearch(false);
      setList([]);
      setDeptList([]);
      setUserList([]);
      setActiveKey(1);
    }
  }, [visible]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Popup, {
    visible: visible,
    bodyStyle: {
      height: '100vh'
    },
    position: "bottom",
    onClose: onClose,
    getContainer: document.getElementById('root')
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.searchContainer
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.headerInfo
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.searchInfo
  }, /*#__PURE__*/React.createElement("img", {
    className: styles.infoIcon,
    src: require('../../assets/images/search.png'),
    alt: ""
  }), /*#__PURE__*/React.createElement(Input, {
    placeholder: '搜索',
    clearable: true,
    className: styles.inputText,
    value: queryParams.content,
    onChange: function onChange(value) {
      if (!value) {
        setList([]); //没有数据的时候清空数据
      }

      setQueryParams(_objectSpread(_objectSpread({}, queryParams), {}, {
        content: value
      }));
    },
    onClear: function onClear() {
      setQueryParams(_objectSpread(_objectSpread({}, queryParams), {}, {
        content: ''
      }));
      setList([]);
      setDeptList([]);
    },
    onBlur: function onBlur() {
      if (isMobile()) {
        submit();
      }
    },
    onEnterPress: submit
  })), /*#__PURE__*/React.createElement("div", {
    className: styles.close,
    onClick: onClose
  }, "\u53D6\u6D88")), /*#__PURE__*/React.createElement("div", {
    className: styles.content
  }, type == 3 && isSearch ? /*#__PURE__*/React.createElement("div", {
    className: styles.top
  }, /*#__PURE__*/React.createElement("div", {
    className: "".concat(styles.item, " ").concat(activeKey == 1 ? styles.active : ''),
    onClick: function onClick() {
      if (activeKey == 1) return;
      setActiveKey(1);
    }
  }, "\u6210\u5458"), /*#__PURE__*/React.createElement("div", {
    className: "".concat(styles.item, " ").concat(activeKey == 2 ? styles.active : ''),
    onClick: function onClick() {
      if (activeKey == 2) return;
      setActiveKey(2);
    }
  }, "\u90E8\u95E8")) : null, /*#__PURE__*/React.createElement("div", {
    className: styles.listInfo
  }, type == 1 //部门
  ? deptContent() : type == 2 //成员
  ? employeeContent() : type == 4 //项目
  ? communityContent() : type == 5 //房间
  ? houseContent() : type == 6 //业户
  ? residentContent() : type == 7 //空间
  ? spaceContent() : type == 8 //客户
  ? customerContent() :
  //部门+成员
  activeKey == 1 ? employeeContent() : deptContent())), isLoading ? /*#__PURE__*/React.createElement("div", {
    className: styles.lodaing
  }, /*#__PURE__*/React.createElement(DotLoading, {
    color: "primary"
  })) : null, /*#__PURE__*/React.createElement("div", {
    className: styles.footer
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.listBox
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.list
  }, userList.map(function (item, index) {
    if (item.isEmployee) {
      return /*#__PURE__*/React.createElement("div", {
        key: index,
        className: styles.item
      }, /*#__PURE__*/React.createElement("img", {
        className: styles.images,
        src: item.avatar || require('../../assets/images/profile-default.png'),
        alt: ""
      }));
    } else {
      return /*#__PURE__*/React.createElement("div", {
        key: index,
        className: styles.itemDet
      }, type == 5 ? "".concat(item.belongName || '').concat(item.belongName ? '/' : '').concat(item.houseNumber) : item.name);
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: styles.btn,
    onClick: onConfirm
  }, "\u786E\u5B9A", userList.length ? "(".concat(userList.length, ")") : null)), /*#__PURE__*/React.createElement(SafeArea, {
    position: "bottom"
  }))));
}