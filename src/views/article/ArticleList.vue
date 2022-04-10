<template>
  <div class='ArticleList'>
    <ArticleCard></ArticleCard>
  </div>
</template>
<script lang='ts'>
import { defineComponent } from 'vue'
import ArticleCard from './ArticleCard.vue'

export default defineComponent({
  name: 'ArticleList',
  components:{
      ArticleCard
  },
  setup(props,content){
    
  }
})
</script>

<style scoped lang='less'>

</style>