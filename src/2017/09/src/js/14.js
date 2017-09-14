const $width = $('.js-width');
const $displayWidth = $('.js-display-width');
const $scale = $('.js-sacle');

const width = $(window).width();
$(window).on('touchmove', function(evt) {
  const innerWidth = window.innerWidth;

  $width.text(width);
  $displayWidth.text(innerWidth);
  $scale.text(width/innerWidth);
  console.log(evt.originalEvent.touches.length);
  console.log(width/innerWidth, width, innerWidth);
});
