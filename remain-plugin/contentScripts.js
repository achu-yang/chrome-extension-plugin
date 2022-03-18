(function (root) {
    // 建立双向通信
    var port = chrome.extension.connect({name: "remain-plugin-channel"});
    // 该tab页面的id
    var id = undefined;
    var list = []
    var timerList = []
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
          timerList = updateStorage(storage,port)
        }
        return;
      }

    if (msg.response === "confirmInfo" + id.toString()) {
      if (id == msg.id) {
        // console.log('我收到了')
        // let list = JSON.parse(msg.localStorage.remain)
        // alert(list[msg.index].content)
        let storage;
        try {
          storage = JSON.parse(msg.localStorage)
        } catch (e) {
          storage = msg.localStorage
        }
        console.log(storage)
        try {
          list = JSON.parse(storage.remain)
        } catch {
          list = storage.remain
        }
        // 发送通知盒子显示
        message(list[msg.index].content)
        // message(msg.message)
        // alert(msg.message)
      }
        // 不管是不是都要清空盒子 
        clearTimeout(timerList[msg.index])
        timerList[msg.index] = null;
    }

    if (msg.response === 'updateLocalStorage') {
      // console.log(timerList)
      clearTimeList (timerList);
      timerList = updateStorage(msg.localStorage,port);
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
function message (msg) {
    let background = document.createElement('div');
    background.id = 'chrome-plugin-remain-message'
    background.style.position = 'fixed';
    background.style.width = '300px';
    background.style.height = '100px';
    background.style.backgroundColor = '#708090';
    background.style.opacity = '0.1';
    background.style.zIndex = 9999;
    background.style.color = '#333';
    background.style.top = '8%';
    background.style.left = '50%';
    background.style.transform = 'translateX(-50%)'
    background.style.borderRadius = '10px'
    
    let div = document.createElement('div');
    div.style.position = 'relative'
    let content = ''
    content += createButton();
    content += createRemainMessage(msg)
    div.innerHTML = content;
    background.appendChild(div)
    document.body.appendChild(background);
    bindButton()
}
function createButton() {
  return `
  <div style="position: absolute; top: 57px;right: 28px;" class="button" id="messageConfirm">
          确认
  </div>
  `
}
function createRemainMessage(msg) {
  return `
  <div style="position: absolute;left: 50%;transform: translateX(-50%);color:#fff;top:15px;font-size:20px;">${msg}</div>
  `
}
function bindButton() {
  let button = document.getElementById('messageConfirm');
  // 添加样式
  button.style.padding = '5px 10px';
  button.style.borderRadius = '10px';
  button.style.display = 'inline-block';
  button.style.justifySelf = 'center';
  button.style.backgroundColor = '#00BFFF';
  button.style.color = '#fff';
  button.style.cursor = 'pointer'
  // 添加事件
  button.addEventListener('click',function(e){
    let message = document.getElementById('chrome-plugin-remain-message');
    document.body.removeChild(message)
  })
  button.addEventListener('mouseenter',function(e){
    button.style.boxShadow = '0px 0px 3px 2px #DCDCDC';
  })
  button.addEventListener('mouseleave',function(e){
    button.style.boxShadow = 'none';
  })
}

function updateStorage (storage,port) {
  list = [];
  // JSON格式解析
  
  try {
    storage = JSON.parse(storage)
  } catch (e) {
    
  }
  console.log(storage)
  try {
    list = JSON.parse(storage.remain)
  } catch {
    list = storage.remain
  }
  
  // console.log(list)
  if (!list) return;
  // list = Array.prototype.slice.call(list)
  // console.log(Array.isArray(list));
  // console.log(list)
  // console.log(list.length);return;
  // if (list.length <= 0) return;
  // console.log('updateStorage: ', list)
  let n = parseInt(list.length)
  let timerList = new Array(n)
  // console.log('创建定时器前', timerList);
  // 遍历设置定时器
  for (let i = 0; i < n; i++) {
    // console.log(`现在创建第${i+1}个定时器`)
    let time = list[i].time - getDate() 
    if (time > 0) {
      (function (i) {
        timerList[i] = setTimeout(()=>{
          port.postMessage({request: "confirmInfo", index: i});
        },time * 1000)
      })(i)
    }
  }
  // console.log('创建定时器后', timerList);
  return timerList;
}

function clearTimeList (list) {
  if (list === undefined) return;
  let n = list.length;
  // console.log(n)
  for (let i = 0; i < n; i++) {
    clearTimeout(list[i]);
    // console.log(`已经清空第${i+1}个定时器`)
    list[i] = null
  }
  list = []
}