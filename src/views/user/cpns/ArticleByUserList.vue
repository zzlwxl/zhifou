<template>
  <div class='ArticleByUserList'>
    文章列表
  </div>
</template>
<script lang='ts'>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ArticleByUserList',
  props:['type','userId'],
  setup(props,content){
    console.log('type',props.type,props.userId)
  }
})
</script>

<style scoped lang='less'>

</style>