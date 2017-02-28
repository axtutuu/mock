import Physics from './modules/Physics.js';

((doc, win)=>{
  console.log('physic');
  const physic = new Physics({
    canvas: doc.querySelector('.js-canvas'),
  });
})(document, window);
