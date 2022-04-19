<template>
  <div class='NotFound'>
    <h1>您访问的路径有错</h1>
    <el-button @click="$router.push('/')">返回首页</el-button>
  </div>
</template>
<script lang='ts'>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'NotFound',
  setup(props,content){
    
  }
})
</script>

<style scoped lang='less'>
.NotFound{
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>