<template>
  <div class="ArticleList">
    <Nav @chilkEmit="dataByEmit"></Nav>
    <div class="mainBox">
      <aside class="left">
        <ArticleLCard></ArticleLCard>
      </aside>
      <main>
        <div class="slide">
          <Slide></Slide>
          <div class="contentBox">
            <template v-for="item in ArticleAllList">
              <ArticleCard :articleData="item" :isEdit="isEdit"></ArticleCard>
            </template>
          </div>
          <div class="active">
            <el-button :loading="loading" v-if="!isNullArticle" @click="getArticleAllList" color="#388e3c" style="color: white">加载更多</el-button>
            <el-button v-else :disabled="isNullArticle" color="#388e3c" style="color: white">已经到底</el-button>
          </div>
        </div>
      </main>
      <aside class="right">
        <ArticleRCard></ArticleRCard>
      </aside>
    </div>
    <el-backtop :right="10" :bottom="48" />
    <footer>
      <FooterNav></FooterNav>
    </footer>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watchEffect } from 'vue'

import ArticleCard from './ArticleCard.vue'
import FooterNav from '../../components/Footer/FooterNav.vue'
import Nav from '../../components/Nav/Nav.vue'
import Slide from '../article/Slide.vue'
import ArticleRCard from './ArticleRCard.vue'
import ArticleLCard from './ArticleLCard.vue'


import { useRoute, useRouter } from 'vue-router'

import { getArticleAll, getArticleByUser, getArticleByCate, getArticleBySearch } from '@/service/article'

import { IDataType } from '../../service/article/type'

import message from '../../utils/message'

export default defineComponent({
  name: 'ArticleList',
  components: {
    ArticleCard,
    Slide,
    Nav,
    FooterNav,
    ArticleRCard,
    ArticleLCard,
  },
  setup(props, content) {
    const route = useRoute()
    const router = useRouter()
    let current = 1
    let size = 10
    let ArticleAllList = ref<any>([])
    let isNullArticle = ref(false)
    let loading = ref(false)
    let getType = 'default'
    let isEdit = ref(false)
    let getID = '' //请求数据查询参数

    watchEffect(() => {
      switch (route.params.type) {
        case undefined:
          console.log('not found')
          break
        case 'default':
          getType = 'default'
          init()
          getArticleAllList()
          break
        case 'category':
          console.log('分类分类')
          getType = 'category'
          init()
          getArticleAllList()
          break
        case 'search':
          getType = 'search'
          if (!route.query.name) {
            break
          }
          getID = route.query.name + ''
          init()
          getArticleAllList()
          break
        case 'user':
          getType = 'user'
          init()
          getArticleAllList()
          break
      }
    })
    const dataByEmit = (value: any) => {
      console.log('dataEmit2',value)
      getID = value.data
      console.log('getID', getID)
    }
    //初始化
    function init() {
      loading.value = false
      isNullArticle.value = false
      ArticleAllList.value.length = 0
      current = 1
      size = 10
      isEdit.value = false
    }
    //获取默认的文章列表
    async function getArticleAllList() {
      loading.value = true
      let articleData!: IDataType
      switch (route.params.type) {
        case 'default':
          articleData = await getArticleAll({ current, size })
          break
        case 'user':
          articleData = await getArticleByUser({ current, size })
          isEdit.value = true
          break
        case 'category':
          if (!getID) {
            if (route.query.id && route.query.id.length > 0) {
              getID = route.query.id as string
            }
          }
          if (!getID) return
          articleData = await getArticleByCate({ current, size, categoryId: getID })
          break
        case 'search':
          articleData = await getArticleBySearch({ current, size, key: getID })
          break
      }
      if (articleData.success) {
        message.success('获取文章成功')
        if (articleData.data.pages === articleData.data.current) {
          isNullArticle.value = true
        }
        ArticleAllList.value.push(...articleData.data.records)
        loading.value = false
        current++
      } else {
        message.warning(articleData.data)
      }
    }
    return {
      ArticleAllList,
      getArticleAllList,
      isNullArticle,
      loading,
      dataByEmit,
      isEdit,
    }
  },
})
</script>

<style scoped lang="less">
@col2: #388e3c;
@col1: #2196f3;

.mainBox {
  margin-top: 2vw;
  display: flex;
  justify-content: center;
}
main {
  height: 1000px;
  display: flex;
  justify-content: center;
  // margin: 0 auto;
  .active {
    height: 80px;
    display: flex;
    justify-content: center;
    margin-top: 10px;
  }
  @media screen and (min-width: 800px) {
    .active {
      bottom: 4px;
    }
  }
  .slide {
    width: 90%;
    position: relative;
  }
}
.left {
  display: none;
}
.right {
  display: none;
}
@media screen and (min-width: 1000px) {
  main {
    justify-content: center;
    width: 60%;
  }
  .right {
    display: block;
    margin-right: 10px;
    margin-top: 2px;
    width: 340px;
  }
  .left {
    display: none;
  }
}
@media screen and (min-width: 1600px) {
  .left {
    height: 1000px;
    margin-left: 10px;
    margin-top: 2px;
    width: 340px;
    display: block;
  }
  .right {
    height: 1000px;
    width: 340px;
    display: block;
  }

}
</style>
