import { cloneDeep } from 'lodash';
import { publicApi } from '../request';
// 通过部门code列表查询员
export var getEmployeeListByDeptCode = function getEmployeeListByDeptCode(data) {
  return publicApi.get({
    url: '/user/employee/getEmployeeListByDeptCode',
    params: data
  });
};
// 部门列表
export var deptList = function deptList(data) {
  return publicApi.get({
    url: '/user/dept/list',
    params: data
  });
};
// 部门模糊搜索
export var deptListByFuzzyName = function deptListByFuzzyName(data) {
  return publicApi.get({
    url: '/user/dept/listByFuzzyName',
    params: data
  });
};
// 查询部门下的所有员工，包括子部门员工
export var getAllEmployeeListByDepartmentCode = function getAllEmployeeListByDepartmentCode(data) {
  return publicApi.get({
    url: '/user/employee/getAllEmployeeListByDepartmentCode',
    params: data
  });
};
// 模糊查询员工列表
export var getEmployeeListByFuzzyName = function getEmployeeListByFuzzyName(data) {
  return publicApi.get({
    url: '/user/employee/getEmployeeListByFuzzyName',
    params: data
  });
};
// 项目列表树
export var getResidentManagerLeftTree = function getResidentManagerLeftTree(data) {
  return publicApi.post({
    url: '/estate/residentManager/getLeftTreeWithoutFullName',
    data: data
  });
};
// 项目列表
export var getCommunityList = function getCommunityList(data) {
  return publicApi.post({
    url: '/estate/community/getList',
    data: data,
    params: {
      pageSize: 1000
    }
  });
};
// 房屋列表树
export var getHouseLeftTree = function getHouseLeftTree(data) {
  return publicApi.get({
    url: '/estate/house/getLeftTree',
    params: data
  });
};
// 项目列表树
export var getHouseList = function getHouseList(data) {
  return publicApi.post({
    url: '/estate/house/getList',
    data: data,
    params: {
      pageSize: 1000
    }
  });
};
// 查询资产左侧树+业主信息
export var getLeftTreeExtResident = function getLeftTreeExtResident(data) {
  return publicApi.post({
    url: '/estate/residentManager/getLeftTreeExtResident',
    data: data
  });
};
// 业主列表
export var getResidentManagerList = function getResidentManagerList(data) {
  return publicApi.post({
    url: '/estate/residentManager/list',
    data: data,
    params: {
      pageSize: 1000
    }
  });
};
// 查询分页列表
export var getSpaceList = function getSpaceList(data) {
  return publicApi.post({
    url: '/estate/space/getList',
    data: data,
    params: {
      pageSize: 1000
    }
  });
};
// 获取空间树
export var getTreeListFromSpace = function getTreeListFromSpace(data) {
  return publicApi.post({
    url: '/estate/space/getTreeListFromSpace',
    data: data
  });
};
//获取所有的角色分类
export var getAllRoleClassificationList = function getAllRoleClassificationList(data) {
  return publicApi.get({
    url: '/user/businessRole/getAllRoleClassificationList',
    params: data
  });
};
//公共传参接口模板
export var publicApiList = function publicApiList(url, data) {
  return publicApi.post({
    url: url,
    data: data
  });
};
// 客户列表
export var getCustomerWxWorkList = function getCustomerWxWorkList(data) {
  var info = cloneDeep(data);
  var params = {
    currentPage: info.currentPage,
    pageSize: info.pageSize
  };
  delete info.currentPage;
  delete info.pageSize;
  return publicApi.post({
    url: '/customer/customer/getCustomerWxWorkList',
    data: info,
    params: params
  });
};
// 客户列表--只有id，名称和头像
export var getCustomerWxWorkSimpleList = function getCustomerWxWorkSimpleList(data) {
  var info = cloneDeep(data);
  var params = {
    currentPage: info.currentPage,
    pageSize: info.pageSize
  };
  delete info.currentPage;
  delete info.pageSize;
  return publicApi.post({
    url: '/customer/customer/getCustomerWxWorkSimpleList',
    data: info,
    params: params
  });
};
// 标签列表
export var findTagChannelTree = function findTagChannelTree(data) {
  return publicApi.post({
    url: '/tag/tag/user/findTagChannelTree',
    data: data
  });
};
// 分页查询聚合标签组分类
export var categoryPage = function categoryPage(data) {
  return publicApi.post({
    url: '/tag/tag/category/page',
    data: data
  });
};
// 标签客户联动聚合集合
export var customerList = function customerList(data) {
  return publicApi.post({
    url: '/tag/tag/customer/list',
    data: data
  });
};