// function getCharacter(flag){ 
//   var character = ""; 
//   if(flag === "lower"){ 
//   character = String.fromCharCode(Math.floor( Math.random() * 26) + "a".charCodeAt(0)); 
//   } 
//   if(flag === "upper"){ 
//   character = String.fromCharCode(Math.floor( Math.random() * 26) + "A".charCodeAt(0)); 
//   } 
//   return character; 
// }
// function randomId (num) {
//   let s = ''
//   for(let i = 0; i < num; i++) {
//     s = s + getCharacter('lower')
//   }
//   return s
// }
// function createList () {
//   let _init = []
//   for (let i = 0; i < 4; i++) {
//     let random = randomId(10)
//     _init.push({
//       time: "",
//       content: random
//     })
//   }
//   return _init
// }
// localStorage.clear()
// console.log('hhhh')

let list = [
  {
    time: 39900,
    content: '我要睡觉啦',
    isStart: true
  }
]
localStorage.setItem("remain", JSON.stringify(list))
console.log(localStorage)
// 监听事件
chrome.extension.onConnect.addListener(function(port) {
  console.assert(port.name == "remain-plugin-channel");
  port.onMessage.addListener(function(msg) {
    if (msg.request === "getCurrentTab") {
      chrome.tabs.getSelected(null, function(tab){
        console.log('first', tab.id)
        port.postMessage({response: "getCurrentTab", id: tab.id, localStorage: localStorage, status: "success"})
      });
    }
    if (msg.request == "confirmInfo") {
      chrome.tabs.getSelected(null, function(tab){
        console.log('second', tab.id)
        port.postMessage({response: "confirmInfo", id: tab.id, localStorage: localStorage, index: msg.index,status: "success"})
      });
    }
    // if (msg.joke == "Knock knock")
    //   port.postMessage({question: "Who's there?"});
    // else if (msg.answer == "Madame")
    //   port.postMessage({question: "Madame who?"});
    // else if (msg.answer == "Madame... Bovary")
    //   port.postMessage({question: "I don't get it."});
  });
});
// console.log(chrome.tabs.getCurrent.id)
// setTimeout(() => {
//   chrome.tabs.getSelected(null, function(tab){
//     console.log(tab)
//     chrome.tabs.executeScript(tab.id,{
//       file: 'remain.js' 
//     })
// });
// }, 3000);

// localStorage.setItem("test",JSON.stringify(createList()))
// (function (root) {
//   let list = ["哈哈哈哈"]
//  localStorage.setItem("remian", JSON.stringify(list))
// })(this)