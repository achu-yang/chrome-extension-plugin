// 监听事件
chrome.extension.onConnect.addListener(function(port) {
  console.assert(port.name == "knockknock");
  port.onMessage.addListener(function(msg) {
    console.log(document)
    if (msg.joke == "Knock knock")
      port.postMessage({question: "Who's there?"});
    else if (msg.answer == "Madame")
      port.postMessage({question: "Madame who?"});
    else if (msg.answer == "Madame... Bovary")
      port.postMessage({question: "I don't get it."});
  });
});
function getCharacter(flag){ 
  var character = ""; 
  if(flag === "lower"){ 
  character = String.fromCharCode(Math.floor( Math.random() * 26) + "a".charCodeAt(0)); 
  } 
  if(flag === "upper"){ 
  character = String.fromCharCode(Math.floor( Math.random() * 26) + "A".charCodeAt(0)); 
  } 
  return character; 
}
function randomId (num) {
  let s = ''
  for(let i = 0; i < num; i++) {
    s = s + getCharacter('lower')
  }
  return s
}
function createList () {
  let _init = []
  for (let i = 0; i < 4; i++) {
    let random = randomId(10)
    _init.push({
      time: "",
      content: random
    })
  }
  return _init
}
// localStorage.clear()
console.log(localStorage)
// localStorage.setItem("test",JSON.stringify(createList()))
