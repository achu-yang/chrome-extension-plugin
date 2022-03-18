// 默认任务
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
// 第一次打开浏览器会调用这里检查是否有值，如果没有就刷新默认任务
if (!localStorage.getItem('remain')) {
  localStorage.setItem("remain", JSON.stringify(list))
}

// localStorage.clear()
// 监听LocalStorage监听器状态避免多次调用window.addEventListener
let addEventListenerLocalStorageState = 0;
// 监听事件
chrome.extension.onConnect.addListener(function(port) {
  console.assert(port.name == "remain-plugin-channel");
  // 在这里接收到的是所有tab页面与background的通信
  // 所以不是公用的需要返回当前tabid给通信的tab页面进行判断是否执行
  if (addEventListenerLocalStorageState === 0) {
    // 重写localStorage.setItem 使得可以侦听自己的localStorage
    // 保留一份方法
    let orignalSetItem = localStorage.setItem;
    // 重写
    localStorage.setItem = function(key,newValue){
        var setItemEvent = new Event("setItemEvent");
        setItemEvent.newValue = newValue;
        window.dispatchEvent(setItemEvent);
        orignalSetItem.apply(this,arguments);
    }
    // 侦听
    window.addEventListener("setItemEvent", function (e) {
      // 为了与getCurrentTab中的localstorage统一所以转化好统一格式{"remain":[]}
      let value = {};
      value['remain'] = e.newValue;
      // 一旦变动立马发送updateLocalStorage通知所有tab页面
      port.postMessage({response: "updateLocalStorage", localStorage: JSON.stringify(value)})
    });
    addEventListenerLocalStorageState = 1;
  }
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

    // if (msg.request === 'updateLocalStorage') {
    //   console.log('我收到来自popup的消息');
    //   port.postMessage({response: 'test', localStorage: localStorage})
    // }
  });
});


// localStorage.setItem("test",JSON.stringify(createList()))
// (function (root) {
//   let list = ["哈哈哈哈"]
//  localStorage.setItem("remian", JSON.stringify(list))
// })(this)