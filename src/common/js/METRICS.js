

//-------------------------------------------------------------------------------------------
//  METRICS 度量
//-------------------------------------------------------------------------------------------

export function metrics(ratio,width,height,ctx) {

    // GET DISPLAY DIMENSIONS //获取显示尺寸
    ratio = getPixelRatio(ctx);
    width = window.innerWidth * ratio;
    height = window.innerHeight * ratio;


    // SET CANVAS DIMENSIONS // 设置canvas尺寸
    canvas.width  = width;
    canvas.height = height;

}


//-------------------------------------------------------------------------------------------
//  PIXEL RATIO  像素比率
//-------------------------------------------------------------------------------------------

function getPixelRatio(ctx) {
    var dpr = window.devicePixelRatio || 1;
    var bsr = ctx.webkitBackingStorePixelRatio ||
        ctx.mozBackingStorePixelRatio ||
        ctx.msBackingStorePixelRatio ||
        ctx.oBackingStorePixelRatio ||
        ctx.backingStorePixelRatio || 1;
    return dpr / bsr;
}
