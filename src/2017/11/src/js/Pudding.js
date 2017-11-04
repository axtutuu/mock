import 'hammerjs';

export default class Pudding {
  constructor(opts) {
    const mc  = new Hammer(opts.el)

    mc.get('pan').set({ direction: Hammer.DIRECTION_ALL });
    console.log(mc);

    mc.on('panstart', (e) => {
      console.log(e)
    });
  }
}
