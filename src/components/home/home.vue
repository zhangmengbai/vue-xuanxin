<template>
  <div class="home" ref="home">

    <canvas class="flow-canvas" id="canvas"></canvas>
    <div id='noiseLayer'></div>
    <div v-if="bLoad === true" class="preloader">
      <div class="status">
        <img src="../../common/images/logo-big.png" alt="logo">
      </div>
    </div>
    <!--打字效果部分-->

    <section id="welcome">
      <div class="hero-content">
        <vue-typed-js class="typed" :strings="['Had I not seen the Sun ^1000', 'I could have borne the shade ^1000']"
                      :typeSpeed="100"
                      :loop="true" :backSpeed="70">
          <span class="typing"></span>
        </vue-typed-js>

      </div>
    </section>
    <div class="menuIcon">
      <svg class="ham hamRotate ham7 " :class="{active:mActive}" @click="mToggle" viewBox="0 0 100 100" width="60">
        <path
          class="line top"
          d="m 70,33 h -40 c 0,0 -6,1.368796 -6,8.5 0,7.131204 6,8.5013 6,8.5013 l 20,-0.0013">
        </path>
        <path
          class="line middle"
          d="m 70,50 h -40">
        </path>
        <path
          class="line bottom"
          d="m 69.575405,67.073826 h -40 c -5.592752,0 -6.873604,-9.348582 1.371031,-9.348582 8.244634,0 19.053564,21.797129 19.053564,12.274756 l 0,-40">
        </path>
      </svg>
    </div>
    <!--导航菜单-->
    <transition name="fade">
      <div class="menuList" v-if="isShowMenu">
        <a class="menuItem" >音乐主题页(制作中)</a>
        <a class="menuTitle">更多主题持续制作中</a>
        <!--<a class="menuItem" @click="toCas">To cas</a>-->
      </div>
    </transition>
  </div>
</template>

<script>
  import {VueTypedJs} from "vue-typed-js"
  import {metrics} from 'common/js/METRICS'
  import {RGBA} from "common/js/lib/RGBA"
  import Tombola from "common/js/lib/tombola"
  import Paint from 'common/js/class_paint'
  import color from 'common/js/class_paint'
  import canvasNoise from 'common/js/lib/canvas-noise'

  let canvas = null,
    hWidth = null,
    hHeight = null,

    // canvas部分
    width = 0,
    height = 0,
    ratio = 1,// canvas与屏幕比率
    TAU = 2 * Math.PI,
    textureCol = [],
    textureCol2 = [],
    lastPalette = 0,// 最终调色
    paint = {}, // 涂料
    palettes = [],
    ctx = {},
    addNoise = false;
  color.lowPass = new RGBA(50, 45, 25, 0);

  // 画布初始化
  function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext("2d");
    // 生成噪点层
    canvasNoise(100, 100, ratio, 0.1, 'noiseLayer');
    // 设置画布大小和绘图位置
    canvas.width = metrics(ratio, width, height, ctx).width;
    canvas.height = metrics(ratio, width, height, ctx).height;
    // 设置该页容器大小
    // hWidth = canvas.width + "px";
    // hHeight = canvas.height + "px";
    textureCol = [new RGBA(0, 32, 185, 1), new RGBA(235, 98, 216, 1), new RGBA(10, 200, 200, 1), new RGBA(255, 245, 235, 1), new RGBA(5, 5, 5, 1), new RGBA(255, 160, 180, 1), new RGBA(255, 170, 170, 1), new RGBA(255, 140, 90, 1), new RGBA(245, 25, 35, 1), new RGBA(10, 10, 70, 1), new RGBA(255, 80, 100, 1), new RGBA(70, 0, 80, 1), new RGBA(120, 235, 200, 1), new RGBA(160, 150, 170, 1), new RGBA(220, 20, 80, 1), new RGBA(210, 150, 120, 1)];
    textureCol2 = [new RGBA(0, 0, 40, 1), new RGBA(0, 52, 65, 1), new RGBA(255, 230, 140, 1), new RGBA(255, 80, 100, 1), new RGBA(255, 180, 210, 1)];
    palettes = [[textureCol2[0], textureCol[10], textureCol2[1]], // dark > pink > grey/green
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
    setTimeout(() => {
      // 初始化涂料 //
      resetPaint();
      // 开始循环 //
      loop();
    }, 1000);
  }

  // 重置涂料
  function resetPaint() {
    // 选择调色板并存储内存以防止重复 //
    let ind = lastPalette;
    let tombola = new Tombola();
    while (ind === lastPalette) {
      ind = tombola.range(0, palettes.length - 1);
    }
    let p = palettes[ind];
    lastPalette = ind;
    paint = new Paint(ctx, canvas.width, canvas.height, ratio, tombola.rangeFloat(0.6, 2), p[0], p[1], p[2], 0.05, 0.3, addNoise, resetPaint, TAU);
  }

  //利用loop递归调用达到动画循环
  function loop() {
    paint.draw(1);
    requestAnimationFrame(loop);
  }

  // setTimeout(init,1000);
  export default {
    data() {
      return {
        bLoad: false,
        mActive: false,
        isShowMenu: false,
      }
    },
    computed: {
    },
    methods: {
      toMusic: function () {
        this.$router.push({name: 'Music'})
      },
      toCas: function () {
        this.$router.push({name: 'CanvasTest'})
      },
      /*
       *svg效果方法
       */
      mToggle: function () {
        this.mActive = !this.mActive;
        this.isShowMenu = !this.isShowMenu;
        console.log(this.mActive)
      },

    },
    mounted() {
      // 挂载周期
      // 模拟加载
      setTimeout(() => {
        this.bLoad = false;
      }, 500);
      init()
    },

    components: {
      VueTypedJs
    }
  }

</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import '~common/stylus/reset'
  .home
    background-color: rgb(54, 49, 30)
    height 100%

  .flow-canvas
    position: absolute
    top: 0
    left: 0
    z-index -2
  #noiseLayer
    height: 100%
    width: 100%
    position: absolute
    top: 0
    left: 0

  .header
    width: 100%
    z-index: 9999

    .menu-button
      width: 34px
      height: 45px
      position: fixed
      right: 0
      margin-top: 13px
      margin-right: 35px
      z-index: 1000
      padding: 0
      cursor: pointer
      background: transparent
      border: none

      span
        display: block
        position: absolute
        height: 1px
        width: 100%
        background: #2f2f2f
        borer-radius: 9px
        opacity: 1
        left: 0

      span:nth-child(1)
        top: 0

      span:nth-child(2)
        top: 9px

      span:nth-child(3)
        top: 18px

  .content
    position: absolute
    width: 100%
    height: 100%

  .preloader
    position: fixed
    top: 0
    left: 0
    right: 0
    bottom: 0
    background-color: #FFF
    z-index: 999999

  .status
    width: 200px
    height: 200px
    position: absolute
    left: 50%
    top: 50%
    background-image: url('~common/images/loader.gif')
    background-repeat: no-repeat
    background-position: center center
    text-align: center
    margin: -40px 0 0 -100px

    img
      text-align: center
      margin-top: -80px

  #welcome
    display: block
    /*background: url("~common/images/hero1.jpg")*/
    background-size: cover
    min-width: 100%
    width: 100%


    .hero-content
      position: absolute
      text-align: center
      width: 100%
      left: 50%
      top: 50%
      z-index: -1
      /*pointer-events: none*/
      color #ffffff
      /*outline: 4px double #FFFFFF*/
      /*outline-offset: 8px*/
      -webkit-transform: translateX(-50%) translateY(-50%)
      transform: translateX(-50%) translateY(-50%)

    .typed
      display block
      font-weight: bold
      font-size: 60px
      letter-spacing: 1.5px
      margin: 0 auto

      .typing
        font-weight bold

  .menuIcon
    position: fixed
    bottom: 10px
    left: 10px
    color: #FFFFFF

  .ham
    cursor: pointer
    -webkit-tap-highlight-color: transparent
    transition: transform 400ms
    -moz-user-select: none
    -webkit-user-select: none
    -ms-user-select: none
    user-select: none

  .hamRotate.active
    transform: rotate(45deg)

  .hamRotate180.active
    transform: rotate(180deg)

  .line
    fill: none
    transition: stroke-dasharray 400ms, stroke-dashoffset 400ms
    stroke: currentColor;
    stroke-width: 5.5
    stroke-linecap: round

  .ham7
    .top
      stroke-dasharray: 40 82

  .ham7
    .middle
      stroke-dasharray: 40 111

  .ham7
    .bottom
      stroke-dasharray: 40 161

  .ham7.active
    .top
      stroke-dasharray: 17 82
      stroke-dashoffset: -62px

  .ham7.active
    .middle
      stroke-dashoffset: 23px

  .ham7.active
    .bottom
      stroke-dashoffset: -83px

  .menuList
    position: fixed;
    bottom: 70px;
    left: 20px;
    width: 200px
    font-size: 12px
    line-height: 1.6em
    letter-spacing 0.1em
    -webkit-transition: color 0.35s
    -moz-transition: color 0.35s
    -ms-transition: color 0.35s
    -o-transition: color 0.35s
    transition: color 0.35s

    .menuTitle
      display block
      padding 14px 0 14px 20px
      font-style italic
      font-size: 12px
      color #ffffff
      text-align left
      background-color #000000

    .menuItem
      display block
      padding 14px 0 14px 20px
      font-size 18px
      font-weight bold
      color #ffffff
      text-align left
      background-color #000000
      -webkit-transition: color 0.35s
      -moz-transition: color 0.35s
      -ms-transition: color 0.35s
      -o-transition: color 0.35s
      transition: color 0.35s
      cursor pointer

    .menuItem:hover
      background-color #ffffff
      color: #000

  .fade-enter-to, .fade-leave
    opacity: 1

  .fade-enter-active, .fade-leave-active
    transition: all 1s ease

  .fade-enter, .fade-leave-to
    transform: translateY(-100px)
    opacity: 0


</style>
