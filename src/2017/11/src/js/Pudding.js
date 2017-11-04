import 'hammerjs';

export default class Pudding {
  constructor(opts) {
    const mc  = new Hammer(opts.el)
    console.log(mc)
  }
}
