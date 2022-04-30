<template>
  <div class="appBox">
  <router-view></router-view>
  </div>
</template>
<script lang="ts">
import { defineComponent,ref } from 'vue';
import Footer from './components/Footer/Footer.vue'
import router from './router/index'

export default defineComponent({
  components:{
    Footer
  },
  setup(){
    return{
    }
  }
});
</script>
<style lang="less">

</style>
