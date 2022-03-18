const FoldBarContentActivateColor = '#F5F5F5'
var num = 1
const checkBoxInitColor = '#fff'
const checkBoxActiveColor = '#ddd'
var TEST_ENVIRONMENT
if (!TEST_ENVIRONMENT) {
  var backgroundLocalStorage = chrome.extension.getBackgroundPage().localStorage
}
function createCheckBox (index) {
  return '<div class="custom-checkbox-' + index +'" style="width: 20px;height: 20px;cursor:pointer"></div>'
}
function createSwitchBox (index,list) {
  // 判断是否开启或者关闭返回不同的状态
  if (!list[index].isStart) {
    return `<div style="position:absolute;top:50%;right: 10px;transform: translateY(-50%);">
              <div style="position:relative;width:50px;height:20px;">
                <div id="switch-container-${index}" style="position: absolute;width: 50px;height: 20px;background-color: red;border-radius: 50px;">
                  <div id="switch-activeBox-${index}" style="width: 0px;
                  height: 100%;
                  border-top-left-radius: 50px;
                  border-bottom-left-radius: 50px;
                  position: absolute;
                  background-color: green;"></div>
                  <svg style="width:100%;height:100%;position:absolute;">
                      <circle  id="c-${index}" cx="10" cy="10" r="10" style="cursor:pointer;fill:white; stroke:gray; stroke-width:1;"/>
                  </svg>
                </div>
              </div>
            </div>`
  }
  return `<div style="position:absolute;top:50%;right: 10px;transform: translateY(-50%);">
            <div style="position:relative;width:50px;height:20px;">
              <div id="switch-container-${index}" style="position: absolute;width: 50px;height: 20px;background-color: red;border-radius: 50px;">
                <div id="switch-activeBox-${index}" style="width: 40px;
                height: 100%;
                border-top-left-radius: 50px;
                border-bottom-left-radius: 50px;
                position: absolute;
                background-color: green;"></div>
                <svg style="width:100%;height:100%;position:absolute;">
                    <circle  id="c-${index}" cx="40" cy="10" r="10" style="cursor:pointer;fill:white; stroke:gray; stroke-width:1;"/>
                </svg>
              </div>
            </div>
          </div>`
}

function createSwitchBoxEvent (list) {
  for (let index = 0; index < list.length; index++) {
    let id = 'c-' + index
    const circleR = 10
    const switchW = 50
    let circle = document.getElementById(id);
    circle.addEventListener('click', function (e) {
      // 取消冒泡事件，避免与长按冲突
      e.preventDefault()
      let activeDiv = document.getElementById('switch-activeBox-' + index)
      if (e.offsetX < circleR * 2){
        for (let i = 1; i < 11; i++) {
          (function (i) {
            setTimeout(function(){
              circle.setAttribute('cx', i * 4)
              activeDiv.style.width = i * 4 + 'px'
            },i * 20)
          })(i)
        }
      }
      if (e.offsetX > switchW - circleR * 2) {
        for (let i = 1; i < 11; i++) {
          (function (i) {
            setTimeout(function(){
              circle.setAttribute('cx', switchW - i * 4)
              activeDiv.style.width = switchW - i * 4 + 'px'
            },i * 20)
          })(i)
        }
      }
    })
  }
}
function crateLongTouchEvent (list) {
  for (let index = 0; index < list.length; index++) {
    let id = 'remian-content-box-' + index
    let div = document.getElementById(id);

    let timer;
    let flag = false;
    div.addEventListener('mousedown', function (e) {
      // 取消冒泡事件，避免冲突
      let tmpContent = JSON.parse(JSON.stringify(div.innerHTML))
      timer = setTimeout(()=>{
        div.innerHTML = `<div id ="${id}-delete">删除</div>`;
        let _delete = document.getElementById('remian-content-box-' + index + '-delete')
        console.log(_delete)
        _delete.addEventListener('click', function (e) {
          e.preventDefault()
          // console.log('click')
          // console.log(tmpContent)
          div.innerHTML = tmpContent
        })
      },500)
    })
    div.addEventListener('mouseup', function (e) {
      // 取消冒泡事件，避免冲突
      // e.preventDefault()
      if (flag) {
        
      }
      clearTimeout(timer)
      flag = false;
    })
  } 
}

function handlerText (text) {
  let textType = {
    singleRow: 7,
    doubleRow: 13,
    multiRow: 13
  }
  // console.log(text)
  let list = text.split('')
  let result = ''
  if (list.length < textType.singleRow) {
    result = list.join('')
    return '<div style="position:absolute;left:60px;top:17px;width:100px;display:flex;flex-wrap: wrap;">' + result + '</div>'
  }
  else if (list.length < textType.doubleRow) {
    result = list.join('')
  }
  else if (list.length > textType.multiRow) {
    list.splice(11,list.length - 11)
    result = list.join('') + '...'
  }
  return '<div style="position:absolute;left:60px;top:10px;width:100px;display:flex;flex-wrap: wrap;">' + result + '</div>'
}
function initDOM () {
  // 添加按钮隐藏
  let addEvent = document.getElementById('addEvent')
  addEvent.style.display = 'none'

  // DOM事件绑定
  // 确认按钮
  let confirm = document.getElementById('confirm')
  confirm.addEventListener('click', function (e) {
    let hour = document.getElementById('input-hour').value
    let minute = document.getElementById('input-minute').value
    addEvent.style.display = 'none'
    if (hour === '' || minute === '') {
      updateAddEvent();
      return;
    }
    if (!isVaildTime(hour,minute)) {
      updateAddEvent();
      return;
    }
    setTimeTask(hour, minute)
  })
  // 取消按钮
  let cancel = document.getElementById('cancel')
  cancel.addEventListener('click', function () {
    addEvent.style.display = 'none'
  })
  // 悬浮添加按钮
  let suspensionAdd = document.getElementById('suspensionAdd')
  suspensionAdd.addEventListener('click', function () {
    // 显示
    addEvent.style.display = 'block'
    // 人性化一点，输入框获得焦点
    let inputHour = document.getElementById('input-hour')
    let inputMinute = document.getElementById('input-minute')
    inputHour.focus();
    inputHour.addEventListener('keypress',function (e) {
      inputMinute.focus()
    })
    inputMinute.addEventListener('keypress',function(e){
      document.getElementById('remain-content').focus()
    })
  })
  // 渲染提醒列表
  let list = JSON.parse(backgroundLocalStorage.getItem("remain"));
  updateRemainList(list) 
}

function updateRemainList (list) {
  (function(){
    let s = ''
    for (var i = 0; i< list.length; i++) {
      console.log(list[i].time)
      let time = convertDate(list[i].time)
      console.log(time)
      // 外壳
      s = s + '<div style="display:flex;width: 90%;height: 60px;margin: 0 auto;box-shadow: 0px 0px 3px 2px #DCDCDC;font-size: 16px;position:relative;border-radius: 10px;margin:10px 3px;" '+ 'id="remian-content-box-' + i+ '"'+'>'
      // 真正内容
      // s = s + createCheckBox(i)
      s = s + createSwitchBox(i,list)
      // 时间
      s = s + '<div style="position:absolute;top:5px;left:5px;font-weight: 900;">' + normlizeTime(time.hour) + ':' + normlizeTime(time.minute) + '</div>'
      s = s + '<div style="position:absolute;bottom:5px;left:15px;"><img width="20" height="20" src="./png/clock1.jpg"></div>'
      s = s + handlerText(list[i].content)
      s = s + '</div>'
    }
    document.getElementById('remian-content').innerHTML = s
    // 添加长按删除事件
    crateLongTouchEvent(list)
    // 添加提醒事件
    createSwitchBoxEvent(list)
    // refreshDOM(list)
    num += 1
  })()
}

function isVaildTime (hour,minute) {
  return (parseInt(minute) <= 60 && parseInt(minute) >= 0 && parseInt(hour) <= 24 && parseInt(hour) >= 0)
}
function normlizeTime (num) {
  if (num < 10) return '0'.concat(num)
  return num
}

function getDate () {
  const DATE = new Date()
  let hourConvertSecond = DATE.getHours() * 3600
  let minuteConvertSecond = DATE.getMinutes() * 60
  console.log(hourConvertSecond, minuteConvertSecond)
  return hourConvertSecond + minuteConvertSecond + DATE.getSeconds()
}

function setTimeTask (hour, minute) {
  let remainTime = hour * 3600 + minute * 60;
  let content = document.getElementById('remain-content').value;
  if (content === '') return;
  let obj = {
    time: remainTime,
    content: content,
    isStart: true
  }
  setStorage(obj)
}
/**
 * obj = {
 *  time: '',
 *  content: '',
 *  isStart: true
 * }
 * 
 */
function setStorage (obj) {
  let list = JSON.parse(backgroundLocalStorage.getItem("remain"))
  if (!list) {
    list = []
  }
  list.push(obj)
  // console.log(list)
  // console.log(backgroundLocalStorage)
  // 按时间排序
  let newlist = sortFun(list)
  backgroundLocalStorage.setItem("remain", JSON.stringify(newlist))
  // 刷新DOM
  updateRemainList(newlist);
  updateAddEvent();
  // 通知background，由background通知其他页面
  // let port = chrome.extension.connect({name: "remain-plugin-channel"});
  // port.postMessage({request: "updateLocalStorage"});
}

function updateAddEvent () {
  document.getElementById('input-hour').value = ''
  document.getElementById('input-minute').value = ''
  document.getElementById('remain-content').value = ''
}

initDOM()
