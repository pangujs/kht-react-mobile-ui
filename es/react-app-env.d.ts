/// <reference types="react-scripts" />

interface Client {
  __POWERED_BY_QIANKUN__: () => string;
  __INJECTED_PUBLIC_PATH_BY_QIANKUN__: () => string;
}

// eslint-disable-next-line no-unused-vars
declare interface Window {
  __POWERED_BY_QIANKUN__: Client.__POWERED_BY_QIANKUN__;
  __INJECTED_PUBLIC_PATH_BY_QIANKUN__: Client.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
}
