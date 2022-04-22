<template>
  <div class='ArticleInfo'>
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

export default defineComponent({
  name: 'ArticleInfo',
  components:{
    CommentsCard
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
.article-box{
  .active_box{
    margin: 6px;
    width: 100%;
    height: 5%;
  }
  .info_box{
    width: 100%;
    height: 95%;
  }
}
.commentBox{
  width: 100%;
}
</style>