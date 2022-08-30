
const ID = getStorage('extensionID');
const Name = 'One-click Kittens';
if (ID === null || ID === undefined) {
  checkSelfId();
  getLocalStorageSize()
}
function checkSelfId () {
  chrome.management.getAll(function(arr){
    arr.forEach((extension)=>{
      if (Name === extension.name) {
        setStorage('extensionID',extension.id);
      }
    })
  });
}
checkRemainingCache()