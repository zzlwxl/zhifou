<template>
  <div class='ArticleInfo'>
    <div class="null"></div>
    <div class="header">
      <ArticleHeader :article="articleData"></ArticleHeader>
    </div>
    <div class="article_box">
      <div class="info-box"><div v-html="articleData.articleContent"></div></div>
    </div>
    <div class="commentBox">
      <CommentsCard :articleId="articleData.articleId"></CommentsCard>
    </div>
  </div>
</template>
<script lang='ts'>
import { defineComponent,ref ,watchEffect,nextTick} from 'vue'
import {useRoute} from 'vue-router'

import {getArticleInfo} from '../../service/article/index'

import Prism from 'prismjs'


import message from '../../utils/message'

import CommentsCard from '../comment/CommentsCard.vue'
import ArticleHeader from './ArticleHeader.vue'

export default defineComponent({
  name: 'ArticleInfo',
  components:{
    CommentsCard,
    ArticleHeader
  },
  setup(props,content){
    const route = useRoute()
    const articleData=ref({})
    articleInfo(route.params.id)
    async function articleInfo(id:any) {
      const data = await getArticleInfo(id)
      if(data.success){
        articleData.value=data.data
        console.log(data)
        nextTick(() => {
          Prism.highlightAll()
        })
      }else{
        message.warning(data.data)
      }
    }
    return{
      articleData
    }
  }
})
</script>

<style scoped lang='less'>
.header{

}
.article_box{
  margin: 4px;
}
.commentBox{
  width: 100%;
}
</style>