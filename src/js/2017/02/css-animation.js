import $ from 'jquery';
(()=>{
  const CLASS_LIST = {
    'js-fade-out': 'fade-out',
    'js-to-right': 'toRight'
  };

  $('.box').on('click', (e)=> {
    addClass(e.target, targerClass(e.target.className));
  });

  function addClass(target, className) {
    target.querySelector('div').classList.toggle(className);
  }

  function targerClass(className) {
    const target = className.split(' ')[1];
    return CLASS_LIST[target];
  }

})();
