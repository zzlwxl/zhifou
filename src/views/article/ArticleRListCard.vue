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
      <LRCard>
      <template #title>
        关于我们
      </template>
      <template #content>
        <a href="https://beian.miit.gov.cn/">{{bev}}</a>
      </template>
    </LRCard>
    <LRCard>
      <template #title>
        赞助我们
      </template>
      <template #content>
        <el-button @click="$router.push('/pay')" type="primary">赞助我们</el-button>
      </template>
    </LRCard>
  </div>
</template>
<script lang="ts">
import { defineComponent ,computed,onMounted,ref} from 'vue'
import LRCard from '../../components/LRCard/LRCard.vue'
import ArticleTop5List from './ArticleTop5List.vue'

import {useRoute} from 'vue-router'

import { useStore } from '../../store'

export default defineComponent({
  name: 'ArticleLRCard',
  components: {
    LRCard,
    ArticleTop5List
  },
  setup(props, content) {
    const store = useStore()
    const route=useRoute()
    let bev=ref('')
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
    const init=()=>{
      let hrefList=String(location.hostname).split('.')
      if(hrefList[0]==='zhifou'){
        bev.value='豫ICP备19046328号-1'
      }else{
        bev.value='豫ICP备20010557号-2'
      }
    }
    onMounted(()=>{
      init()
    })
    return{
      articleTopByViews,
      articleTopByStars,
      articleTopByComments,
      bev
    }
  },
})
</script>

<style scoped lang="less">
.ArticleLRCard{
  position: fixed;
  margin-right: 10px;
  width: 340px;
}
</style>
