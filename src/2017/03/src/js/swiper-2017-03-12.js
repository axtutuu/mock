import Swiper from 'swiper';

((win,doc)=>{
  console.log('swiper');
  // const swiper = new Swiper('.swiper-container');
  var swiper = new Swiper('.swiper-container', {
      slidesPerView: 3,
      centeredSlides: true,
      paginationClickable: true,
      spaceBetween: 30,
  });
})(window, document);
