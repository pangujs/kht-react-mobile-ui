import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _objectSpread from "@babel/runtime/helpers/esm/objectSpread2";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import React, { useState, useEffect } from 'react';
import { Popup, SafeArea } from 'antd-mobile';
import styles from "./index.module.css";
import { DownOutline } from 'antd-mobile-icons';
import { cloneDeep } from 'lodash';
export default function PopupFilter(props) {
  var visible = props.visible,
    title = props.title,
    _props$options = props.options,
    options = _props$options === void 0 ? [] : _props$options,
    _props$initResetNumbe = props.initResetNumber,
    initResetNumber = _props$initResetNumbe === void 0 ? 0 : _props$initResetNumbe;
  var _useState = useState([]),
    _useState2 = _slicedToArray(_useState, 2),
    list = _useState2[0],
    setList = _useState2[1];
  var _useState3 = useState([]),
    _useState4 = _slicedToArray(_useState3, 2),
    listReset = _useState4[0],
    setListReset = _useState4[1];
  var onClose = function onClose() {
    props.onClose && props.onClose();
  };
  // 确定
  var onConfirm = function onConfirm() {
    var ids = {};
    var lists = list.map(function (item) {
      var children = item.children && item.children.filter(function (itemSmall) {
        return itemSmall.select;
      }) || [];
      if (children && children.length > 0) {
        ids[item.id] = children[0].id;
        return _objectSpread(_objectSpread({}, item), {}, {
          children: children
        });
      }
    });
    props.onConfirm && props.onConfirm({
      data: lists,
      ids: ids
    });
    onClose();
  };
  var onReset = function onReset() {
    setList(cloneDeep(listReset));
  };
  useEffect(function () {
    if (options && options.length && !list.length) {
      //初始化数据
      var l = cloneDeep(options);
      l.map(function (item) {
        item.children && item.children.map(function (itemSmall) {
          if (!itemSmall.id) {
            itemSmall.select = true;
          } else {
            itemSmall.select = false;
          }
        });
      });
      setList(l);
      setListReset(cloneDeep(l));
    }
  }, [options]);
  useEffect(function () {
    onReset();
  }, [initResetNumber]);
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
  }, title ? title : '筛选'), /*#__PURE__*/React.createElement("div", {
    className: styles.right
  })), /*#__PURE__*/React.createElement("div", {
    className: styles.list
  }, list.map(function (item) {
    return /*#__PURE__*/React.createElement("div", {
      className: styles.item,
      key: item.id
    }, /*#__PURE__*/React.createElement("div", {
      className: styles.title
    }, item.name || ''), /*#__PURE__*/React.createElement("div", {
      className: styles.children
    }, item.children && item.children.map(function (itemSmall) {
      return /*#__PURE__*/React.createElement("div", {
        className: "".concat(styles.name, " ").concat(itemSmall.select ? styles.active : ''),
        key: itemSmall.id,
        onClick: function onClick() {
          item.children.map(function (m) {
            m.select = false;
          });
          var select = itemSmall.select;
          itemSmall.select = !select;
          setList(_toConsumableArray(list));
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
  }))));
}