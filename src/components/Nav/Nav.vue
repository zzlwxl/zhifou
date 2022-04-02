<template>
  <div class='Nav'>
    <div class="left">
        <NavInfo></NavInfo>
    </div>
    <div class="right">
        <NavLogin></NavLogin>
    </div>
  </div>
</template>
<script lang='ts'>
import { defineComponent } from 'vue'
import NavInfo from './NavInfo.vue'
import NavLogin from './NavLogin.vue'

export default defineComponent({
  name: 'Nav',
  components:{
      NavInfo,
      NavLogin
  },
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