
function setStorage (key, data) {
  let storage = window.localStorage;
  let dataValue = JSON.stringify(data);
  storage.setItem(key, dataValue);
}

function getStorage (key) {
  let storage = window.localStorage;
  let json = storage.getItem(key);
  let jsonObj = JSON.parse(json);
  return jsonObj;
}

// 删除指定的键值对
function clearStorage (key) {
  let storage = window.localStorage;
  storage.removeItem(key); 
}

// 删除所有键值对
function clearStorageAll () {
  let storage = window.localStorage;
  storage.clear();
}