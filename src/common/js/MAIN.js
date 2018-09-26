import {RGBA,color} from "common/js/lib/colorflex"
import tombola,{Tombola} from "common/js/lib/tombola"
import {Paint} from "common/js/PAINT"

// 定义 //
var canvas;
var ctx;
var stats;

// 指标 //
var width = 0;
var height = 0;
export var ratio = 1; // 比率
var TAU = 2 * Math.PI;


// 交互作用 //
var mouseX = 0;
var mouseY = 0;
var mouseIsDown = false;

// 质地 //
var textureCol = [new RGBA(0,32,185,1),new RGBA(235,98,216,1),new RGBA(10,200,200,1),new RGBA(255,245,235,1),new RGBA(5,5,5,1),new RGBA(255,160,180,1),new RGBA(255,170,170,1),new RGBA(255,140,90,1),new RGBA(245,25,35,1),new RGBA(10,10,70,1),new RGBA(255,80,100,1),new RGBA(70,0,80,1),new RGBA(120,235,200,1),new RGBA(160,150,170,1),new RGBA(220,20,80,1),new RGBA(210,150,120,1)];
var textureCol2 = [new RGBA(0,0,40,1),new RGBA(0,52,65,1),new RGBA(255,230,140,1),new RGBA(255,80,100,1),new RGBA(255,180,210,1)];
var lastPalette = 0; // 最终调色
var paint; // 涂料
var imgData;

var addNoise = false;


color.lowPass = new RGBA(50,45,25,0);

// 调色板
var palettes = [

    [textureCol2[0], textureCol[10], textureCol2[1]], // dark > pink > grey/green
    [textureCol2[0], textureCol2[3], textureCol[15]], // flesh > gold
    [textureCol2[0], textureCol2[1], textureCol2[2]], // dark green > yellow
    [textureCol[4], textureCol2[1], textureCol[10]], // petrel > pink
    [textureCol[4], textureCol[9], textureCol[11]], // dark > purple
    [textureCol[4], textureCol2[0], textureCol[11]], // extra dark > purple
    [textureCol[4], textureCol[11], textureCol[12]], // purple > turquoise
    [textureCol2[1], textureCol[14], textureCol[10]], // dark > red
    [textureCol[9], textureCol[10], textureCol[12]], // dark purple > flesh  > turquoise
    [textureCol2[1], textureCol[10], textureCol[12]], // dark > flesh > turquoise
    [textureCol[4], textureCol[9], textureCol[14]], // dark purple > magenta
    [textureCol[4], textureCol[9], textureCol[12]], // dark > turquoise
    [textureCol[4], textureCol[9], textureCol[8]], // dark purple > red
    [textureCol2[0], textureCol2[3], textureCol[6]], // pinks
    [textureCol[4], textureCol2[0], textureCol2[3]], // very dark > pink
    [textureCol[4], textureCol2[0], textureCol[7]], // dark > gold
    [textureCol[4], textureCol[9], textureCol[7]], // dark blue > gold
    [textureCol2[0], textureCol2[1], textureCol[10]], // dark blue/green > pink
    [textureCol[4], textureCol2[1], textureCol[14]], // dark green > magenta
    [textureCol2[0], textureCol[13], textureCol[5]], // grey > pink marble
    [textureCol[10], textureCol[13], textureCol[5]], // pink > grey > pink flamingo
    [textureCol2[1], textureCol[13], textureCol[10]], // grey green > coral
    [textureCol[3], textureCol[13], textureCol[10]], // white grey > pink * not sure
    [textureCol[3], textureCol[13], textureCol[9]],  // white grey > dark purple
    [textureCol[4], textureCol[9], textureCol2[1]],  // dark green > blue
    [textureCol[3], textureCol2[0], textureCol[4]],  // white > dark
    [textureCol2[0], textureCol2[1], textureCol[7]], // dark green > gold
    [textureCol2[0], textureCol[9], textureCol[5]], // navy > bubblegum pink
    [textureCol[6], textureCol[13], textureCol[10]], // pale pink > grey coral
    [textureCol[4], textureCol2[0], textureCol[15]], // dark > cream
    [textureCol[4], textureCol[9], textureCol[13]], // dark blue > pale grey
    [textureCol[4], textureCol[9], textureCol[6]], // dark blue > pale pink
    [textureCol[4], textureCol[9], textureCol[10]], // dark blue > coral pink
    [textureCol2[0], textureCol[0], textureCol[5]], // electric blue > bubblegum
    [textureCol[0], textureCol2[0], textureCol[4]] // dark > electric blue
];


//-------------------------------------------------------------------------------------------
//  初始化
//-------------------------------------------------------------------------------------------

function init() {

    // 设置实验 //
    setupExperiment();

    // 设置画布 //
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');


    // 设置画布和绘图位置 //
    metrics();

    // 相互作用 //
    //setupInteraction();

    // 统计 //
    //initStats();

    // 生成噪音层 //
    canvasNoise(200, 200, ratio, 0.025, 'noiseLayer');


    // css过渡变化 //
    var overlay = document.getElementById('overlay');
    overlay.style.top = '0';
    overlay.style.opacity = '1';

    setTimeout(function() {
        // 初始化涂料 //
        resetPaint();

        // 开始循环 //
        loop();
    }, 1000);
}

export function resetPaint() {

    // 选择调色板并存储内存以防止重复 //
    var ind = lastPalette;
    // var tombola = new Tombola();
    while (ind === lastPalette) {
        ind = tombola.prototype.range(0, palettes.length - 1);
    }
    var p = palettes[ind];
    lastPalette = ind;
    console.log(ind);

    paint = new Paint(ctx, width, height, tombola.prototype.rangeFloat(0.6, 2), p[0], p[1], p[2], 0.05, 0.3);
}

// 监视JS性能 fps ms mb custom等 暂时不调用
// function initStats() {
//     stats = new Stats();
//     stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
//     document.body.appendChild( stats.dom );
// }


//-------------------------------------------------------------------------------------------
//  主循环
//-------------------------------------------------------------------------------------------


export function loop() {
    // stats 是一个JS性能监视器，暂时不调用
    // if (stats) stats.begin();
    // update();
    draw();
    // if (stats) stats.end();
    requestAnimationFrame(loop);
}


//-------------------------------------------------------------------------------------------
//  更新
//-------------------------------------------------------------------------------------------

// function update() {
//     if (experiment) {
//         experiment.update();
//     }
// }


//-------------------------------------------------------------------------------------------
//  绘制
//-------------------------------------------------------------------------------------------

function draw() {
    paint.draw(4);
}
