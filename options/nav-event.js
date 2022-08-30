document.querySelectorAll('.header-item').forEach((item, index)=>{
  item.addEventListener('click',()=>{
    document.querySelectorAll('.header-item').forEach((item, i)=>{
      if (index !== i) {
        item.className = 'header-item';
      } else {
        item.className = 'header-item nav-activate';
      }
    });
  });
});