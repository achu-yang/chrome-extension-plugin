function createClock(DOM) {
  DOM.appendChild(initHTML())
  initCSS()
  initScript()
}
// const 
function initHTML () {
  let outerdiv = document.createElement('div')
  outerdiv.className = 'clock'
  for (let i = 0; i < 12; i++) {
    let div = document.createElement('div')
    div.id = 'clock-tag-' + i
    div.innerHTML = i
    outerdiv.appendChild(div)
  }
  let hourDiv = document.createElement('div')
  hourDiv.className = 'hour'
  let hrDiv = document.createElement('div')
  hrDiv.className = 'hr';
  hrDiv.id = 'hr'
  hourDiv.appendChild(hrDiv)
  let minDiv = document.createElement('div')
  minDiv.className = 'min';
  let mnDiv = document.createElement('div')
  mnDiv.className = 'mn';
  mnDiv.id = 'mn';
  minDiv.appendChild(mnDiv)
  let secDiv = document.createElement('div')
  secDiv.className = 'sec';
  let scDiv = document.createElement('div')
  scDiv.className = 'sc'
  scDiv.id = 'sc'
  secDiv.appendChild(scDiv)
  outerdiv.appendChild(hourDiv)
  outerdiv.appendChild(minDiv)
  outerdiv.appendChild(secDiv)
  return outerdiv
}
function initScript () {
  const deg=6;
  const hr=document.querySelector('#hr');
  const mn=document.querySelector('#mn');

  
  setInterval(()=>{
     let day=new Date();
     let hh=day.getHours()*30;
     let mm=day.getMinutes()*deg;
     let ss=day.getSeconds()*deg;
     hr.style.transform=`rotateZ(${hh+(mm/12)}deg)`;
     mn.style.transform=`rotateZ(${mm}deg)`;
     sc.style.transform=`rotateZ(${ss}deg)`;

  })
}
function initCSS () {
  let style = document.createElement('style')
  style.innerHTML = `
  .clock
  {
      width: 100px;
      height: 100px;
      display: flex;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      justify-content: center;
      align-items: center;
      /* background: url(clock.png); */
      background-color: #333333;
      border: 4px solid #71ccf8;
      border-radius: 50%;
      background-size: cover;
      box-shadow: 0 -15px 15px rgba(255, 255, 255, 0.05),
                  inset 0 -15px 15px rgba(255, 255, 255, 0.05),
                  0 15px 15px rgba(0, 0, 0, 0.3),
                  inset 0 15px 15px rgba(0, 0, 0, 0.3);
  }
  .clock::before
  {
      content: '';
      display: flex;
      position: absolute;
      width: 5px;
      height: 5px;
      background: red;
      border-radius: 50%;
      z-index: 10000;
      
  }
  .clock .hour,
  .clock .min,
  .clock .sec
  {
      position: absolute;
  }
  .clock .hour, .hr
  {
      width: 40px;
      height: 40px;
  }
  .clock .min, .mn
  {
      width: 60px;
      height: 60px;
  }
  .clock .sec, .sc
  {
      width: 80px;
      height: 80px;
  }
  .hr,.mn,.sc
  {
      display: flex;
      justify-content: center;
      /*align-items: center;*/
      position: absolute;
  }
  .hr::before
  {
      content: '';
      display: flex;
      width: 8px;
      height: 20px;
      background: red;
      z-index: 10;
      border-radius: 6px 6px 0 0;
  }
  .mn::before
  {
      content: '';
      display: flex;
      width: 4px;
      height: 30px;
      background: white;
      z-index: 11;
      border-radius: 6px 6px 0 0;
  }
  .sc::before
  {
      content: '';
      display: flex;
      width: 2px;
      height: 40px;
      background: white;
      z-index: 12;
      border-radius: 6px 6px 0 0;
  }
  div[id^="clock-tag-"] {
    width: 7px; 
    height: 5px;
    font-size: .1em; 
    position: absolute;
    color: #fff;
    top: 0; 
    left: 46.5px;
    transform-origin: 50% 50px;
  }
  
  #clock-tag-1 { transform: rotate(30deg) }
  #clock-tag-2 { transform: rotate(60deg) }
  #clock-tag-3 { transform: rotate(90deg) }
  #clock-tag-4 { transform: rotate(120deg) }
  #clock-tag-5 { transform: rotate(150deg) }
  #clock-tag-6 { transform: rotate(180deg) }
  #clock-tag-7 { transform: rotate(210deg) }
  #clock-tag-8 { transform: rotate(240deg) }
  #clock-tag-9 { transform: rotate(270deg) }
  #clock-tag-10 { transform: rotate(300deg) }
  #clock-tag-11 { transform: rotate(330deg) }
  `
  document.body.appendChild(style)
}
const place = document.getElementsByClassName('clock-container')[0]
place.style.position = 'relative'
place.style.margin = '20px auto'
place.style.width = '100%'
place.style.height = '100px'
createClock(place)
