var TEST_ENVIRONMENT = true
if (TEST_ENVIRONMENT) {
  var backgroundLocalStorage = {
    getItem: function (key) {
      return JSON.stringify(this[key])
    },
    remain: [
      {
        time: 23876,
        content: '我要睡觉啦'
      }
    ]
  }
}
// 测试
// (function () {
//   if (typeof hasOutline == "undefined") hasOutline = false;     
//   window.onload = function () {
//     document.querySelectorAll("*").forEach(item => {
//       item.style.outline = hasOutline ? "none" : "1px solid #" + (~~(Math.random() * (1 << 24))).toString(16);
//     });
//     hasOutline = !hasOutline;
//   }
// })();
// (function() {
//   var link = document.createElement('link');
//   link.type = 'image/x-icon';
//   link.rel = 'shortcut icon';
//   link.href = '/images/366/favicon.ico';
//   document.getElementsByTagName('head')[0].appendChild(link);
// }());

