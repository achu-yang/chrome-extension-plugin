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
// function createSwitchBoxCss (list) {
//   let content = ''
//   for (let i = 0; i < list.length; i++) {
//     s  += `
  
//     `
//   }
//   let style = document.createElement('style')
//   style = content
//   document.body.appendChild(style)
// }
function createSwitchBoxEvent (list) {
  for (let index = 0; index < list.length; index++) {
    let id = 'c-' + index
    const circleR = 10
    const switchW = 50
    let circle = document.getElementById(id);
    circle.addEventListener('click', function (e) {
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
function initDOM () {
  // 添加按钮隐藏
  let addEvent = document.getElementById('addEvent')
  addEvent.style.display = 'none'

  // DOM事件绑定
  // 确认
  let confirm = document.getElementById('confirm')
  confirm.addEventListener('click', function (e) {
    let hour = document.getElementById('input-hour').value
    let minute = document.getElementById('input-minute').value
    addEvent.style.display = 'none'
    setTimeTask(hour, minute)
  })
  let cancel = document.getElementById('cancel')
  cancel.addEventListener('click', function () {
    addEvent.style.display = 'none'
  })
  let suspensionAdd = document.getElementById('suspensionAdd')
  suspensionAdd.addEventListener('click', function () {
    addEvent.style.display = 'block'
  })
  
  let list = JSON.parse(backgroundLocalStorage.getItem("remain"));
  (function(){
    let s = ''
    for (var i = 0; i< list.length; i++) {
      let time = convertDate(list[i].time)
      // 外壳
      s = s + '<div style="display:flex;width: 90%;height: 60px;margin: 0 auto;box-shadow: 0px 0px 3px 2px #DCDCDC;font-size: 16px;position:relative;border-radius: 10px">'
      // 真正内容
      // s = s + createCheckBox(i)
      s = s + createSwitchBox(i,list)
      // 时间
      s = s + '<div style="position:absolute;top:5px;left:5px;font-weight: 900;">' + normlizeTime(time.hour) + ':' + normlizeTime(time.minute) + '</div>'
      s = s + '<div style="position:absolute;bottom:5px;left:15px;"><img width="20" height="20" src="./png/clock1.jpg"></div>'
      s = s + '<div style="position:absolute;left:60px;top:10px;width:100px;display:flex;flex-wrap: wrap;">' + list[i].content + '</div>'
      s = s + '</div>'
    }
    document.getElementById('remian-content').innerHTML = s
    createSwitchBoxEvent(list)
    // refreshDOM(list)
    num += 1
  })()

  // 
}

initDOM()
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
  let remainTime = hour * 3600 + minute * 60
  let timeDifferent = remainTime - getDate()
  console.log(timeDifferent)
  if (timeDifferent > 0) {
    let content = document.getElementById('remain-content').value
    console.log(content)
    let obj = {
      time: remainTime,
      content: content
    }
    setStorage(obj)
  } else {
    alert('错误')
  }
}
/**
 * obj = {
 *  time: '',
 *  content: ''
 * }
 * 
 */
function setStorage (obj) {
  let list = JSON.parse(backgroundLocalStorage.getItem("remain"))
  if (!list) {
    list = []
  }
  list.push(obj)
  console.log(list)
  console.log(backgroundLocalStorage)
  let newlist = sortFun(list)
  backgroundLocalStorage.setItem("remain", JSON.stringify(newlist))
}

