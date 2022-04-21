<template>
  <div class='EditTest'>
      编辑
    {{data}}
  </div>
</template>
<script lang='ts'>
import { defineComponent ,ref} from 'vue'
    import '@wangeditor/editor/dist/css/style.css' // 引入 css

export default defineComponent({
  name: 'EditTest',
  props:['valueHtml'],
  setup(props,content){
      let data=ref(props.valueHtml)
    return{
        data
    }
  }
})
</script>

<style scoped lang='less'>
</style>