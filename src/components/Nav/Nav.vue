<template>
  <div class='Nav'>
    <div class="left">左</div>
    <div class="right">右</div>
  </div>
</template>
<script lang='ts'>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Nav',
  setup(props,content){
    
  }
})
</script>

<style scoped lang='less'>
.Nav{
    display: flex;
    .left{
        width: 90%;
        background-color: red;
    }
    .right{
        flex: 1;
        background-color: blue;
    }
}
</style>