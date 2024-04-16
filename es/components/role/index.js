import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _regeneratorRuntime from "@babel/runtime/helpers/esm/regeneratorRuntime";
import _asyncToGenerator from "@babel/runtime/helpers/esm/asyncToGenerator";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import React, { useEffect, useState } from 'react';
import { Popup, SafeArea } from 'antd-mobile';
import styles from "./index.module.css";
import { DownOutline, CheckOutline } from 'antd-mobile-icons';
import { getAllRoleClassificationList } from '../../apis';
export default function Role(props) {
  var visible = props.visible,
    title = props.title,
    radio = props.radio,
    _props$type = props.type,
    type = _props$type === void 0 ? 1 : _props$type;
  var _useState = useState([]),
    _useState2 = _slicedToArray(_useState, 2),
    list = _useState2[0],
    setList = _useState2[1];
  // 关闭
  var onClose = function onClose() {
    props.onClose && props.onClose();
  };
  // 确定
  var onConfirm = function onConfirm() {
    props.onConfirm && props.onConfirm({
      data: list.filter(function (item) {
        return item.select;
      })
    });
    onClose();
  };
  var getAllRoleClassificationListInfo = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      var _res$data;
      var res, lists;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return getAllRoleClassificationList({
                roleType: type == 2 ? 'business' : 'organization'
              });
            case 2:
              res = _context.sent;
              lists = (res === null || res === void 0 ? void 0 : (_res$data = res.data) === null || _res$data === void 0 ? void 0 : _res$data.response) || [];
              setList(lists);
            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    return function getAllRoleClassificationListInfo() {
      return _ref.apply(this, arguments);
    };
  }();
  useEffect(function () {
    if (visible && !list.length) {
      getAllRoleClassificationListInfo();
    }
  }, [visible]);
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
  }, title ? title : '选择角色'), /*#__PURE__*/React.createElement("div", {
    className: styles.right,
    onClick: onConfirm
  }, "\u786E\u5B9A")), /*#__PURE__*/React.createElement("div", {
    className: styles.list
  }, list.map(function (item, index) {
    return /*#__PURE__*/React.createElement("div", {
      className: "".concat(styles.item, " ").concat(item.select ? styles.active : ''),
      key: index,
      onClick: function onClick() {
        var lists = _toConsumableArray(list);
        var select = item.select;
        //如果是单选
        if (radio) {
          lists.map(function (m) {
            m.select = false;
          });
        }
        lists[index].select = !select;
        setList(lists);
      }
    }, /*#__PURE__*/React.createElement("span", null, item.name || ''), item.select ? /*#__PURE__*/React.createElement(CheckOutline, null) : '');
  })), /*#__PURE__*/React.createElement(SafeArea, {
    position: "bottom"
  }))));
}