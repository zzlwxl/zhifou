<template>
  <div class='Footer'>
    <div class="footerBox">
        底部
    </div>
  </div>
</template>
<script lang='ts'>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Footer',
  setup(props,content){
    
  }
})
</script>

<style scoped lang='less'>
.footerBox{
    width: 100%;
    background-color: red;
}
</style>