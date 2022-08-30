const ID = getStorage('extensionID');
document.getElementById('test').addEventListener('click',()=>{
  chrome.tabs.create({
    url: `extension://${ID}/options.html`
  });
})