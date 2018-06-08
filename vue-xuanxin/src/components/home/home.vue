<template>
<div class="home">
	<div v-if="bLoad = false" class="preloader">
		<div class="status">
			<img src="~common/images/logo-big.png" alt="logo">
		</div>
	</div>
  <vue-typed-js :strings="['awesome', 'brilliant']" :loop="true" :backSpeed="50">
  <h2>We are a <span class="typing"></span> company!</h2>
</vue-typed-js>
</div>
</template>

<script>
import {VueTypedJs} from 'vue-typed-js'
export default {
	data(){
		return{
			bLoad:false,
			d1:'asdas'
		}
	},
	mounted (){
		this.bLoad = true;
	},
	components: {
		VueTypedJs
	}
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	.preloader
		position: fixed
		top:0
		left:0
		right:0
		bottom:0
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
</style>
