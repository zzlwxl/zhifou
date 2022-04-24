<template>
  <div class='ArticleLCard'>
    <LRCard>
      <template #title>
        世界
      </template>
      <template #content>
        <Chat></Chat>
      </template>
    </LRCard>
  </div>
</template>
<script lang='ts'>
import { defineComponent } from 'vue'
import LRCard from '../../components/LRCard/LRCard.vue'
import Chat from '../chat/Chat.vue'

export default defineComponent({
  name: 'ArticleLCard',
  components:{
      LRCard,
      Chat
  },
  setup(props,content){
    
  }
})
</script>

<style scoped lang='less'>

</style>