<template>
  <div class='HelloWorld'>
    
  </div>
</template>
<script lang='ts'>
import { defineComponent } from 'vue'
import {test} from '../utils/test'

export default defineComponent({
  name: 'HelloWorld',
  setup(props,content){
    test()
  }
})
</script>

<style scoped lang='less'>

</style>