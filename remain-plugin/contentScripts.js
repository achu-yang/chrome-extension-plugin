(function (root) {
    // chrome.extension.sendRequest({channel: "channel1"}, function(response) {
    //   console.log(response);
    // });
    // setTimeout(() => {
    //   chrome.extension.sendRequest({greeting: "channel2"}, function(response) {
    //     console.log(response);
    //   });
    // }, 3000);
    // 建立双向通信

    // chrome.tabs.getSelected(null, function(tab){
    //     console.log(tab)
    //     chrome.tabs.executeScript(tab.id,{
    //       file: './remain.js' 
    //     })
    // });

    var port = chrome.extension.connect({name: "remain-plugin-channel"});
    var id = 0
    var list = []
    port.postMessage({request: "getCurrentTab"});
    port.onMessage.addListener(function(msg) {
      if (msg.response == 'getCurrentTab') {
        // 获取当前tab的id
        id = msg.id
        console.log(id);
        storage = msg.localStorage
        console.log(storage.remain)
        list = JSON.parse(storage.remain)
        for (let i = 0; i < list.length; i++) {
          let time = list[i].time - getDate() 
          if (time > 0) {
            (function (i) {
              setTimeout(()=>{
                port.postMessage({request: "confirmInfo", index: i});
              },time * 1000)
            })(i)
          } else {
            // test
            setTimeout(()=>{
              port.postMessage({request: "confirmInfo"});
            },3000)
          }
        }
        // 开始设置定时器
        // console.log(chrome.extension.getBackgroundPage())
      }
    if (msg.response === "confirmInfo") {
      if (id == msg.id) {
        let list = JSON.parse(msg.localStorage.remain)
        alert(list[msg.index].content)
      }
    }


      // 时间到了再发送一次获取当前tab的id
      // 判断id是否一样，如果一样就直接弹框
      // if (msg.question == "Who's there?") {
      //   port.postMessage({answer: "Madame"});
      // }
      // else if (msg.question == "Madame who?")
      //   port.postMessage({answer: "Madame... Bovary"});
    });
})(this)
function getDate () {
  const DATE = new Date()
  let hourConvertSecond = DATE.getHours() * 3600
  let minuteConvertSecond = DATE.getMinutes() * 60
  console.log(hourConvertSecond, minuteConvertSecond)
  return hourConvertSecond + minuteConvertSecond + DATE.getSeconds()
}