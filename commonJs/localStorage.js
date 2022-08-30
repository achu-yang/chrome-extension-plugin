function getLocalStorageSize() {
  localStorage.clear();
  let str = '1'
  while (1) { // 不断成倍叠加str直至超出localStorage的存储限制
    str += str
    try {
      localStorage.removeItem('cache')
      localStorage.setItem('cache', str)
    } catch (err) {
      console.log(err.name)
      break;
    }
  }
  let half = str.length / 2
  let isAdd = 0
  let len = str.length
  let resStr = ''
  while (half) {
    half = Math.floor(half / 2)
    if (isAdd) { // 加
      len = len + half
    } else { // 减
      len = len - half
    }
    resStr = str.slice(0, len)
    try {
      localStorage.removeItem('cache')
      localStorage.setItem('cache', resStr)
      isAdd = 1
    } catch (err) {
      // err DOMException: Failed to execute 'setItem' on 'Storage': Setting the value of 'cache' exceeded the quota.
      isAdd = 0
    }
  }
  let cache = `${resStr.length}B`
  localStorage.clear();
  localStorage.setItem('localStorageSize', cache);
}

function checkRemainingCache() {
  let size = 0;
  for (item in window.localStorage) {
    if (window.localStorage.hasOwnProperty(item)) {
      size += window.localStorage.getItem(item).length;
    }
  }
  let remainingCache = ((parseInt(localStorage.getItem('localStorageSize')) - size) / 1024).toFixed(2) + 'KB'
  return remainingCache
}
