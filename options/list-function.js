document.querySelectorAll('.list-function left').forEach(item=>{
  item.$$_list_function_left = 1;
  item.addEventListener('click',()=>{
    if (item.$$_list_function_left === 1) {
      item.innerHTML = '展开';
      item.$$_list_function_left = 2;
    } else {
      item.innerHTML = '折叠';
      item.$$_list_function_left = 1;
    }
  })
})