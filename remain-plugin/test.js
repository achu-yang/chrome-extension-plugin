var TEST_ENVIRONMENT = true
if (TEST_ENVIRONMENT) {
  var backgroundLocalStorage = {
    getItem: function (key) {
      return JSON.stringify(this[key])
    },
    remain: [
      {
        time: 43260,
        content: '工作再忙，也不要忘记吃饭哟！',
        isStart: true
      },
      {
        time: 53100,
        content: '红 ? 惊喜 : 惊吓',
        isStart: false,
      },
      {
        time: '64860',
        content: '工作再忙，也不要忘记吃饭哟！',
        isStart: true
      },
      {
        time: 53100,
        content: '红 ? 惊喜 : 惊吓',
        isStart: false,
      },
      {
        time: '64860',
        content: '工作再忙，也不要忘记吃饭哟！',
        isStart: true
      },
      {
        time: 53100,
        content: '红 ? 惊喜 : 惊吓',
        isStart: false,
      },
      {
        time: '64860',
        content: '工作再忙，也不要忘记吃饭哟！',
        isStart: true
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

