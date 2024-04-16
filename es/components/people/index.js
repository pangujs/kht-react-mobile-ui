import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import React, { useState } from 'react';
import { Popup, Radio, Button, SafeArea, Toast } from 'antd-mobile';
import styles from "./index.module.css";
import { DownOutline, AddOutline, CloseOutline } from 'antd-mobile-icons';
import Organization from '../organization';
export default function FilterPopup(props) {
  var visible = props.visible,
    title = props.title,
    radio = props.radio;
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    organizationVisible = _useState2[0],
    setOrganizationVisible = _useState2[1];
  // 类型
  var _useState3 = useState('1'),
    _useState4 = _slicedToArray(_useState3, 2),
    type = _useState4[0],
    setType = _useState4[1];
  // 数据
  var _useState5 = useState([]),
    _useState6 = _slicedToArray(_useState5, 2),
    userList = _useState6[0],
    setUserList = _useState6[1];
  var onClose = function onClose() {
    props.onClose && props.onClose();
  };
  var onChangeType = function onChangeType(value) {
    setType(value);
    // if (value == '1') {
    //   //我的
    // } else if (value == '2') {
    // } else {
    // }
  };
  // 接受的确认
  var onConfirm = function onConfirm(data) {
    setUserList(data.data);
  };
  // 重置
  var reset = function reset() {
    setType('1');
    setUserList([]);
  };
  // 确认
  var onSubmit = function onSubmit() {
    //如果选的指定人员，但是没数据的话就提示
    if (type == 3 && userList.length == 0) {
      Toast.show('请选择指定人员');
      return;
    }
    props.onConfirm && props.onConfirm({
      data: userList,
      type: type
    });
    onClose();
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
  }, title ? title : '添加人'), /*#__PURE__*/React.createElement("div", {
    className: styles.left,
    onClick: onClose
  }, /*#__PURE__*/React.createElement(CloseOutline, null))), /*#__PURE__*/React.createElement("div", {
    className: styles.list
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.listItem
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.listItemTitle
  }, "\u53EF\u89C1\u8303\u56F4\uFF1A"), /*#__PURE__*/React.createElement("div", {
    className: styles.listType
  }, /*#__PURE__*/React.createElement(Radio.Group, {
    value: type,
    onChange: onChangeType
  }, /*#__PURE__*/React.createElement(Radio, {
    value: "1",
    className: styles.radioName
  }, "\u6211\u7684"), /*#__PURE__*/React.createElement(Radio, {
    value: "2",
    className: styles.radioName
  }, "\u5168\u4F53\u4EBA\u5458"), /*#__PURE__*/React.createElement(Radio, {
    value: "3",
    className: styles.radioName
  }, "\u6307\u5B9A\u4EBA\u5458")))), type == '3' ? /*#__PURE__*/React.createElement("div", {
    className: styles.listItem
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.listItemTitle
  }, "\u6307\u5B9A\u4EBA\u5458\uFF1A"), userList && userList.length ? /*#__PURE__*/React.createElement("div", {
    className: styles.listType
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.name
  }, userList[0].name, userList.length > 1 ? "\u7B49".concat(userList.length, "\u4EBA") : ''), /*#__PURE__*/React.createElement("div", {
    className: styles.select,
    onClick: function onClick() {
      setOrganizationVisible(true);
    }
  }, "\u4FEE\u6539")) : /*#__PURE__*/React.createElement(Button, {
    color: "primary",
    fill: "outline",
    className: styles.submitBtn,
    onClick: function onClick() {
      setOrganizationVisible(true);
    }
  }, /*#__PURE__*/React.createElement(AddOutline, null), "\u6DFB\u52A0\u4EBA\u5458")) : null), /*#__PURE__*/React.createElement("div", {
    className: styles.footer
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.footerItem,
    onClick: reset
  }, "\u91CD\u7F6E"), /*#__PURE__*/React.createElement("div", {
    className: "".concat(styles.footerItem, " ").concat(styles.footerItemActive),
    onClick: onSubmit
  }, "\u786E\u5B9A")), /*#__PURE__*/React.createElement(SafeArea, {
    position: "bottom"
  }))), /*#__PURE__*/React.createElement(Organization, {
    visible: organizationVisible,
    type: 2,
    radio: radio,
    onClose: function onClose() {
      setOrganizationVisible(false);
    },
    onConfirm: onConfirm
  }));
}