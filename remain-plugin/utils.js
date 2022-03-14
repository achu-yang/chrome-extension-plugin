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
function convertDate (seconds) {
  let hour = parseInt(seconds / 3600)
  let residue = seconds - hour * 3600
  let minute = parseInt(residue / 60)
  return { hour, minute}
}
function deepClone (obj) {
  return JSON.parse(JSON.stringify(obj))
}
function sortFun(arr){ //封装一个名为sortFun的函数
  // console.log(arr.length)
  if (arr.length == 1) return arr
  let temp = 0; //定义一个变量，作为变量交换的中间量
  for(let i = 0; i < arr.length; i++){    //确定循环的次数
      for(let j = 0; j < arr.length - i -1; j++){ //确定相邻两个元素之间的位置
          if(arr[j]['time'] > arr[j+1]['time']){ //通过判断比较相邻两个元素的大小
              temp = deepClone(arr[j]);    //将比较的最大的值赋值给中间量
              arr[j] = deepClone(arr[j+1]);    //将比较的最小的值赋值给arr[j];
              arr[j+1] = deepClone(temp);    //将最大的那个中间值再赋值给arr[j+1]
          }
      }
  }
  return arr
}
function colorHex (color) {
  // RGB颜色值的正则
  var reg = /^(rgb|RGB)/;
  if (reg.test(color)) {
    var strHex = "#";
    // 把RGB的3个数值变成数组
    var colorArr = color.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
    // 转成16进制
    for (var i = 0; i < colorArr.length; i++) {
      var hex = Number(colorArr[i]).toString(16);
      if (hex === "0") {
        hex += hex;
      }
      strHex += hex;
    }
    return strHex;
  } else {
    return String(color);
  }
};
function convertName (str) {
  let list = str.split('')
  let s = ''
  list.forEach( e => {
    if (/[A-Z]/.test(e)) {
      s += '-' + e.toLowerCase()
      return
    }
    s += e
  });
  // console.log(s)
  return s
}
// convertName('LabcB')