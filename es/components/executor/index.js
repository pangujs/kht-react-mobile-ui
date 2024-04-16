import React from 'react';
import { Popup } from 'antd-mobile';
import styles from "./index.module.css";
import { DownOutline } from 'antd-mobile-icons';
export default function ExecutorPopup(props) {
  var visible = props.visible,
    title = props.title,
    _props$list = props.list,
    list = _props$list === void 0 ? [] : _props$list,
    _props$type = props.type,
    type = _props$type === void 0 ? 2 : _props$type,
    _props$isClose = props.isClose,
    isClose = _props$isClose === void 0 ? true : _props$isClose;
  var onClose = function onClose() {
    props.onClose && props.onClose();
  };
  var closeInfo = function closeInfo(item) {
    props.onChange && props.onChange(item);
  };
  var closeAll = function closeAll() {
    props.onCloseAll && props.onCloseAll();
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Popup, {
    visible: visible,
    bodyStyle: {
      height: '80vh',
      borderTopLeftRadius: '8px',
      borderTopRightRadius: '8px'
    },
    position: "bottom",
    onMaskClick: onClose,
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
  }, title || '全部'), isClose ? /*#__PURE__*/React.createElement("div", {
    className: styles.right,
    onClick: closeAll
  }, "\u79FB\u9664\u5168\u90E8") : /*#__PURE__*/React.createElement("div", {
    className: styles.right
  })), /*#__PURE__*/React.createElement("div", {
    className: styles.title
  }, "\u5171", list.length, type != 2 ? '个' : '人'), /*#__PURE__*/React.createElement("div", {
    className: styles.list
  }, list.map(function (item, index) {
    if (!item.isEmployee) {
      return /*#__PURE__*/React.createElement("div", {
        key: item.id + index,
        className: styles.itemDet
      }, /*#__PURE__*/React.createElement("div", {
        className: styles.name
      }, item.isHouse ? "".concat(item.belongName || '').concat(item.belongName ? '/' : '').concat(item.houseNumber) : item.name), isClose ? /*#__PURE__*/React.createElement("img", {
        onClick: function onClick() {
          closeInfo(item);
        },
        className: styles.close,
        src: require('../../assets/images/close-def.png'),
        alt: ""
      }) : null);
    } else {
      return /*#__PURE__*/React.createElement("div", {
        key: item.id + index,
        className: styles.item
      }, /*#__PURE__*/React.createElement("img", {
        className: styles.image,
        src: item.avatar || require('../../assets/images/userInfo.png'),
        alt: ""
      }), /*#__PURE__*/React.createElement("div", {
        className: styles.name
      }, item.name), isClose ? /*#__PURE__*/React.createElement("img", {
        onClick: function onClick() {
          closeInfo(item);
        },
        className: styles.close,
        src: require('../../assets/images/close-def.png'),
        alt: ""
      }) : null);
    }
  })))));
}