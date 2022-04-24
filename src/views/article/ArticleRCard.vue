<template>
  <div class="ArticleLRCard">
    <LRCard>
      <template #title> 高阅读量 </template>
      <template #content> 
        <ArticleTop5List v-for="item in articleTopByViews" :key="item.articleId" :data="item" type="articleTopByViewsType"></ArticleTop5List>
       </template>
    </LRCard>
    <LRCard>
      <template #title> 高点赞量 </template>
      <template #content> 
        <ArticleTop5List v-for="item in articleTopByStars" :key="item.articleId" :data="item" type="articleTopByStarsType"></ArticleTop5List>
       </template>
    </LRCard>
    <LRCard>
      <template #title> 高互动量 </template>
      <template #content> 
        <ArticleTop5List v-for="item in articleTopByComments" :key="item.articleId" :data="item" type="articleTopByCommentsType"></ArticleTop5List>
       </template>
    </LRCard>
  </div>
</template>
<script lang="ts">
import { defineComponent ,computed} from 'vue'
import LRCard from '../../components/LRCard/LRCard.vue'
import ArticleTop5List from './ArticleTop5List.vue'

import { useStore } from '../../store'

export default defineComponent({
  name: 'ArticleLRCard',
  components: {
    LRCard,
    ArticleTop5List
  },
  setup(props, content) {
    const store = useStore()
    const articleTopByViews= computed(()=>{
      return store.state.articleBy.articleTopByViews
    })
    const articleTopByStars= computed(()=>{
      return store.state.articleBy.articleTopByStars
    })
    const articleTopByComments= computed(()=>{
      return store.state.articleBy.articleTopByComments
    })
    const initLRArticleList = () => {
      if (!store.state.articleBy.articleTopByViews.length) {
        store.dispatch('articleBy/getArticleByList', { limit: 5, orderBy: 'articleViews' })
        store.dispatch('articleBy/getArticleByList', { limit: 5, orderBy: 'articleComments' })
        store.dispatch('articleBy/getArticleByList', { limit: 5, orderBy: 'articleStar' })
      }
    }
    initLRArticleList()

    return{
      articleTopByViews,
      articleTopByStars,
      articleTopByComments
    }
  },
})
</script>

<style scoped lang="less"></style>
