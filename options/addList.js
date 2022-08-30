
// 添加列表按钮
document.getElementById('addList').addEventListener('click',function(){
  console.log(this)
  this.style.display = 'none';
  this.nextElementSibling.style.display = 'block';
  document.getElementById('addListInput').focus();
});

document.getElementById('confirmAddList').addEventListener('click',function(){
  console.log(document.getElementById('addListInput').value)
  addList(this,document.getElementById('addListInput').value)
  cancelAddList(this);
});

document.getElementById('cancelAddList').addEventListener('click',function(){
  cancelAddList(this);
});

let currentDragElement = null;
let isBox = false;

function cancelAddList (self) {
  document.getElementById('addListInput').value = '';
  let box = self.parentElement;
  box.previousElementSibling.style.display = 'block';
  box.style.display = 'none';
  box = null;
}

function addList (self, title) {
  let watch = self.parentElement.parentElement.parentElement;
  let watchList = document.createElement('div');
  let watchTitle = document.createElement('div');
  let listFunction = document.createElement('div');
  let left = document.createElement('div');
  let right = document.createElement('div');

  watchList.className = 'watch-list';
  watchTitle.className = 'watch-title';
  listFunction.className = 'list-function';
  left.className = 'left';
  right.className = 'right';

  left.innerHTML = '+ 新增';
  right.innerHTML = '折叠'
  watchTitle.innerHTML = title;

  i = 1;
  watchList.ondragover = function (e) {e.preventDefault();};
  watchList.ondrop = onList.bind(watchList);
  left.addEventListener('click',function(){
    createAddCardDialog().then((value)=>{
      console.log(  value)
      handleAddCard(this);
    })
  });

  right.$$_list_function_right = 1;
  right.addEventListener('click',function(){
    if (this.$$_list_function_right === 1) {
      this.innerHTML = '展开';
      this.$$_list_function_right = 2;
    } else {
      this.innerHTML = '折叠';
      this.$$_list_function_right = 1;
    }
  });

  left.style.cursor = 'pointer';
  right.style.cursor = 'pointer';

  listFunction.appendChild(left);
  listFunction.appendChild(right);
  watchList.appendChild(watchTitle);
  watchList.appendChild(listFunction);
  watch.insertBefore(watchList, self.parentElement.parentElement);
}

// 
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

function handleAddCard (self) {
  let dragBox = document.createElement('div');
  dragBox.draggable = true;
  dragBox.className = 'drag-box';
  let tag = document.createElement('div');
  let boxContent = document.createElement('div');
  tag.className = 'drag-tag';
  boxContent.className = 'drag-content';
  dragBox.appendChild(tag);
  dragBox.appendChild(boxContent);

  let obj = {
    content: '很高兴认识你',
    level: 2,
    ddl: '2022-08-24'
  }
  switch (obj.level) {
    case 1:
      tag.style.backgroundColor = 'var(--red-color)'
      break;
    default:
      tag.style.backgroundColor = 'var(--blue-color)'
  }
  boxContent.innerHTML = `
    <div class="drag-content">${obj.content}</div>
    <div class="drag-ddl"><img src='./icon/options/time.svg'/><div>${obj.ddl}</div></div>
  `

  dragBox.ondragstart = ondragStart;
  dragBox.ondragend = ondragEnd;
  dragBox.ondragover = function (e) {e.preventDefault();};
  dragBox.ondrop = ondrag.bind(dragBox);

  let watchList = self.parentElement.parentElement;
  let last = watchList.lastElementChild;
  watchList.insertBefore(dragBox, last);
  watchList = null;
}


function createAddCardDialog () {
  return new Promise((resolve, reject)=>{
    let dialog = document.createElement('div');
    dialog.style.cssText = `
      position : fixed;
      z-index: 10000;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(0,0,0,0.7)
    `;
    let relativeBox = document.createElement('div');
    relativeBox.style.cssText = `
      width: 100%;
      height: 100%;
      position: relative;
    `;
    let box = document.createElement('div');
    box.style.cssText = `
    width: 50%;
    height: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    background-color: #ffffff;
    `;
    box.addEventListener('click',()=>{
      document.body.removeChild(dialog);
      resolve(1);
    })
    relativeBox.appendChild(box)
    dialog.appendChild(relativeBox)
    document.body.appendChild(dialog);
  });
}