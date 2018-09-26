<template>
  <div class="welcome">
    <div v-if="bLoad === true" class="preloader">
      <div class="status">
        <img src="~common/images/logo-big.png" alt="logo">
      </div>
    </div>
    <!--页头 -->
    <!--<div class="header">-->
      <!--<div class="for-sticky">-->
        <!--&lt;!&ndash;LOGO&ndash;&gt;-->
        <!--<div class="logo">-->
          <!--<a href="index.html"><img alt="logo" class="logo-nav" src="~common/images/logo.jpg"></a>-->
        <!--</div>-->
        <!--&lt;!&ndash;/.LOGO END&ndash;&gt;-->
      <!--</div>-->
      <!--&lt;!&ndash;<button class="menu-button" id="open-button">&ndash;&gt;-->
        <!--&lt;!&ndash;<span></span>&ndash;&gt;-->
        <!--&lt;!&ndash;<span></span>&ndash;&gt;-->
        <!--&lt;!&ndash;<span></span>&ndash;&gt;-->
      <!--&lt;!&ndash;</button>&ndash;&gt;-->
      <!--&lt;!&ndash;/.for-sticky&ndash;&gt;-->
    <!--</div>-->
    <!--页头 END-->
      <div class="content">
        <section id="welcome">
                <div class="hero-content">
                  <h1>Hello</h1>
                  <br>
                  <vue-typed-js class="typed" :strings="['欢迎来到我的个人网站 ^1000', '目前暂时只有这个页面，将就看看呗╮(╯▽╰)╭ ^1000']" :typeSpeed="100" :loop="true" :backSpeed="70">
                    <span class="typing"></span>
                  </vue-typed-js>
                </div>
        </section>
        <div></div>
      </div>
  </div>
</template>

<script>
  import {VueTypedJs} from "vue-typed-js";
  // import "common/js/lib/promise.min"
  // import "common/js/lib/Tone.min"
  // import "common/js/lib/tombola.js"
  // import "common/js/lib/perlin-simplex"
  // import "common/js/lib/tune.js"
  // import "common/js/UTILS.js"
  // import "common/js/MAIN.js"
  // import "common/js/METRICS.js"
  // import "common/js/AUDIO.js"
  // import "common/js/INTERACTION.js"
  // import "common/js/VISUAL.js"
  // import "common/js/SPORES.js"
  // import "common/js/ORGANISM1.js"
  // import "common/js/ORGANISM2.js"


  export default {
    data() {
      return {
        bLoad: true,
        d1: "asdas"
      }
    },
    mounted() {
      // 不用 => 解绑当前this会使改变的bLoad无法被vue实例获取
      var setInt = setInterval(() => {
        this.bLoad = false;
        clearInterval(setInt)
      }, 500)
    },
    components: {
      VueTypedJs
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/reset'
  .header
    width: 100%
    z-index: 9999
    .for-sticky
      position: fixed
      bottom: 0
      width: 100%
      height: 50px
      opacity: 0.6
      z-index: 1
      top: 0
      left: 0
      border-bottom: 1px solid #f1f1f1
      display: block
      padding: 0 15px 5px 15px
      background: #ffffff
      transition: all 0.3s
      .logo
        a
          color: #2f2f2f
          text-decoration: none
          .logo-nav
            padding: 6px 0 10px 0
            transition: all 0.3s
            width: 45px
            display: block
            max-width: 100%
            vertical-align: middle
            border: 0

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
    background-image: url('loader.gif')
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
    h1
      line-height :40px
      letter-spacing: 0.6px
      font-size:36px
      margin-bottom:10px
      font-weight:bold
    .typed
      display block
      font-weight: 400
      font-size: 16px
      line-height: 26px
      letter-spacing: 1.5px
      margin: 0 auto
      opacity: 0.6
    .hero-content
      position: absolute
      text-align: center
      min-width: 300px
      left: 50%
      top: 50%
      padding: 65px
      background: rgba(255, 255, 255, 0.8)
      outline: 4px double #FFFFFF
      outline-offset: 8px
      -webkit-transform: translateX(-50%) translateY(-50%)
      transform: translateX(-50%) translateY(-50%)
</style>
