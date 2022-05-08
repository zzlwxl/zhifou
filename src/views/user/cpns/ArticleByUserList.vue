<template>
  <div class="ArticleByUserList">
    <template v-for="item in ArticleAllList">
      <ArticleCard :articleData="item.article">
        <template #histoyt>
          <div class="historyBox">
           <el-icon>
            <Calendar />
          </el-icon>
          {{formatUtcString(item.visitTime)}}
          </div>
        </template>
      </ArticleCard>
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

import { Calendar } from '@element-plus/icons-vue'

import { getArticleByStars ,getHistory,getArticleByUser} from '../../../service/article/index'

import { IDataType } from '../../../service/article/type'

import message from '../../../utils/message'
import { formatUtcString } from '../../../utils/date'

export default defineComponent({
  name: 'ArticleByUserList',
  components: {
    ArticleCard,
    Calendar
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
    let isByAuthor=false
    const userId = route.params.userid+''
    function init() {
      loading.value = false
      isNullArticle.value = false
      ArticleAllList.value.length = 0
      current = 1
      size = 10
      isByAuthor=false
    }
    async function getArticleAllList() {
      loading.value = true
      let articleData!: IDataType
      switch(type){
        case 'byStar':
          articleData = await getArticleByStars({ current, size, userId })
          break
        case 'byHistory':
          articleData = await getHistory({ current, size, userId ,orderBy:'visitTime.desc'})
          break
        case 'byAuthor':
          articleData = await getArticleByUser({ current, size, userId })
          isByAuthor=true
          break
        default:
          isNullArticle.value=true
          return
      }
      if (articleData.success) {
        message.success('获取文章成功')
        if (articleData.data.pages === articleData.data.current || articleData.data.pages===0) {
          isNullArticle.value = true
          loading.value=false
        }
        if(isByAuthor){
          Array.from(articleData.data.records).forEach(item=>{
            ArticleAllList.value.push({'article':item})
          })
        }else{
          ArticleAllList.value.push(...articleData.data.records)
        }
        console.log('文章列表',ArticleAllList.value)
        loading.value = false
        current++
      } else {
        message.warning(articleData.data)
        loading.value=false
        isNullArticle.value=true
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
      getArticleAllList,
      formatUtcString
    }
  },
})
</script>

<style scoped lang="less">
@col1: #2196f3;
@col2: #388e3c;
@fontCol: #777;
.active{
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 50px;
}
.ArticleByUserList{
  overflow:scroll;
}
.ArticleByUserList::-webkit-scrollbar {
  width: 0;
}
.historyBox{
  font-size: 1rem;
  color: @fontCol;
  display: flex;
  align-items: center;
}
</style>
