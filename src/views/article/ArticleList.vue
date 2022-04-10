<template>
  <div class='ArticleList'>
    <template v-for="(item) in ArticleAllList">
      <ArticleCard :articleData="item"></ArticleCard>
    </template>
    <div class="active">
      <el-button :disabled="isNullArticle" @click="getArticleAllList" color="#388e3c" style="color: white">加载更多</el-button>
    </div>

  </div>
</template>
<script lang='ts'>
import { defineComponent ,ref} from 'vue'
import ArticleCard from './ArticleCard.vue'
import {getArticleAll} from '@/service/article'

export default defineComponent({
  name: 'ArticleList',
  components:{
      ArticleCard
  },
  setup(props,content){
    let current=1
    let size=10
    let ArticleAllList=ref<any>([])
    let isNullArticle=ref(false)
    let loading=ref(true)
    async function getArticleAllList(){
      // loading.value=false
      const articleData = await getArticleAll({current,size})
      if(articleData.success){
        if(articleData.data.pages===articleData.data.current){
          isNullArticle.value=true
          // loading.value=true
        }
        ArticleAllList.value.push(...articleData.data.records)
        console.log(ArticleAllList.value.length)
        // loading.value=true
        current++
      }

    }
    getArticleAllList()
    return{
      ArticleAllList,
      getArticleAllList,
      isNullArticle,
      loading
    }
  }
})
</script>

<style scoped lang='less'>
@col2: #388e3c;
.ArticleList{
  .active{
    width: 100%;
    display: flex;
    margin-top: 10px;
    justify-content: center;
  }
}
</style>