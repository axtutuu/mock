let timer = false;
window.addEventListener("resize",()=>{
    if(timer !== false) { clearTimeout(timer); }
    timer = setTimeout(() => {
        let dw = window.innerWidth;
        if(dw <= 1024) {
            // width: 1024pxのときのfont-size: 100pxを基準値として拡大縮小;
            document.documentElement.style.fontSize = (dw*100/1024) + "px";
        }
    });
});
