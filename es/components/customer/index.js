import _regeneratorRuntime from "@babel/runtime/helpers/esm/regeneratorRuntime";
import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _objectSpread from "@babel/runtime/helpers/esm/objectSpread2";
import _asyncToGenerator from "@babel/runtime/helpers/esm/asyncToGenerator";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import React, { useEffect, useState } from 'react';
import { Popup, Checkbox, SafeArea, DotLoading, PullToRefresh, InfiniteScroll, Toast } from 'antd-mobile';
import styles from "./index.module.css";
import { SearchOutline, FilterOutline, DownOutline } from 'antd-mobile-icons';
import { getCustomerWxWorkList, getCustomerWxWorkSimpleList } from '../../apis/index';
import { cloneDeep, uniqBy } from 'lodash';
import PopupFilter from '../popup-filter';
import Community from '../community';
import Resident from '../resident';
import People from '../people';
import Label from '../label';
import Executor from '../executor';
import Search from '../search';
import { Local } from '@/utils/storage';
export default function Customer(props) {
  var visible = props.visible,
    title = props.title,
    _props$gotoPortrait = props.gotoPortrait,
    gotoPortrait = _props$gotoPortrait === void 0 ? true : _props$gotoPortrait;
  // 等待框
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    isLoading = _useState2[0],
    setIsLoading = _useState2[1];
  var _useState3 = useState(false),
    _useState4 = _slicedToArray(_useState3, 2),
    visibleSearch = _useState4[0],
    setVisibleSearch = _useState4[1];
  var _useState5 = useState(false),
    _useState6 = _slicedToArray(_useState5, 2),
    visibleExecutor = _useState6[0],
    setVisibleExecutor = _useState6[1];
  var typeSourceList = {
    family: '家属',
    proprietor: '业主',
    tenant: '租户'
  };
  //   用户选择数据
  var _useState7 = useState([]),
    _useState8 = _slicedToArray(_useState7, 2),
    userList = _useState8[0],
    setUserList = _useState8[1];
  var _useState9 = useState({
      // 初始数据
      currentPage: 1,
      pageSize: 10,
      communityId: null,
      type: '',
      residentType: '',
      employeeType: 1,
      employeeCodeList: null
    }),
    _useState10 = _slicedToArray(_useState9, 2),
    queryParams = _useState10[0],
    setQueryParams = _useState10[1];
  var _useState11 = useState(0),
    _useState12 = _slicedToArray(_useState11, 2),
    totalCount = _useState12[0],
    setTotalCount = _useState12[1];
  // 列表数据
  var _useState13 = useState([]),
    _useState14 = _slicedToArray(_useState13, 2),
    list = _useState14[0],
    setList = _useState14[1];
  // 下滑
  var _useState15 = useState(false),
    _useState16 = _slicedToArray(_useState15, 2),
    hasMore = _useState16[0],
    setHasMore = _useState16[1];
  //添加人信息
  var _useState17 = useState({
      type: '1',
      data: []
    }),
    _useState18 = _slicedToArray(_useState17, 2),
    peopleInfo = _useState18[0],
    setPeopleInfo = _useState18[1];
  // 项目信息
  var _useState19 = useState([]),
    _useState20 = _slicedToArray(_useState19, 2),
    communityList = _useState20[0],
    setCommunityList = _useState20[1];
  // 住户信息
  var _useState21 = useState([]),
    _useState22 = _slicedToArray(_useState21, 2),
    residentList = _useState22[0],
    setResidentList = _useState22[1];
  // 标签信息
  var _useState23 = useState([]),
    _useState24 = _slicedToArray(_useState23, 2),
    labelList = _useState24[0],
    setLabelList = _useState24[1];
  // 筛选
  var _useState25 = useState(false),
    _useState26 = _slicedToArray(_useState25, 2),
    visibleFilter = _useState26[0],
    setVisibleFilter = _useState26[1];
  var _useState27 = useState(false),
    _useState28 = _slicedToArray(_useState27, 2),
    visibleCommunity = _useState28[0],
    setVisibleCommunity = _useState28[1];
  var _useState29 = useState(false),
    _useState30 = _slicedToArray(_useState29, 2),
    visibleResident = _useState30[0],
    setVisibleResident = _useState30[1];
  var _useState31 = useState(false),
    _useState32 = _slicedToArray(_useState31, 2),
    visiblePeople = _useState32[0],
    setVisiblePeople = _useState32[1];
  var _useState33 = useState(false),
    _useState34 = _slicedToArray(_useState33, 2),
    visibleLabel = _useState34[0],
    setVisibleLabel = _useState34[1];
  //   是全选，还是取消全选
  var _useState35 = useState(false),
    _useState36 = _slicedToArray(_useState35, 2),
    isSelectAll = _useState36[0],
    setIsSelectAll = _useState36[1];
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
  // 获取列表数据
  var getfindPage = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      var refresh,
        query,
        _res$data,
        _res$data$response,
        _res$data2,
        _res$data2$response,
        params,
        res,
        listData,
        _args = arguments;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              refresh = _args.length > 0 && _args[0] !== undefined ? _args[0] : false;
              query = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
              _context.prev = 2;
              setIsLoading(true);
              setHasMore(false); //先不让下滑
              params = cloneDeep(query);
              if (refresh) {
                params.currentPage = 1;
              } else {
                params.currentPage++;
              }
              setQueryParams(_objectSpread(_objectSpread({}, query), params));
              _context.next = 10;
              return getCustomerWxWorkList(params);
            case 10:
              res = _context.sent;
              listData = ((_res$data = res.data) === null || _res$data === void 0 ? void 0 : (_res$data$response = _res$data.response) === null || _res$data$response === void 0 ? void 0 : _res$data$response.dataList) || [];
              listData.forEach(function (item) {
                item.isEmployee = true;
                item.select = isSelectAll;
              });
              if (refresh) {
                setList(listData);
              } else {
                setList([].concat(_toConsumableArray(list), _toConsumableArray(listData)));
              }
              //判断当前是否还能进行下一页
              setHasMore(listData.length < params.pageSize ? false : true);
              setTotalCount(((_res$data2 = res.data) === null || _res$data2 === void 0 ? void 0 : (_res$data2$response = _res$data2.response) === null || _res$data2$response === void 0 ? void 0 : _res$data2$response.totalCount) || 0);
              console.log(hasMore, 'has');
              setIsLoading(false);
              _context.next = 24;
              break;
            case 20:
              _context.prev = 20;
              _context.t0 = _context["catch"](2);
              setHasMore(false);
              setIsLoading(false);
            case 24:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[2, 20]]);
    }));
    return function getfindPage() {
      return _ref.apply(this, arguments);
    };
  }();
  //获取更多
  var loadMore = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              getfindPage(false, queryParams);
            case 1:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));
    return function loadMore() {
      return _ref2.apply(this, arguments);
    };
  }();
  var selectInfo = function selectInfo(item) {
    var select = item.select;
    var list = userList;
    //还得考虑点击的是部门还是员工按钮
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
  };
  var selectAllOrCancel = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
      var _res$data3, res, listData;
      return _regeneratorRuntime().wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (!isSelectAll) {
                _context3.next = 6;
                break;
              }
              //反选
              list.map(function (item) {
                item.select = false;
              });
              setList(_toConsumableArray(list));
              setUserList([]);
              _context3.next = 16;
              break;
            case 6:
              //选中
              setIsLoading(true);
              _context3.next = 9;
              return getCustomerWxWorkSimpleList(_objectSpread(_objectSpread({}, queryParams), {}, {
                currentPage: 1,
                pageSize: 10000
              }));
            case 9:
              res = _context3.sent;
              listData = ((_res$data3 = res.data) === null || _res$data3 === void 0 ? void 0 : _res$data3.response) || [];
              listData.map(function (item) {
                item.isEmployee = true;
                // item.select = true;
              });

              list.map(function (item) {
                item.select = true;
              });
              setList(_toConsumableArray(list));
              setUserList(_toConsumableArray(listData));
              setIsLoading(false);
            case 16:
              setIsSelectAll(!isSelectAll);
            case 17:
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
  // 筛选条件
  var onConfirmFilter = function onConfirmFilter(data) {
    console.log(data);
    //身份
    var ids = data.ids;
    //初始化搜索
    var query = {
      residentType: ids[1],
      type: ids[2]
    };
    getfindPage(true, _objectSpread(_objectSpread({}, queryParams), query));
  };
  // 项目
  var onConfirmCommunity = function onConfirmCommunity(data) {
    console.log(data);
    var list = (data === null || data === void 0 ? void 0 : data.data) || [];
    setCommunityList(list);
    //小区筛选
    var query = {
      // 住户清空
      residentIds: [],
      communityId: list.length > 0 ? list.map(function (item) {
        return item.id;
      }) : null
    };
    getfindPage(true, _objectSpread(_objectSpread({}, queryParams), query));
    setResidentList([]);
    //取消全选
    setIsSelectAll(false);
  };
  // 住户
  var onConfirmResident = function onConfirmResident(data) {
    console.log(data);
    var list = (data === null || data === void 0 ? void 0 : data.data) || [];
    setResidentList(list);
    //标签搜索
    var query = {
      communityId: list.length > 0 ? null : queryParams.communityId,
      residentIds: list.length > 0 ? list.map(function (item) {
        return item.residentId;
      }) : null
    };
    getfindPage(true, _objectSpread(_objectSpread({}, queryParams), query));
    //取消全选
    setIsSelectAll(false);
  };
  // 成员
  var onConfirmPeople = function onConfirmPeople(data) {
    console.log(data);
    setPeopleInfo(data);
    var query = {
      employeeType: data.type
    };
    if (data.type != 3) {
      query.employeeCodeList = null;
    } else {
      query.employeeCodeList = data.data.map(function (item) {
        return item.code;
      });
    }
    getfindPage(true, _objectSpread(_objectSpread({}, queryParams), query));
    //取消全选
    setIsSelectAll(false);
  };
  var onConfirmLabel = function onConfirmLabel(data) {
    console.log(data);
    var list = (data === null || data === void 0 ? void 0 : data.data) || [];
    setLabelList(list);
    //标签搜索
    var query = {
      tagIdList: list.length > 0 ? list.map(function (item) {
        return item.id;
      }) : null
    };
    getfindPage(true, _objectSpread(_objectSpread({}, queryParams), query));
    //取消全选
    setIsSelectAll(false);
  };
  var filterSel = function filterSel() {
    // 匹配当前的选中或者非选中状态
    var selectIds = userList.map(function (item) {
      return item.id;
    }) || [];
    list.map(function (item) {
      if (item.isEmployee) {
        var ls = selectIds.includes(item.id) ? true : false;
        item.select = ls;
      }
    });
    setList(_toConsumableArray(list));
  };
  useEffect(function () {
    filterSel();
  }, [userList]);
  useEffect(function () {
    getfindPage(true, queryParams);
  }, []);
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
    onClick: onClose
  }, /*#__PURE__*/React.createElement("img", {
    className: styles.backIcon,
    src: require('../../assets/images/right.png'),
    alt: ""
  })), /*#__PURE__*/React.createElement("div", {
    className: styles.title
  }, title || '选择客户'), /*#__PURE__*/React.createElement("div", {
    className: styles.right
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.right,
    onClick: selectAllOrCancel
  }, isSelectAll ? '取消全选' : '全选'))), /*#__PURE__*/React.createElement("div", {
    className: styles.containerSearch
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.searchInfo,
    onClick: function onClick() {
      setVisibleSearch(true);
    }
  }, /*#__PURE__*/React.createElement(SearchOutline, {
    className: styles.searchIcon
  }), /*#__PURE__*/React.createElement("span", null, "\u641C\u7D22"))), /*#__PURE__*/React.createElement("div", {
    className: styles.filtrateInfo
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.filtrate
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.filtrateList
  }, /*#__PURE__*/React.createElement("div", {
    className: "".concat(styles.filtrateItem, " ").concat(peopleInfo.type != '1' ? styles.filtrateItemActive : ''),
    onClick: function onClick() {
      setVisiblePeople(true);
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.filtrateItemTitle
  }, peopleInfo.type == 2 ? '全部' : peopleInfo.type == 3 ? "".concat(peopleInfo.data[0].name, "\u7B49").concat(peopleInfo.data.length, "\u4EBA") : '我的'), /*#__PURE__*/React.createElement(DownOutline, {
    className: styles.filtrateIcon
  })), /*#__PURE__*/React.createElement("div", {
    className: "".concat(styles.filtrateItem, " ").concat(labelList.length > 0 ? styles.filtrateItemActive : ''),
    onClick: function onClick() {
      setVisibleLabel(true);
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.filtrateItemTitle
  }, labelList.length ? "".concat(labelList[0].name, "\u7B49").concat(labelList.length, "\u4E2A\u6807\u7B7E") : '不限标签'), /*#__PURE__*/React.createElement(DownOutline, {
    className: styles.filtrateIcon
  })), /*#__PURE__*/React.createElement("div", {
    className: "".concat(styles.filtrateItem, " ").concat(communityList.length > 0 ? styles.filtrateItemActive : ''),
    onClick: function onClick() {
      setVisibleCommunity(true);
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.filtrateItemTitle
  }, communityList.length ? "".concat(communityList[0].name, "\u7B49").concat(communityList.length, "\u4E2A\u9879\u76EE") : '项目'), /*#__PURE__*/React.createElement(DownOutline, {
    className: styles.filtrateIcon
  })), /*#__PURE__*/React.createElement("div", {
    className: "".concat(styles.filtrateItem, " ").concat(residentList.length > 0 ? styles.filtrateItemActive : ''),
    onClick: function onClick() {
      //判断有没有项目
      if (communityList.length == 0) {
        Toast.show('请先选择项目');
        return;
      }
      setVisibleResident(true);
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.filtrateItemTitle
  }, residentList.length ? "".concat(residentList[0].name, "\u7B49").concat(residentList.length, "\u4F4F\u6237") : '住户'), /*#__PURE__*/React.createElement(DownOutline, {
    className: styles.filtrateIcon
  }))), /*#__PURE__*/React.createElement("div", {
    className: styles.fil,
    onClick: function onClick() {
      setVisibleFilter(true);
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      marginRight: '5px'
    }
  }, "\u7B5B\u9009"), /*#__PURE__*/React.createElement(FilterOutline, null)))), /*#__PURE__*/React.createElement("div", {
    className: styles.statistics
  }, "\u7B5B\u9009\u51FA", totalCount, "\u4F4D\u5BA2\u6237"), isLoading ? /*#__PURE__*/React.createElement("div", {
    className: styles.lodaing
  }, /*#__PURE__*/React.createElement(DotLoading, {
    color: "primary"
  })) : null, /*#__PURE__*/React.createElement("div", {
    className: styles.listInfo
  }, list.length > 0 ? /*#__PURE__*/React.createElement(PullToRefresh, {
    onRefresh: function () {
      var _onRefresh = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                getfindPage(true, queryParams);
              case 1:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));
      function onRefresh() {
        return _onRefresh.apply(this, arguments);
      }
      return onRefresh;
    }()
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.list
  }, list.map(function (item) {
    return /*#__PURE__*/React.createElement("div", {
      className: styles.item,
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
      className: styles.right,
      onClick: function onClick() {
        //跳转到客户画像
        if (!gotoPortrait) return;
        var id = item.id,
          code = item.code,
          name = item.name;
        window.history.pushState({
          state: {
            id: id,
            customerCode: code,
            name: name
          }
        }, '', "/chat/client/portrait/base?id=".concat(item.id));
        Local.set('customerId', id);
        Local.set('customerCode', code);
      }
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
  })), /*#__PURE__*/React.createElement(InfiniteScroll, {
    loadMore: loadMore,
    hasMore: hasMore
  }, /*#__PURE__*/React.createElement("span", null))) : /*#__PURE__*/React.createElement("div", {
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
    className: styles.userList,
    onClick: function onClick() {
      setVisibleExecutor(true);
    }
  }, !userList.length ? null : /*#__PURE__*/React.createElement("div", {
    className: styles.itemAll
  }, "\u5168\u90E8"), userList.map(function (item) {
    return /*#__PURE__*/React.createElement("div", {
      key: item.id,
      className: styles.item
    }, /*#__PURE__*/React.createElement("img", {
      className: styles.images,
      src: item.avatar || require('../../assets/images/profile-default.png'),
      alt: ""
    }));
  }))), /*#__PURE__*/React.createElement("div", {
    className: styles.btn,
    onClick: onConfirm
  }, "\u786E\u5B9A", userList.length ? "(".concat(userList.length, ")") : null)), /*#__PURE__*/React.createElement(SafeArea, {
    position: "bottom"
  }))), /*#__PURE__*/React.createElement(PopupFilter, {
    visible: visibleFilter,
    options: [{
      name: '身份',
      id: '1',
      children: [{
        name: '全部',
        id: ''
      }, {
        name: '业主',
        id: 'proprietor'
      }, {
        name: '家属',
        id: 'family'
      }, {
        name: '租客',
        id: 'tenant'
      }]
    }, {
      name: '客户类型',
      id: '2',
      children: [{
        name: '全部类型',
        id: ''
      }, {
        name: '微信客户',
        id: 'wechat'
      }, {
        name: '企微客户',
        id: 'wxwork'
      }]
    }],
    onClose: function onClose() {
      setVisibleFilter(false);
    },
    onConfirm: onConfirmFilter
  }), /*#__PURE__*/React.createElement(Community, {
    visible: visibleCommunity,
    radio: true,
    onClose: function onClose() {
      setVisibleCommunity(false);
    },
    onConfirm: onConfirmCommunity
  }), /*#__PURE__*/React.createElement(Resident, {
    visible: visibleResident,
    info: communityList[0],
    onClose: function onClose() {
      setVisibleResident(false);
    },
    onConfirm: onConfirmResident
  }), /*#__PURE__*/React.createElement(People, {
    visible: visiblePeople,
    onClose: function onClose() {
      setVisiblePeople(false);
    },
    onConfirm: onConfirmPeople
  }), /*#__PURE__*/React.createElement(Label, {
    visible: visibleLabel,
    onClose: function onClose() {
      setVisibleLabel(false);
    },
    onConfirm: onConfirmLabel
  }), /*#__PURE__*/React.createElement(Executor, {
    title: '全部客户',
    visible: visibleExecutor,
    type: 2,
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
  }), /*#__PURE__*/React.createElement(Search, {
    visible: visibleSearch,
    type: 8,
    onClose: function onClose() {
      setVisibleSearch(false);
    },
    onConfirm: function onConfirm(info) {
      var list = info.data || [];
      list = [].concat(_toConsumableArray(userList), _toConsumableArray(list));
      //再去重
      list = uniqBy(list, 'id');
      setUserList(list);
    }
  }));
}