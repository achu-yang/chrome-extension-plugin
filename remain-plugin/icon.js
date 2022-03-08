function objectConvertString (obj) {
  let s = ' {'
  Object.keys(obj).forEach(key => {
    let addContent = convertName(key) + ': ' + obj[key].toString() + '; '
    s += addContent
  })
  s += '}'
  return s
}
function convertName (str) {
  let list = str.split('')
  let s = ''
  list.forEach( e => {
    if (/[A-Z]/.test(e)) {
      s += '-' + e.toLowerCase()
      return
    }
    s += e
  });
  return s
}
const prefixIcon = ''

function createIcon (name) {
  let i = document.createElement('i')
  i.className = prefixIcon + name
  return i
}

function createAddIcon (size='50px') {
  let icon = createIcon('add')
  
  let addStyle = {
    display: 'inline-block',
    width: size,
    height: size,
    borderRadius: '50%',
    color: '#fff',
    // border: '2px dashed',
    transition:' color .25s',
    position: 'relative',
    // overflow: 'hidden',
    boxShadow: 'none',
    cursor: 'pointer',
    backgroundColor: '#00BFFF'
  }
  let pseudoClassCommonStyle = {
    content: '\"\"',
    position: 'absolute',
    top: '50%',
    left: '50%'
  }
  const addLong = parseInt(size) * 0.7
  const addWidth = parseInt(size) * 0.06
  const addHalfLong = addLong / 2
  const addHalfWidth = addWidth / 2
  let beforeStyle = {
    width: addLong + 'px',
    borderTop: addWidth +'px solid',
    margin: '-' + addHalfWidth + 'px 0 0 -'+ addHalfLong + 'px',
  }
  let afterStyle = {
    height: addLong + 'px',
    borderLeft: addWidth + 'px solid',
    margin: '-'+ addHalfLong+'px 0 0 -' + addHalfWidth + 'px',
  }
  const name = '.' + icon.className.toString()
  let addRule = name + objectConvertString(addStyle)
  const beforeName = name + '::before'
  const afterName = name + '::after'
  // 伪类共用规则
  let pseudoClassCommonRule = beforeName + ', ' + afterName + objectConvertString(pseudoClassCommonStyle)
  // before伪类规则
  let beforeRule = beforeName + objectConvertString(beforeStyle)
  // after伪类规则
  let afterRule = afterName + objectConvertString(afterStyle)
  // 创建style标签
  var style = document.createElement("style");
  style.innerHTML = addRule + pseudoClassCommonRule + beforeRule + afterRule
  // 添加style标签
  document.body.appendChild(style)
  // 添加特效
  let iconDOM = document.getElementsByClassName(icon.className)
  if (iconDOM) {
    iconDOM[0].addEventListener('mouseenter', function () {
      iconDOM[0].style.boxShadow = '0px 0px 3px 2px #DCDCDC'
    })
    iconDOM[0].addEventListener('mouseleave', function () {
      iconDOM[0].style.boxShadow = 'none'
    })
  }
}
createAddIcon()
