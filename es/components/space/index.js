import _regeneratorRuntime from "@babel/runtime/helpers/esm/regeneratorRuntime";
import _asyncToGenerator from "@babel/runtime/helpers/esm/asyncToGenerator";
import _objectSpread from "@babel/runtime/helpers/esm/objectSpread2";
import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import React, { useEffect, useState } from 'react';
import { Popup, Checkbox, SafeArea, DotLoading } from 'antd-mobile';
import styles from "../index.module.css";
import { SearchOutline, RightOutline } from 'antd-mobile-icons';
import Search from '../search';
import { getTreeListFromSpace } from '../../apis';
import { cloneDeep } from 'lodash';
export default function Space(props) {
  var visible = props.visible,
    title = props.title,
    info = props.info;
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    visibleSearch = _useState2[0],
    setVisibleSearch = _useState2[1];
  // 等待框
  var _useState3 = useState(false),
    _useState4 = _slicedToArray(_useState3, 2),
    isLoading = _useState4[0],
    setIsLoading = _useState4[1];
  // 数据
  var _useState5 = useState({}),
    _useState6 = _slicedToArray(_useState5, 2),
    listInfo = _useState6[0],
    setListInfo = _useState6[1];
  // 导航栏
  var _useState7 = useState([]),
    _useState8 = _slicedToArray(_useState7, 2),
    navList = _useState8[0],
    setNavList = _useState8[1];
  //   等级
  var _useState9 = useState(0),
    _useState10 = _slicedToArray(_useState9, 2),
    level = _useState10[0],
    setLevel = _useState10[1];
  //选择的空间信息
  var _useState11 = useState({}),
    _useState12 = _slicedToArray(_useState11, 2),
    spaceInfo = _useState12[0],
    setSpaceInfo = _useState12[1];
  var _useState13 = useState([]),
    _useState14 = _slicedToArray(_useState13, 2),
    spaceList = _useState14[0],
    setSpaceList = _useState14[1];
  //   用户选择数据
  var _useState15 = useState([]),
    _useState16 = _slicedToArray(_useState15, 2),
    userList = _useState16[0],
    setUserList = _useState16[1];
  var _useState17 = useState({
      name: '',
      searchInfo: '',
      parentId: '',
      sourceTableType: ''
    }),
    _useState18 = _slicedToArray(_useState17, 2),
    queryParams = _useState18[0],
    setQueryParams = _useState18[1];
  // 关闭
  var onClose = function onClose() {
    props.onClose && props.onClose();
  };
  // 取消
  var onCancel = function onCancel() {
    if (level == 0) {
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
    setLevel(level + 1);
    //如果选择的是空间，那么就不添加到导航栏
    if (obj.sourceTableType != 'space') {
      // 保存到导航
      setNavList([].concat(_toConsumableArray(navList), [obj]));
      //赋值数据
      var param = _objectSpread({}, listInfo);
      param[level + 1] = obj.childList || [];
      setListInfo(param);
    } else {
      obj.select = true;
      setSpaceInfo(obj);
      //获取下级数据
      getTreeListFromSpaceInfo({
        parentId: info.id,
        sourceTableType: info.sourceTableType,
        name: obj.name
      });
    }
  };
  // 选择--单选
  var selectInfo = function selectInfo(item) {
    var select = item.select;
    if (select) {
      //取消
      setUserList([]);
    } else {
      //新增
      // setUserList([item]);
      //其它的都设置为取消状态
      spaceList.map(function (l) {
        l.select = false;
      });
      listInfo[level] && listInfo[level].map(function (l) {
        l.select = false;
      });
      //初始化点击
      if (level == 0) {
        setUserList([item]);
      } else {
        //项目下级点击
        var _info = cloneDeep(item);
        _info.fullName += '/' + spaceInfo.name;
        setUserList([_info]);
      }
      setListInfo(listInfo);
      setSpaceList(spaceList);
    }
    item.select = select ? false : true;
  };
  var filterSel = function filterSel() {
    // 匹配当前的选中或者非选中状态
    var selectIds = userList.map(function (item) {
      return item.id;
    }) || [];
    spaceList.map(function (item) {
      var ls = selectIds.includes(item.id) ? true : false;
      item.select = ls;
    });
    listInfo[level] && listInfo[level].map(function (item) {
      var ls = selectIds.includes(item.id) ? true : false;
      item.select = ls;
    });
    setListInfo(_objectSpread({}, listInfo));
    setSpaceList(spaceList);
  };
  // 空间树
  var getTreeListFromSpaceInfo = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(obj) {
      var _res$data;
      var isFirst,
        res,
        list,
        _info2,
        param,
        _args = arguments;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              isFirst = _args.length > 1 && _args[1] !== undefined ? _args[1] : false;
              setIsLoading(true);
              _context.next = 4;
              return getTreeListFromSpace(_objectSpread(_objectSpread({}, queryParams), obj));
            case 4:
              res = _context.sent;
              list = ((_res$data = res.data) === null || _res$data === void 0 ? void 0 : _res$data.response) || [];
              setIsLoading(false);
              if (!isFirst) {
                _context.next = 11;
                break;
              }
              setNavList([info]);
              setSpaceList(list);
              return _context.abrupt("return");
            case 11:
              //如果是点击的空间就取childList
              if (obj.name && obj.sourceTableType == 'community') {
                _info2 = list[0];
                param = _objectSpread({}, listInfo);
                param[1] = _info2.childList || [];
                setListInfo(param);
              }
            case 12:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return function getTreeListFromSpaceInfo(_x) {
      return _ref.apply(this, arguments);
    };
  }();
  useEffect(function () {
    setNavList(_toConsumableArray(navList).splice(0, level > 1 ? level + 1 : level == 0 ? 1 : level));
    filterSel();
  }, [level]);
  useEffect(function () {
    filterSel();
  }, [userList]);
  useEffect(function () {
    //初始化
    if (info && Object.prototype.toString.call(info) === '[object Object]' && Object.keys(info).length > 0) {
      var query = {
        parentId: info.id,
        sourceTableType: info.sourceTableType
      };
      getTreeListFromSpaceInfo(query, true);
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
  }, level == 0 ? '取消' : /*#__PURE__*/React.createElement("img", {
    className: styles.backIcon,
    src: require('../../assets/images/right.png'),
    alt: ""
  })), level != 0 ? /*#__PURE__*/React.createElement("div", {
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
        setLevel(index);
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
  })) : null, level == 0 && spaceList.length || listInfo[level] && listInfo[level].length > 0 ? /*#__PURE__*/React.createElement("div", {
    className: styles.list
  }, (level == 0 ? spaceList : listInfo[level]).map(function (item, index) {
    return /*#__PURE__*/React.createElement("div", {
      key: item.id + '-' + index,
      className: styles.item
    }, item.isAllot == 1 ? /*#__PURE__*/React.createElement("div", {
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
        if (item.isAllot == 1) {
          selectInfo(item);
        } else if (item.sourceTableType != 'space' && item.childList && item.childList.length > 0 || item.sourceTableType == 'space' && level == 0) {
          next(item);
        }
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: styles.name
    }, item.name || '')), item.sourceTableType != 'space' && item.childList && item.childList.length > 0 || item.sourceTableType == 'space' && level == 0 ? /*#__PURE__*/React.createElement("div", {
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
      //情况
      setUserList([]);
    }
  }, userList.map(function (item) {
    return /*#__PURE__*/React.createElement("div", {
      key: item.id,
      className: styles.itemDet
    }, item.fullName);
  }))), /*#__PURE__*/React.createElement("div", {
    className: styles.btn,
    onClick: onConfirm
  }, "\u786E\u5B9A", userList.length ? "(".concat(userList.length, ")") : null)), /*#__PURE__*/React.createElement(SafeArea, {
    position: "bottom"
  }))), /*#__PURE__*/React.createElement(Search, {
    visible: visibleSearch,
    radio: true,
    type: 7,
    queryInfo: {
      parentId: info.id,
      sourceTableType: info.sourceTableType
    },
    onClose: function onClose() {
      setVisibleSearch(false);
    },
    onConfirm: function onConfirm(info) {
      var list = info.data || [];
      if (list.length > 0) {
        setLevel(0);
        var item = list[0] || {};
        setSpaceInfo(item);
        if (item.isAllot == 1) {
          //可以选择
          setUserList([item]);
        } else {
          //匹配
          next(item);
        }
      } else {
        //清空
        setSpaceInfo({});
        spaceList.map(function (l) {
          l.select = false;
        });
        listInfo[level] && listInfo[level].map(function (l) {
          l.select = false;
        });
        setListInfo(listInfo);
        setSpaceList(spaceList);
        setUserList([]);
      }
    }
  }));
}