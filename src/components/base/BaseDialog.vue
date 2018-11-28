<template>
  <div v-if="isShow" class="dialog-wrap">


      <slot v-if="isShow"></slot>

  </div>
</template>

<script>
  export default {
    props: {
      isShow: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {}
    },
    methods: {
      closeMyself() {
        this.$emit('on-close')
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .dialog-wrap
    position: fixed;
    bottom: 110px;
    left: 20px;


</style>
