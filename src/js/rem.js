let timer = false;
window.addEventListener("resize",()=>{
    if(timer !== false) { clearTimeout(timer); }
    timer = setTimeout(() => {
        let vw = window.innerWidth;
        if(vw <= 1024) {
            // width: 1024pxのときのfont-size: 100pxを基準値として拡大縮小;
            document.documentElement.style.fontSize = (vw*100/1024) + "px";
        }
    });
});
