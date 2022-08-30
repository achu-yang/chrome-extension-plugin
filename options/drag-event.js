let currentDragElement = null;
let isBox = false;
document.querySelectorAll('.drag-box').forEach(function(item){
  item.ondragstart = ondragStart;
  item.ondragend = ondragEnd;
  item.ondragover = function (e) {e.preventDefault();};
  item.ondrop = ondrag.bind(item);
});
document.querySelectorAll('.watch-list').forEach(function(item){
  item.ondragover = function (e) {e.preventDefault();};
  item.ondrop = onList.bind(item);
});

function ondragStart (event) {
  currentDragElement = this;
  this.style.opacity = 0.3
}
// document.addEventListener('mousedown',(event)=>{
//   console.log('ondragEnd', event.clientX,event.clientY)
// })
function ondragEnd (event) {
  this.style.opacity = 1;
  console.log('ondragEnd', event.clientX,event.clientY);
  currentDragElement = null;
  isBox = false;
}
function ondrag (event) {
  if (this === currentDragElement) {
    isBox = true;
    return;
  }
  let fromElement = currentDragElement;
  let toElement = this;
  let toElementParent = this.parentElement;
  let {top: toTop,height: toHeight} = toElement.getBoundingClientRect();

  if ((event.clientY - toHeight / 2) < toTop) {
    toElementParent.insertBefore(fromElement,toElement);
  } else {
    if (toElement.nextSibling && toElement.nextSibling.className === 'drag-box') {
      toElementParent.insertBefore(fromElement,toElement.nextSibling);
    } else {
      let last = toElementParent.lastElementChild;
      toElementParent.appendChild(fromElement);
      toElementParent.appendChild(last);
      last = null;
    }
  }
  isBox = true;
}

function onList (event) {
  if (isBox) {
    return;
  }
  let last = this.lastElementChild;
  this.appendChild(currentDragElement);
  this.appendChild(last);
}