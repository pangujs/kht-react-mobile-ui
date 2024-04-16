/**
 * 是否是移动端
 * @returns
 */
export var isMobile = function isMobile() {
  console.log(navigator.userAgent, 'navigator.userAgent');
  var flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
  if (flag) {
    return true;
  } else {
    return false;
  }
};