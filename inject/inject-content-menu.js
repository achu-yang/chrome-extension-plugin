chrome.extension.onRequest.addListener(
  function (request, sender, sendResponse) {
    switch (request.type) {
      case "HiddenOutline":
        document.querySelectorAll('*').forEach(item => item.style.outline = 'none');
        break;
      case "ShowOutline":
        document.querySelectorAll('*').forEach(item => item.style.outline = `1px solid #${Math.floor(Math.random() * 16777216).toString(16)}`);
        break;
    }
  });
// window.onbeforeunload = changeOutlineState

