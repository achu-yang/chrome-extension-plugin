(function (root) {
    // 建立双向通信
    let timerList = []
    var port = chrome.extension.connect({name: "remain-plugin-channel"});
    // 该tab页面的id
    var id = undefined;
    var list = []
    // 1、发送信息给background请求到当前tab页面的信息
    port.postMessage({request: "getCurrentTab"});
    port.onMessage.addListener(function(msg) {
      if (msg.response == 'getCurrentTab') {
        // 由于background会跟所有tab页面进行交互，需要判断是否第一次获取
        // 只有第一次获取的id才是真正该tab发送请求的id
        if (id === undefined) {
          // 获取当前tab的id
          id = msg.id
          // console.log(id);
          // 获取存放在background中的localStorage
          storage = msg.localStorage
          // JSON格式解析
          list = JSON.parse(storage.remain)
          // 遍历设置定时器
          // setTimeout(() => {
          //   port.postMessage({request: "confirmInfo", index: 1});
          // }, 5000);
          for (let i = 0; i < list.length; i++) {
            let time = list[i].time - getDate() 
            if (time > 0) {
              (function (i) {
                timerList[i] = setTimeout(()=>{
                  port.postMessage({request: "confirmInfo", index: i});
                },time * 1000)
              })(i)
            }
          }
        }
        return;
      }

    if (msg.response === "confirmInfo" + id.toString()) {
      if (id == msg.id) {
        let list = JSON.parse(msg.localStorage.remain)
        alert(list[msg.index].content)
        // alert(msg.message)
      }
        clearTimeout(timerList(msg.index))
    }
    });
})(this)

function getDate () {
  const DATE = new Date()
  let hourConvertSecond = DATE.getHours() * 3600
  let minuteConvertSecond = DATE.getMinutes() * 60
  // console.log(hourConvertSecond, minuteConvertSecond)
  return hourConvertSecond + minuteConvertSecond + DATE.getSeconds()
}