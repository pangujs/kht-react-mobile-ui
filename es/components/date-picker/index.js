import _objectSpread from "@babel/runtime/helpers/esm/objectSpread2";
import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import React, { useState, useCallback, useEffect } from 'react';
import { DatePicker, Popup, SafeArea, Toast } from 'antd-mobile';
import styles from "./index.module.css";
import moment from 'moment';
import { CheckOutline } from 'antd-mobile-icons';
export default function DatePickerPopup(props) {
  var visible = props.visible,
    _props$type = props.type,
    type = _props$type === void 0 ? 1 : _props$type,
    _props$retentionHisto = props.retentionHistory,
    retentionHistory = _props$retentionHisto === void 0 ? true : _props$retentionHisto;
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    dateVisible = _useState2[0],
    setDateVisible = _useState2[1];
  var now = new Date();
  // 是否是自定义的
  var _useState3 = useState([{
      name: '今天',
      id: 1
    }, {
      name: '昨天',
      id: 2
    }, {
      name: '本周',
      id: 3
    }, {
      name: '上周',
      id: 4
    }, {
      name: '本月',
      id: 5
    }, {
      name: '上月',
      id: 6
    }, {
      name: '过去7天',
      id: 7
    }, {
      name: '过去30天',
      id: 8
    }, {
      name: '过去180天',
      id: 9
    }, {
      name: '自定义时间',
      id: 10
    }]),
    _useState4 = _slicedToArray(_useState3, 2),
    list = _useState4[0],
    setList = _useState4[1];
  // 是开始还是结束
  var _useState5 = useState(1),
    _useState6 = _slicedToArray(_useState5, 2),
    isStartEnd = _useState6[0],
    setIsStartEnd = _useState6[1]; //1是开始，2是结束
  // 选择的区间
  var _useState7 = useState({
      startDate: null,
      endDate: null
    }),
    _useState8 = _slicedToArray(_useState7, 2),
    startEndTime = _useState8[0],
    setStartEndTime = _useState8[1];
  var labelRenderer = useCallback(function (type, data) {
    switch (type) {
      case 'year':
        return data + '年';
      case 'month':
        return data + '月';
      case 'day':
        return data + '日';
      default:
        return data;
    }
  }, []);
  var onClose = function onClose() {
    setDateVisible(false);
    props.onClose && props.onClose();
  };
  // 时间筛选
  var filterTimer = function filterTimer() {
    var info = list.find(function (item) {
      return item.select;
    });
    if (!info) {
      props.onConfirm && props.onConfirm({
        date: [],
        name: '全部',
        type: ''
      });
      onClose();
      return;
    }
    var item = {};
    var day1 = null;
    var day2 = null;
    switch (info.id) {
      case 1:
        day1 = moment().format('YYYY-MM-DD');
        day2 = moment().format('YYYY-MM-DD');
        break;
      case 2:
        day1 = moment().startOf('day').subtract(1, 'days').format('YYYY-MM-DD');
        day2 = moment().startOf('day').subtract(1, 'days').format('YYYY-MM-DD');
        break;
      case 3:
        day1 = moment().weekday(1).format('YYYY-MM-DD');
        day2 = moment().weekday(7).format('YYYY-MM-DD');
        break;
      case 4:
        day1 = moment().subtract(new Date().getDay() + 6, 'days').format('YYYY-MM-DD');
        day2 = moment().subtract(new Date().getDay(), 'days').format('YYYY-MM-DD');
        break;
      case 5:
        day1 = moment(moment().month(moment().month()).startOf('month').valueOf()).format('YYYY-MM-DD');
        day2 = moment(moment().month(moment().month()).endOf('month').valueOf()).format('YYYY-MM-DD');
        break;
      case 6:
        day1 = moment(moment().month(moment().month() - 1).startOf('month').valueOf()).format('YYYY-MM-DD');
        day2 = moment(moment().month(moment().month() - 1).endOf('month').valueOf()).format('YYYY-MM-DD');
        break;
      case 7:
        day1 = moment().startOf('day').subtract(7, 'days').format('YYYY-MM-DD');
        day2 = moment().startOf('day').subtract(1, 'days').format('YYYY-MM-DD');
        break;
      case 8:
        day1 = moment().startOf('day').subtract(30, 'days').format('YYYY-MM-DD');
        day2 = moment().startOf('day').subtract(1, 'days').format('YYYY-MM-DD');
        break;
      case 9:
        day1 = moment().startOf('day').subtract(180, 'days').format('YYYY-MM-DD');
        day2 = moment().startOf('day').subtract(1, 'days').format('YYYY-MM-DD');
        break;
      case 10:
        //自定义的
        setDateVisible(true);
        return;
    }
    item = {
      date: [day1, day2],
      type: info.id,
      name: info.name
    };
    props.onConfirm && props.onConfirm(item);
    onClose();
  };
  var onCloseDate = function onCloseDate() {
    setDateVisible(false);
    if (type == 2) {
      onClose();
    }
  };
  useEffect(function () {
    console.log(startEndTime, 'startEndTime');
    if (startEndTime && startEndTime.startDate && startEndTime.endDate) {
      //先判断结束时间和开始时间对比
      if (moment(startEndTime.endDate).diff(moment(startEndTime.startDate)) < 0) {
        Toast.show('结束时间不能小于开始时间');
        return;
      }
      var info = {
        date: [startEndTime.startDate, startEndTime.endDate],
        name: startEndTime.startDateText + '-' + startEndTime.endDateText,
        type: 10
      };
      props.onConfirm && props.onConfirm(info);
      onClose();
    }
  }, [startEndTime]);
  useEffect(function () {
    if (!visible && !retentionHistory) {
      list.map(function (item) {
        item.select = false;
      });
      setList(list);
      //初始化
      setIsStartEnd(1);
      setStartEndTime({
        startDate: null,
        endDate: null
      });
    }
  }, [visible]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, type == 2 ? null :
  /*#__PURE__*/
  //默认的
  React.createElement(Popup, {
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
    onClick: onClose
  }, "\u53D6\u6D88"), /*#__PURE__*/React.createElement("div", {
    className: styles.right,
    onClick: filterTimer
  }, "\u786E\u5B9A")), /*#__PURE__*/React.createElement("div", {
    className: styles.list
  }, list.map(function (item, index) {
    return /*#__PURE__*/React.createElement("div", {
      className: "".concat(styles.item, " ").concat(item.select ? styles.active : ''),
      key: index,
      onClick: function onClick() {
        var lists = _toConsumableArray(list);
        var select = item.select;
        lists.map(function (m) {
          m.select = false;
        });
        lists[index].select = !select;
        setList(lists);
      }
    }, /*#__PURE__*/React.createElement("span", null, item.name || ''), item.select ? /*#__PURE__*/React.createElement(CheckOutline, null) : '');
  })), /*#__PURE__*/React.createElement(SafeArea, {
    position: "bottom"
  }))), /*#__PURE__*/React.createElement(DatePicker, {
    visible: type == 2 ? visible : dateVisible,
    cancelText: "",
    getContainer: document.getElementById('root'),
    max: new Date(),
    title: [/*#__PURE__*/React.createElement("div", {
      key: 1,
      className: styles.dateInfo
    }, /*#__PURE__*/React.createElement("div", {
      className: "".concat(styles.dateItem, " ").concat(isStartEnd == 1 ? styles.dateItemActive : ''),
      onClick: function onClick() {
        setIsStartEnd(1);
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: styles.time
    }, "\u5F00\u59CB"), /*#__PURE__*/React.createElement("div", {
      className: styles.time
    }, startEndTime.startDate || '')), /*#__PURE__*/React.createElement("div", {
      className: "".concat(styles.dateItem, " ").concat(isStartEnd == 2 ? styles.dateItemActive : ''),
      onClick: function onClick() {
        setIsStartEnd(2);
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: styles.time
    }, "\u7ED3\u675F"), /*#__PURE__*/React.createElement("div", {
      className: styles.time
    }, startEndTime.endDate || '')))],
    defaultValue: now,
    onConfirm: function onConfirm(val) {
      var time = moment(val).format('YYYY-MM-DD');
      var time2 = moment(val).format('YYYY/MM/DD');
      if (isStartEnd == 1) {
        setStartEndTime(_objectSpread(_objectSpread({}, startEndTime), {}, {
          startDate: time,
          startDateText: time2
        }));
        //跳到第二列去
        setIsStartEnd(2);
      } else {
        //先判断结束时间和开始时间对比
        if (moment(val).diff(moment(startEndTime.startDate)) < 0) {
          Toast.show('结束时间不能小于开始时间');
          return;
        }
        setStartEndTime(_objectSpread(_objectSpread({}, startEndTime), {}, {
          endDate: time,
          endDateText: time2
        }));
      }
    },
    onCancel: onCloseDate,
    renderLabel: labelRenderer
  }));
}