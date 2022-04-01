<template>
  <div>
  <router-view></router-view>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import router from './router/index'

export default defineComponent({
  setup(){
    const btn =()=>{
      console.log('点击了')
      router.push('/about')
    }

    return{
      btn
    }
  }
});
</script>
<style lang="less">

</style>
