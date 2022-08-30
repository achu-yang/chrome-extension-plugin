function createSwitch (type) {
  if (!type) {
    type = 1;
  }
  let switchBox = document.createElement('div');
  switchBox.className = `switch-box `;
  let switchButton = document.createElement('div');
  switchButton.$$_uutype = type;
  switchButton.className = `switch-button`
  let switchBackground = document.createElement('div');
  switchBackground.className = `switch-background`
  switchBox.appendChild(switchButton);
  switchBox.appendChild(switchBackground);
  switchButton.addEventListener('click',function(){
    if (this.$$_uutype == 1) {
      switchButton.className = `switch-button button-activate`;
      switchBackground.className = `switch-background background-activate`;
      this.$$_uutype = 2;
    } else {
      switchButton.className = `switch-button button-no-activate`;
      switchBackground.className = `switch-background background-no-activate`;
      this.$$_uutype = 1
    }
  });
  // return switchBox
  document.getElementById('list').appendChild(switchBox);
}