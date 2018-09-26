<template>
  <div class="music" onresize="metrics()">
    <canvas id="canvas" ref="canvas"></canvas>

    <!--<div id='tt'>xuanxin</div>-->
    <!--<div id='line'></div>-->
    <!--</div>-->

  </div>
</template>

<script>
  // 通过屏幕尺寸确定画布大小
  import {metrics} from 'common/js/METRICS';
  import {RGBA, color} from "common/js/lib/colorflex"
  import Tombola from "common/js/lib/tombola"

  import Paint from 'common/js/class_paint'

  export default {
    name: "music",
    data() {
      return {
        // 指标 //
        canvas: {},
        width: 0,
        height: 0,
        ratio: 1,// 比率
        TAU: 2 * Math.PI,
        ctx: null,

        //质地
        textureCol: [],
        textureCol2: [],
        lastPalette: 0,// 最终调色
        paint: {}, // 涂料

        // 调色板
        palettes: [],
      }
    },
    computed: {},
    methods: {

      // 初始化
      init: function () {
        // 初始化颜色数据
        this.textureCol = [new RGBA(0, 32, 185, 1), new RGBA(235, 98, 216, 1), new RGBA(10, 200, 200, 1), new RGBA(255, 245, 235, 1), new RGBA(5, 5, 5, 1), new RGBA(255, 160, 180, 1), new RGBA(255, 170, 170, 1), new RGBA(255, 140, 90, 1), new RGBA(245, 25, 35, 1), new RGBA(10, 10, 70, 1), new RGBA(255, 80, 100, 1), new RGBA(70, 0, 80, 1), new RGBA(120, 235, 200, 1), new RGBA(160, 150, 170, 1), new RGBA(220, 20, 80, 1), new RGBA(210, 150, 120, 1)];
        this.textureCol2 = [new RGBA(0, 0, 40, 1), new RGBA(0, 52, 65, 1), new RGBA(255, 230, 140, 1), new RGBA(255, 80, 100, 1), new RGBA(255, 180, 210, 1)];
        this.palettes = [[this.textureCol2[0], this.textureCol[10], this.textureCol2[1]], // dark > pink > grey/green
          [this.textureCol2[0], this.textureCol2[3], this.textureCol[15]], // flesh > gold
          [this.textureCol2[0], this.textureCol2[1], this.textureCol2[2]], // dark green > yellow
          [this.textureCol[4], this.textureCol2[1], this.textureCol[10]], // petrel > pink
          [this.textureCol[4], this.textureCol[9], this.textureCol[11]], // dark > purple
          [this.textureCol[4], this.textureCol2[0], this.textureCol[11]], // extra dark > purple
          [this.textureCol[4], this.textureCol[11], this.textureCol[12]], // purple > turquoise
          [this.textureCol2[1], this.textureCol[14], this.textureCol[10]], // dark > red
          [this.textureCol[9], this.textureCol[10], this.textureCol[12]], // dark purple > flesh  > turquoise
          [this.textureCol2[1], this.textureCol[10], this.textureCol[12]], // dark > flesh > turquoise
          [this.textureCol[4], this.textureCol[9], this.textureCol[14]], // dark purple > magenta
          [this.textureCol[4], this.textureCol[9], this.textureCol[12]], // dark > turquoise
          [this.textureCol[4], this.textureCol[9], this.textureCol[8]], // dark purple > red
          [this.textureCol2[0], this.textureCol2[3], this.textureCol[6]], // pinks
          [this.textureCol[4], this.textureCol2[0], this.textureCol2[3]], // very dark > pink
          [this.textureCol[4], this.textureCol2[0], this.textureCol[7]], // dark > gold
          [this.textureCol[4], this.textureCol[9], this.textureCol[7]], // dark blue > gold
          [this.textureCol2[0], this.textureCol2[1], this.textureCol[10]], // dark blue/green > pink
          [this.textureCol[4], this.textureCol2[1], this.textureCol[14]], // dark green > magenta
          [this.textureCol2[0], this.textureCol[13], this.textureCol[5]], // grey > pink marble
          [this.textureCol[10], this.textureCol[13], this.textureCol[5]], // pink > grey > pink flamingo
          [this.textureCol2[1], this.textureCol[13], this.textureCol[10]], // grey green > coral
          [this.textureCol[3], this.textureCol[13], this.textureCol[10]], // white grey > pink * not sure
          [this.textureCol[3], this.textureCol[13], this.textureCol[9]],  // white grey > dark purple
          [this.textureCol[4], this.textureCol[9], this.textureCol2[1]],  // dark green > blue
          [this.textureCol[3], this.textureCol2[0], this.textureCol[4]],  // white > dark
          [this.textureCol2[0], this.textureCol2[1], this.textureCol[7]], // dark green > gold
          [this.textureCol2[0], this.textureCol[9], this.textureCol[5]], // navy > bubblegum pink
          [this.textureCol[6], this.textureCol[13], this.textureCol[10]], // pale pink > grey coral
          [this.textureCol[4], this.textureCol2[0], this.textureCol[15]], // dark > cream
          [this.textureCol[4], this.textureCol[9], this.textureCol[13]], // dark blue > pale grey
          [this.textureCol[4], this.textureCol[9], this.textureCol[6]], // dark blue > pale pink
          [this.textureCol[4], this.textureCol[9], this.textureCol[10]], // dark blue > coral pink
          [this.textureCol2[0], this.textureCol[0], this.textureCol[5]], // electric blue > bubblegum
          [this.textureCol[0], this.textureCol2[0], this.textureCol[4]] // dark > electric blue
        ];
        // 设置画布 //
        console.log(this);
        this.canvas = this.$refs.canvas;
        this.ctx = this.canvas.getContext('2d');

        // 设置画布大小和绘图位置 //
        metrics(this.ratio, this.width, this.height, this.ctx);

        setTimeout(() => {
          // 初始化涂料 //
          this.resetPaint();
          // 开始循环 //
          this.loop();
        }, 1000);
      },

      // 重置涂料
      resetPaint: function () {

        // 选择调色板并存储内存以防止重复 //
        let ind = this.lastPalette;
        let tombola = new Tombola();

        while (ind === this.lastPalette) {

          ind = tombola.range(0, this.palettes.length - 1);
        }
        let p = this.palettes[ind];
        this.lastPalette = ind;
        console.log(ind);

        this.paint = new Paint(this.ctx, this.width, this.height,this.ratio, tombola.rangeFloat(0.6, 2), p[0], p[1], p[2], 0.05, 0.3);
      },
      //利用loop递归调用达到动画循环
      loop: function () {
        this._draw();
        requestAnimationFrame(this.loop);
      },

      // 绘制
      _draw: function () {
        this.paint.draw(4);
      }
    },
    mounted() {
      this.init();
    }
  }
</script>

<style scoped>

</style>
