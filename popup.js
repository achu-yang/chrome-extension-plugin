let button = document.getElementById('test');
button.addEventListener('click', () => {
  // DeskTopNotify()
  console.log(chrome.browserAction.setIcon({
    path: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzYiIGhlaWdodD0iMjgiIHZpZXdCb3g9IjAgMCAzNiAyOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xNy41ODc1IDYuNzcyNjhMMjEuODIzMiAzLjQwNTA1TDE3LjU4NzUgMC4wMDc0ODIzN0wxNy41ODM3IDBMMTMuMzU1NSAzLjM5NzU3TDE3LjU4MzcgNi43Njg5NEwxNy41ODc1IDYuNzcyNjhaTTE3LjU4NjMgMTcuMzk1NUgxNy41OUwyOC41MTYxIDguNzc0MzJMMjUuNTUyNiA2LjM5NDUzTDE3LjU5IDEyLjY4MDhIMTcuNTg2M0wxNy41ODI1IDEyLjY4NDVMOS42MTk5MyA2LjQwMjAxTDYuNjYwMTYgOC43ODE4MUwxNy41ODI1IDE3LjM5OTJMMTcuNTg2MyAxNy4zOTU1Wk0xNy41ODI4IDIzLjI4OTFMMTcuNTg2NSAyMy4yODU0TDMyLjIxMzMgMTEuNzQ1NkwzNS4xNzY4IDE0LjEyNTRMMjguNTIzOCAxOS4zNzUyTDE3LjU4NjUgMjhMMC4yODQzNzYgMTQuMzU3NEwwIDE0LjEyOTFMMi45NTk3NyAxMS43NTMxTDE3LjU4MjggMjMuMjg5MVoiIGZpbGw9IiMxRTgwRkYiLz4KPC9zdmc+Cg=='
  }))
});

function DeskTopNotify () {
  if (!window.Notification) {
    alert("浏览器不支持通知！");
  }
  console.log(window.Notification.permission);
  if (window.Notification.permission != 'granted') {
    Notification.requestPermission(function (status) {
      //status是授权状态，如果用户允许显示桌面通知，则status为'granted'
      //permission只读属性:
      //  default 用户没有接收或拒绝授权 不能显示通知
      //  granted 用户接受授权 允许显示通知
      //  denied  用户拒绝授权 不允许显示通知
      // var permission = Notification.permission;
    });
  }
  var n = new Notification(
    "您有一条消息！", 
    {
      body:"消灭人类暴政，世界属于三体！",
      icon:"icon/icon.png",
      dir:"auto", //显示方向，另外还有rtl和ltr两个值，自左向右和自右向左
      tag:"DeskTopNotify", //把tag属性去掉，然后连续弹几个弹窗试试，就知道什么作用了
      silent: true //为true的话不会有声音和震动
    }
  );
  n.onshow = function () { 
    setTimeout(function () { n.close() }, 10000); 
  };
  n.onclick = function () {};
  n.onclose = function () {};
  n.onerror = function () {
    //do something usefu
  };
}

setTimeout(() => {
  DeskTopNotify ()
}, 3000);