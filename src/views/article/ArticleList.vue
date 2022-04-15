<template>
  <div class="ArticleList">
    <Nav @chilkEmit="dataByEmit"></Nav>
    <div class="mainBox">
      <aside class="left">左</aside>
      <main>
        <div class="slide">
          <Slide></Slide>
          <template v-for="item in ArticleAllList">
            <ArticleCard :articleData="item" :isEdit="isEdit"></ArticleCard>
          </template>
          <div class="active">
            <el-button :disabled="isNullArticle" @click="getArticleAllList" color="#388e3c" style="color: white">加载更多</el-button>
          </div>
        </div>
      </main>
      <aside class="right">右</aside>
    </div>
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
import { useRoute,useRouter } from 'vue-router'
import { getArticleAll, getArticleByUser,getArticleByCate ,getArticleBySearch} from '@/service/article'
import {IDataType} from '../../service/article/type'
import { ElMessage } from 'element-plus'

export default defineComponent({
  name: 'ArticleList',
  components: {
    ArticleCard,
    Slide,
    Nav,
    FooterNav
  },
  setup(props, content) {
    const route = useRoute()
    const router = useRoute()
    let current = 1
    let size = 10
    let ArticleAllList = ref<any>([])
    let isNullArticle = ref(false)
    let loading = ref(true)
    let getType = 'default'
    let isEdit=ref(false)
    let getID = '' //请求数据查询参数
    watchEffect(() => {
      console.log('路由route.params', route.params.type)
      console.log('路由route.query', route.query.name)
      console.log('路由route.query', route.query.id)
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
          getType = 'category'
          init()
          getArticleAllList()
          break
        case 'search':
          getType = 'search'
          if(!route.query.name){
            break
          }
          getID=route.query.name+''
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
      getID = value.data
      console.log('getID', getID)
    }
    //初始化
    function init() {
      loading.value = true
      isNullArticle.value = false
      ArticleAllList.value.length=0
      current = 1
      size = 10
      isEdit.value=false
    }
    //获取默认的文章列表
    async function getArticleAllList() {
      // loading.value=false
      let articleData!:IDataType
      switch (route.params.type) {
        case 'default':
          articleData = await getArticleAll({ current, size })
          break
        case 'user':
          articleData=await getArticleByUser({ current, size })
          isEdit.value=true
          break
        case 'category':
          if (!getID) return
          articleData=await getArticleByCate({ current, size ,categoryId:getID})
          break
        case 'search':
          articleData=await getArticleBySearch({ current, size ,key:getID})
          break
      }
      // const articleData = await getArticleAll({ current, size })
      if (articleData.success) {
        ElMessage.success('获取文章成功')
        if (articleData.data.pages === articleData.data.current) {
          isNullArticle.value = true
          // loading.value=true
        }
        ArticleAllList.value.push(...articleData.data.records)
        console.log(ArticleAllList.value.length)
        // loading.value=true
        current++
      }
    }

    return {
      ArticleAllList,
      getArticleAllList,
      isNullArticle,
      loading,
      dataByEmit,
      isEdit
    }
  },
})
</script>

<style scoped lang="less">
@col2: #388e3c;
.ArticleList {
  .active {
    width: 100%;
    display: flex;
    margin-top: 10px;
    justify-content: center;
  }
}
.mainBox {
  margin-top: 2vw;
  display: flex;
  justify-content: center;
}
main {
  height: 1000px;
  display: flex;
  justify-content: center;
  margin: 0 auto;
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
@media screen and (min-width: 800px) {
  .right {
    height: 1000px;
    background-color: rgb(145, 145, 255);
    display: block;
    width: 40%;
  }
  .left {
    display: none;
  }
}
@media screen and (min-width: 1600px) {
  .left {
    height: 1000px;
    background-color: rgb(150, 255, 150);
    width: 30%;
    display: block;
  }
  .right {
    height: 1000px;
    background-color: rgb(138, 138, 255);
    width: 30%;
    display: block;
  }
}
</style>
