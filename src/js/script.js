import Sample from './lib/Sample';
import $ from 'jquery';
// require("jquery.scrollbar");

const sample = new Sample({
    name: 'world'
});

$('.wrapper').on('click', () => {
    console.log(`hello, ${sample.name}.`);
});
// $(".scrollbar-chrome").scrollbar();
