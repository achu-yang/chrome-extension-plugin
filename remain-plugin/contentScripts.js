function test() {
    // chrome.extension.sendRequest({channel: "channel1"}, function(response) {
    //   console.log(response);
    // });
    // setTimeout(() => {
    //   chrome.extension.sendRequest({greeting: "channel2"}, function(response) {
    //     console.log(response);
    //   });
    // }, 3000);
    var port = chrome.extension.connect({name: "knockknock"});
    port.postMessage({joke: "Knock knock"});
    port.onMessage.addListener(function(msg) {
      console.log(document);
      if (msg.question == "Who's there?") {
        port.postMessage({answer: "Madame"});
      }
      else if (msg.question == "Madame who?")
        port.postMessage({answer: "Madame... Bovary"});
    });
}
test()