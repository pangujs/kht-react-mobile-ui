import _objectSpread from "@babel/runtime/helpers/esm/objectSpread2";
import _regeneratorRuntime from "@babel/runtime/helpers/esm/regeneratorRuntime";
import _asyncToGenerator from "@babel/runtime/helpers/esm/asyncToGenerator";
import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import React, { useState, useEffect } from 'react';
import { Input, Popup, SafeArea } from 'antd-mobile';
import styles from "./index.module.css";
import { DownOutline, SearchOutline } from 'antd-mobile-icons';
import ClassifyLevel from '../classify-level';
import { cloneDeep, uniqBy } from 'lodash';
import { customerList } from '../../apis/index';
import { isMobile } from '../../utils';
export default function PopupFilter(props) {
  var visible = props.visible,
    title = props.title,
    _props$defaultList = props.defaultList,
    defaultList = _props$defaultList === void 0 ? [] : _props$defaultList,
    _props$isResetAll = props.isResetAll,
    isResetAll = _props$isResetAll === void 0 ? false : _props$isResetAll;
  var _useState = useState([]),
    _useState2 = _slicedToArray(_useState, 2),
    list = _useState2[0],
    setList = _useState2[1];
  var _useState3 = useState([]),
    _useState4 = _slicedToArray(_useState3, 2),
    listReset = _useState4[0],
    setListReset = _useState4[1];
  var _useState5 = useState([]),
    _useState6 = _slicedToArray(_useState5, 2),
    searchList = _useState6[0],
    setSearchList = _useState6[1];
  var _useState7 = useState([]),
    _useState8 = _slicedToArray(_useState7, 2),
    searchListReset = _useState8[0],
    setSearchListReset = _useState8[1];
  var _useState9 = useState(false),
    _useState10 = _slicedToArray(_useState9, 2),
    visibleLabel = _useState10[0],
    setVisibleLabel = _useState10[1];
  var _useState11 = useState(false),
    _useState12 = _slicedToArray(_useState11, 2),
    isSearch = _useState12[0],
    setIsSearch = _useState12[1];
  var _useState13 = useState([]),
    _useState14 = _slicedToArray(_useState13, 2),
    categoryList = _useState14[0],
    setCategoryList = _useState14[1];
  var _useState15 = useState({
      tagName: '',
      tagGroupCategoryIds: null
    }),
    _useState16 = _slicedToArray(_useState15, 2),
    queryParams = _useState16[0],
    setQueryParams = _useState16[1];
  var onClose = function onClose() {
    props.onClose && props.onClose();
  };
  // 确定
  var onConfirm = function onConfirm() {
    //判断是否是在搜索列表点击的确认
    var lists = [];
    if (isSearch) {
      list.map(function (item) {
        item.tag && item.tag.map(function (itemSmall) {
          if (itemSmall.select) {
            lists.push(itemSmall);
          }
        });
      });
      searchList.map(function (item) {
        item.tag && item.tag.map(function (itemSmall) {
          if (itemSmall.select) {
            lists.push(itemSmall);
          }
        });
      });
    } else {
      list.map(function (item) {
        item.tag && item.tag.map(function (itemSmall) {
          if (itemSmall.select) {
            lists.push(itemSmall);
          }
        });
      });
    }
    //去重
    lists = uniqBy(lists, 'id');
    props.onConfirm && props.onConfirm({
      data: lists
    });
    onClose();
    //如果是搜索点击的确认，全部初始化一遍
    if (isSearch || isResetAll) {
      setList([]);
      setIsSearch(false);
      setListReset([]);
      setSearchList([]);
      setSearchListReset([]);
      setQueryParams({
        tagName: '',
        tagGroupCategoryIds: null
      });
    }
  };
  var onReset = function onReset() {
    if (isSearch) {
      setSearchList(_toConsumableArray(searchListReset));
    } else {
      setList(_toConsumableArray(listReset));
    }
  };
  var getcustomerList = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(query) {
      var _res$data;
      var isFirst,
        res,
        list,
        ids,
        _args = arguments;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              isFirst = _args.length > 1 && _args[1] !== undefined ? _args[1] : false;
              _context.next = 3;
              return customerList(query);
            case 3:
              res = _context.sent;
              list = ((_res$data = res.data) === null || _res$data === void 0 ? void 0 : _res$data.response) || [];
              if (isSearch) {
                setSearchList(list);
                setSearchListReset(cloneDeep(list));
              } else {
                if (isFirst && defaultList.length > 0) {
                  ids = defaultList.map(function (item) {
                    return item.id;
                  }); //设置选中
                  list.map(function (item) {
                    item.tag && item.tag.map(function (itemSmall) {
                      if (ids.includes(itemSmall.id)) {
                        itemSmall.select = true; //选中
                      }
                    });
                  });
                }

                setList(list);
                setListReset(cloneDeep(list));
              }
            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return function getcustomerList(_x) {
      return _ref.apply(this, arguments);
    };
  }();
  var onConfirmLabel = function onConfirmLabel(data) {
    setCategoryList(data.data || []);
    var params = _objectSpread(_objectSpread({}, queryParams), {}, {
      tagGroupCategoryIds: data.data.map(function (item) {
        return item.id;
      })
    });
    setQueryParams(params);
    getcustomerList(params);
  };
  var submit = function submit() {
    //请求数据
    getcustomerList(queryParams);
  };
  useEffect(function () {
    if (visible && list.length == 0) {
      getcustomerList(queryParams, true);
    }
  }, [visible]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Popup, {
    visible: visible,
    position: "bottom",
    onClose: onClose,
    onMaskClick: onClose,
    bodyStyle: {
      height: '85vh',
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
    onClick: onClose
  }, /*#__PURE__*/React.createElement(DownOutline, null)), /*#__PURE__*/React.createElement("div", {
    className: styles.title
  }, title ? title : '选择标签'), /*#__PURE__*/React.createElement("div", {
    className: styles.right
  })), /*#__PURE__*/React.createElement("div", {
    className: styles.containerSearch
  }, isSearch ? /*#__PURE__*/React.createElement("div", {
    className: styles.inputInfo
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.input
  }, /*#__PURE__*/React.createElement("img", {
    className: styles.infoIcon,
    src: require('../../assets/images/search.png'),
    alt: ""
  }), /*#__PURE__*/React.createElement(Input, {
    placeholder: "\u641C\u7D22",
    autoFocus: true,
    maxLength: 20,
    value: queryParams.tagName,
    clearable: true,
    onChange: function onChange(v) {
      setQueryParams(_objectSpread(_objectSpread({}, queryParams), {}, {
        tagName: v
      }));
    },
    onClear: function onClear() {
      setQueryParams(_objectSpread(_objectSpread({}, queryParams), {}, {
        tagName: ''
      }));
    },
    onBlur: function onBlur() {
      if (isMobile()) {
        submit();
      }
    },
    onEnterPress: submit
  })), /*#__PURE__*/React.createElement("div", {
    className: styles.close,
    onClick: function onClick() {
      setIsSearch(false);
      setQueryParams(_objectSpread(_objectSpread({}, queryParams), {}, {
        tagName: ''
      }));
    }
  }, "\u53D6\u6D88")) : /*#__PURE__*/React.createElement("div", {
    className: styles.searchInfo,
    onClick: function onClick() {
      //初始化所有数据
      setSearchList([]);
      setSearchListReset([]);
      setIsSearch(true);
    }
  }, /*#__PURE__*/React.createElement(SearchOutline, {
    className: styles.searchIcon
  }), /*#__PURE__*/React.createElement("span", null, "\u641C\u7D22"))), /*#__PURE__*/React.createElement("div", {
    className: styles.labelType,
    onClick: function onClick() {
      setVisibleLabel(true);
    }
  }, /*#__PURE__*/React.createElement("span", null, categoryList.length ? categoryList[0].name + '等...' : '标签分类'), ' ', /*#__PURE__*/React.createElement(DownOutline, null)), /*#__PURE__*/React.createElement("div", {
    className: styles.list
  }, (isSearch ? searchList : list).map(function (item) {
    return /*#__PURE__*/React.createElement("div", {
      className: styles.item,
      key: item.groupId
    }, /*#__PURE__*/React.createElement("div", {
      className: styles.title
    }, item.groupName || ''), /*#__PURE__*/React.createElement("div", {
      className: styles.children
    }, item.tag && item.tag.map(function (itemSmall) {
      return /*#__PURE__*/React.createElement("div", {
        className: "".concat(styles.name, " ").concat(itemSmall.select ? styles.active : ''),
        key: itemSmall.id,
        onClick: function onClick() {
          // item.tag.map((m: any) => {
          //   m.select = false;
          // });
          var select = itemSmall.select;
          itemSmall.select = !select;
          if (isSearch) {
            setSearchList(_toConsumableArray(searchList));
          } else {
            setList(_toConsumableArray(list));
          }
        }
      }, itemSmall.name || '');
    })));
  })), /*#__PURE__*/React.createElement("div", {
    className: styles.footer
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.item,
    onClick: onReset
  }, "\u91CD\u7F6E"), /*#__PURE__*/React.createElement("div", {
    className: "".concat(styles.item, " ").concat(styles.active),
    onClick: onConfirm
  }, "\u5B8C\u6210")), /*#__PURE__*/React.createElement(SafeArea, {
    position: "bottom"
  }))), /*#__PURE__*/React.createElement(ClassifyLevel, {
    visible: visibleLabel,
    title: "\u9009\u62E9\u6807\u7B7E\u5206\u7C7B",
    apiUrl: '/tag/tag/category/page',
    queryInfo: {
      page: {
        currentPage: 1,
        pageSize: 10000
      }
    },
    multiple: true,
    onNextOperation: function onNextOperation(item) {
      return item.existLowerLevelNode;
    },
    onClose: function onClose() {
      setVisibleLabel(false);
    },
    onConfirm: onConfirmLabel
  }));
}