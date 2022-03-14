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
          //   console.log("我运行了")
          // }, 1000);
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
        // console.log('我收到了')
        // let list = JSON.parse(msg.localStorage.remain)
        // alert(list[msg.index].content)
        message(list[msg.index].content)
        // message(msg.message)
        // alert(msg.message)
      }
        clearTimeout(timerList(msg.index))
    }
    });
    // message()
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
