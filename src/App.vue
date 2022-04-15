<template>
  <div>
  <router-view></router-view>
  </div>
</template>
<script lang="ts">
import { defineComponent,ref } from 'vue';
import router from './router/index'

export default defineComponent({
  setup(){
    return{
    }
  }
});
</script>
<style lang="less">

</style>
