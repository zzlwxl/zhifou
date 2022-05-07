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
    <LRCard>
      <template #title>
        受欢迎Top5
      </template>
      <template #content>
        <AuthorList type="welcomeTop" :isInsertActive="false"></AuthorList>
      </template>
    </LRCard>
  </div>
</template>
<script lang='ts'>
import { defineComponent } from 'vue'
import LRCard from '../../components/LRCard/LRCard.vue'
import Chat from '../chat/Chat.vue'
import AuthorList from '../user/cpns/AuthorList.vue'

export default defineComponent({
  name: 'ArticleLCard',
  components:{
      LRCard,
      Chat,
      AuthorList
  },
  setup(props,content){
    
  }
})
</script>

<style scoped lang='less'>
.ArticleLCard{
  position: fixed;
  width: 340px;
}
</style>