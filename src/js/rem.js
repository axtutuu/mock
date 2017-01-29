let timer = false;
window.addEventListener("resize",()=>{
    if(timer !== false) { clearTimeout(timer); }
    timer = setTimeout(() => {
        let vw = window.innerWidth;
        if(vw < 700) {
            console.log(vw);
        }
    });
});
