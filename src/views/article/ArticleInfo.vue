<template>
  <div class='ArticleInfo'>
    <div class="article_box">
      <div class="active_box">d</div>
      <pre class="info-box">{{articleData.articleContent}}</pre>
    </div>
  </div>
</template>
<script lang='ts'>
import { defineComponent,ref } from 'vue'
import {getArticleInfo} from '../../service/article/index'
import {useRoute} from 'vue-router'
import { ElMessage } from 'element-plus'


export default defineComponent({
  name: 'ArticleInfo',
  setup(props,content){
    const route = useRoute()
    const articleData=ref({})
    articleInfo(route.params.id)
    async function articleInfo(id:any) {
      const data = await getArticleInfo(id)
      if(data.success){
        articleData.value=data.data
        console.log(data)
      }else{
        ElMessage.warning(data.data)
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
  display: flex;
  .active_box{
    width: 100%;
    height: 5%;
    background-color: red;
  }
  .info_box{
    width: 100%;
    height: 95%;
    background-color: blue;
  }
}
</style>