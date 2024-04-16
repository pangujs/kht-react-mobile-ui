import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import React, { useState, useEffect } from 'react';
import { Popup, SafeArea } from 'antd-mobile';
import styles from "./index.module.css";
import { CheckOutline, DownOutline } from 'antd-mobile-icons';
export default function PopupSelect(props) {
  var visible = props.visible,
    title = props.title,
    _props$options = props.options,
    options = _props$options === void 0 ? [] : _props$options,
    _props$fieldNames = props.fieldNames,
    fieldNames = _props$fieldNames === void 0 ? {
      label: 'name',
      value: 'id'
    } : _props$fieldNames,
    _props$multiple = props.multiple,
    multiple = _props$multiple === void 0 ? false : _props$multiple;
  var _useState = useState([]),
    _useState2 = _slicedToArray(_useState, 2),
    list = _useState2[0],
    setList = _useState2[1];
  var onClose = function onClose() {
    props.onClose && props.onClose();
  };
  // 确定
  var onConfirm = function onConfirm(info) {
    props.onConfirm && props.onConfirm({
      data: info ? info : list.filter(function (item) {
        return item.select;
      })
    });
    onClose();
  };
  useEffect(function () {
    if (options && options.length && !list.length) {
      setList(options);
    }
  }, [options]);
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
    onClick: onClose
  }, /*#__PURE__*/React.createElement(DownOutline, null)), /*#__PURE__*/React.createElement("div", {
    className: styles.title
  }, title ? title : '请选择'), /*#__PURE__*/React.createElement("div", {
    className: styles.right,
    onClick: function onClick() {
      if (!multiple) return;
      onConfirm();
    }
  }, multiple ? '确认' : '')), /*#__PURE__*/React.createElement("div", {
    className: styles.list
  }, list.map(function (item, index) {
    return /*#__PURE__*/React.createElement("div", {
      className: "".concat(styles.item, " ").concat(item.select ? styles.active : ''),
      key: index,
      onClick: function onClick() {
        var lists = _toConsumableArray(list);
        var select = item.select;
        //如果是单选
        if (!multiple) {
          lists.map(function (m) {
            m.select = false;
          });
        }
        lists[index].select = !select;
        setList(lists);
        if (!multiple) {
          onConfirm([item]);
        }
      }
    }, /*#__PURE__*/React.createElement("span", null, item[fieldNames.label] || ''), item.select ? /*#__PURE__*/React.createElement(CheckOutline, null) : '');
  })), /*#__PURE__*/React.createElement(SafeArea, {
    position: "bottom"
  }))));
}