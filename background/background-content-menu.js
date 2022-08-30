// 唯一右键功能id
let contextMenusId;

contextMenusId = chrome.contextMenus.create({
  "title": "快速查看布局",
  "contexts": ["page"],
  "onclick": clickContextMenus,
  "documentUrlPatterns": ["http://*/*", "https://*/*"]
});


// 监听激活tab标签
chrome.tabs.onSelectionChanged.addListener(function (tabId, selectInfo) {
  let title = changeState(tabId);
  chrome.contextMenus.update(contextMenusId, {
    "title": title,
    "contexts": ["page"],
    "onclick": clickContextMenus,
    "documentUrlPatterns": ["http://*/*", "https://*/*"]
  });
});

// 监听tab标签创建
chrome.tabs.onCreated.addListener(function (tab) {
  let tabId = (tab.id).toString();
  sessionStorage.setItem(tabId, '2');
  let title = changeState(tabId);
  chrome.contextMenus.update(contextMenusId, {
    "title": title,
    "contexts": ["page"],
    "onclick": clickContextMenus,
    "documentUrlPatterns": ["http://*/*", "https://*/*"]
  });
});

// 监听tab标签刷新/更改url
chrome.extension.onRequest.addListener(
  function (request, sender, sendResponse) {
    let tabId = sender.tab.id;
    sessionStorage.setItem(tabId, '2');
    let title = changeState(tabId);
    chrome.contextMenus.update(contextMenusId, {
      "title": title,
      "contexts": ["page"],
      "onclick": clickContextMenus,
      "documentUrlPatterns": ["http://*/*", "https://*/*"]
    });
  });

// 监听tab移除
chrome.tabs.onRemoved.addListener(function (tabId) {
  sessionStorage.removeItem(tabId);
});

function changeState(tabId) {
  let title;
  if (sessionStorage.getItem(tabId) === '1') {
    title = "取消查看布局";
  } else {
    title = "快速查看布局";
  }
  return title
}

function clickContextMenus(info, tab) {
  let tabId = tab.id;
  let title;
  if (sessionStorage.getItem(tabId) === '2') {
    title = "取消查看布局";
    sessionStorage.setItem(tabId, '1');
    sendMessage(tabId, 'show');
  } else {
    title = "快速查看布局";
    sessionStorage.setItem(tabId, '2');
    sendMessage(tabId, 'hidden');
  }
  chrome.contextMenus.update(contextMenusId, {
    "title": title,
    "contexts": ["page"],
    "onclick": clickContextMenus,
  });
}

function sendMessage(tabId, status) {
  if (status === 'hidden') {
    chrome.tabs.sendRequest(tabId, { type: "HiddenOutline" }, function (response) {
    });
  } else {
    chrome.tabs.sendRequest(tabId, { type: "ShowOutline" }, function (response) {
    });
  }
}

