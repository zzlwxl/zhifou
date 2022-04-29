<template>
  <div class="ArticleByUserList">
    <template v-for="item in ArticleAllList">
      <ArticleCard :articleData="item"></ArticleCard>
    </template>
    <div class="active">
      <el-button :loading="loading" v-if="!isNullArticle" @click="getArticleAllList" color="#388e3c" style="color: white">加载更多</el-button>
      <el-button v-else :disabled="isNullArticle" color="#388e3c" style="color: white">已经到底</el-button>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted ,nextTick} from 'vue'
import ArticleCard from '../../../views/article/ArticleCard.vue'
import {useRoute} from 'vue-router'

import { getArticleByStars } from '../../../service/article/index'

import { IDataType } from '../../../service/article/type'

import message from '../../../utils/message'

export default defineComponent({
  name: 'ArticleByUserList',
  components: {
    ArticleCard,
  },
  props: ['type'],
  setup(props, content) {
    const route=useRoute()
    let type=props.type
    let ArticleAllList = ref<any>([])
    let current = 1
    let size = 10
    let isNullArticle = ref(false)
    let loading = ref(false)
    const userId = route.params.userid+''
    function init() {
      loading.value = false
      isNullArticle.value = false
      ArticleAllList.value.length = 0
      current = 1
      size = 10
    }
    async function getArticleAllList() {
      loading.value = true
      let articleData!: IDataType
      switch(type){
        case 'byStar':
          articleData = await getArticleByStars({ current, size, userId })
        case 'byHistory':
          articleData = await getArticleByStars({ current, size, userId })
        case 'byAuthor':
          articleData = await getArticleByStars({ current, size, userId })
      }
      if (articleData.success) {
        message.success('获取文章成功')
        if (articleData.data.pages === articleData.data.current) {
          isNullArticle.value = true
        }
        ArticleAllList.value.push(...articleData.data.records)
        console.log(ArticleAllList.value)
        loading.value = false
        current++
      } else {
        message.warning(articleData.data)
      }
    }
    onMounted(() => {
      init()
      getArticleAllList()
    })
    return {
      ArticleAllList,
      isNullArticle,
      loading,
      getArticleAllList
    }
  },
})
</script>

<style scoped lang="less">
.active{
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 50px;
}
.ArticleByUserList{
  height: 1000px;
  overflow:scroll;
}
.ArticleByUserList::-webkit-scrollbar {
  width: 0;
}
</style>
