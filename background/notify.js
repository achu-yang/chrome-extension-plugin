function DeskTopNotify (content,icon) {
  if (!window.Notification) {
    alert("浏览器不支持通知！");
  }
  // let date = new Date();
  // console.log(date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds())
  // console.log(window.Notification.permission);
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
  setNotification(content, icon)
}
let list = [
  {
    content: '又是元气满满的一天',
    time: '09:30'
  },
  {
    content: '工作再忙也不要忘记吃饭哦！',
    time: '12:02'
  },
  {
    content: '红红绿绿',
    time: '14:45'
  },
  {
    content: '工作再忙也不要忘记点外卖哦！',
    time: '16:45'
  },
  {
    content: '工作再忙也不要忘记吃饭哦！',
    time: '18:02'
  },
  {
    content: '多走走！',
    time: '20:12'
  },
]
function setNotification (content,icon) {
  let config = {
    body: content,
    icon:"icon/icon.png",
  }
  if (icon) {
    config.icon = icon;
  }
  let n = new Notification(
    "温馨提示！", 
    config
  );
  n.onshow = function () { 
    // setTimeout(function () { n.close() }, 10000); 
  };
  n.onclick = function () {};
  n.onclose = function () {
    n = null;
  };
  n.onerror = function () {
    //do something usefu
  };
}
let date = new Date();
let hours = date.getHours();
let minutes = date.getMinutes();
let seconds = date.getSeconds();
list.forEach(item=>{
  let time = item.time.split(':');
  let diffh = -hours + parseInt(time[0]);
  let diffm = -(minutes + 1) + parseInt(time[1]);
  let diffs = 60 - seconds;
  if (diffh < 0) {
    return;
  }
  let duration = diffh * 3600 + diffm * 60 + diffs;
  if (duration < 0) return;
  console.log(duration);
  setTimeout(() => {
    setNotification(item.content)
  }, duration * 1000);
});

