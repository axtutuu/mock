import $ from "jquery";

((win, doc)=>{
  let $checkbox = $("#escape");
  $(window).on("beforeunload", ()=>{
    if(!$checkbox[0].checked) {
      window.open(location.href);
    }
  });
})(window, document);
