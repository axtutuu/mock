((win, doc)=>{
  const menu    = doc.querySelector('.js-menu');
  const menuBtn = doc.querySelector('.js-menu__btn');
  menuBtn.addEventListener('click', (e)=>{
    menu.classList.toggle('active');
  });
})(window, document);
