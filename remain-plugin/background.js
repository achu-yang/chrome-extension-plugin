// 暂时只能在这里设置提醒任务
// TODO: 待完善添加按钮
let list = [
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
    time: 60300,
    content: '工作再忙，也不要忘记是否点外卖哦！',
    isStart: true
  },
  {
    time: 64880,
    content: '工作再忙，也不要忘记吃饭哟！',
    isStart: true
  }
]
localStorage.setItem("remain", JSON.stringify(list))
// localStorage.clear()

// 监听事件
chrome.extension.onConnect.addListener(function(port) {
  console.assert(port.name == "remain-plugin-channel");
  // 在这里接收到的是所有tab页面与background的通信
  // 所以不是公用的需要返回当前tabid给通信的tab页面进行判断是否执行
  port.onMessage.addListener(function(msg) {

    // getCurrentTab获取当前选择的tab页面
    // 对于新建的tab页面来说第一次发送过来获得的就是新建tab页面的id
    // 后续发送过来的就是当前看到的tab页面的id
    if (msg.request === "getCurrentTab") {
      chrome.tabs.getSelected(null, function(tab){
        port.postMessage({response: "getCurrentTab", id: tab.id, localStorage: localStorage, status: "success"})
      });
    }

    // confirmInfo确认信息
    // 目的是获取当前tab的id用来判断是否执行
    if (msg.request == "confirmInfo") {
      chrome.tabs.getSelected(null, function(tab){
        // console.log('second', tab.id)
        // 发送的时候为了避免让所有的tab页面都获取该信息，所以采用了 + id处理
        const NAME = 'confirmInfo' + tab.id.toString();
        port.postMessage({response: NAME, id: tab.id, localStorage: localStorage, index: msg.index,status: "success"})
      });
    }

    // **************************************测试**************************************
    // if (msg.request == "confirmInfo") {
    //   chrome.tabs.getSelected(null, function(tab){
    //     console.log('second', tab.id)
    //     // 发送的时候为了避免让所有的tab页面都获取该信息，所以采用了 + id处理
    //     const NAME = 'confirmInfo' + tab.id.toString();
    //     port.postMessage({response: NAME, id: tab.id,message: '测试用例'})
    //   });
    // }

  });
});


// localStorage.setItem("test",JSON.stringify(createList()))
// (function (root) {
//   let list = ["哈哈哈哈"]
//  localStorage.setItem("remian", JSON.stringify(list))
// })(this)