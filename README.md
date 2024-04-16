# 客户通-前端公共组件

## 安装前置依赖

由于 npm 包是放在私有云服务器上，安装前需要设置下镜像源地址，有两种方式设置，个人推荐使用第一种，方便管理和自由切换

1.  安装 **nrm** 镜像源管理工具

```bash
# 全局安装 nrm
npm install nrm -g

# 安装成功后可以查看所有的镜像源
nrm ls

# 新增自定义的镜像源地址
nrm add kht-service http://192.168.0.200:4873/

# 使用自定义的镜像源，镜像源可自由切换
nrm use kht-service

```

2.  简单粗暴的设置镜像源

```bash

 npm set registry http://192.168.0.200:4873

```

## 安装

```bash

$ npm install kht-react-mobile-ui -S

```

## 文档地址

[kht-react-mobile-ui 在线文档](http://192.168.0.251:18808/kht-react-mobile-ui/#/kht-react-mobile-ui/)
