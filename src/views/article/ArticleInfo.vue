<template>
  <div class="ArticleInfo">
    <div class="mainBox">
      <aside class="left">
        <ArticleLListCard></ArticleLListCard>
      </aside>
      <main>
        <div class="slide">
          <div class="contentBox">
            <div class="header">
              <ArticleHeader :article="articleData"></ArticleHeader>
            </div>
            <div class="article_box">
              <div class="info-box"><div v-html="hTHNData.success ? hTHNData.data.domStr : articleData.articleContent" id="info-html-box"></div></div>
            </div>
            <el-backtop :right="10" :bottom="48" />
            <div class="commentBox">
              <CommentsCard :articleId="articleData.articleId"></CommentsCard>
            </div>
          </div>
        </div>
      </main>
      <aside class="right">
        <ArticleInfoRCard :cataData="hTHNData" @clickCataEmit="clickCataFun"></ArticleInfoRCard>
      </aside>
    </div>
    <el-drawer v-model="drawer" size="50%" direction="btt" :show-close="false" :before-close="handleClose">
      <ArticleInfoRCard :cataData="hTHNData" @clickCataEmit="clickCataFun"></ArticleInfoRCard>
    </el-drawer>
    <div class="cataPhoneBtn">
      <el-button type="primary" @click="drawer = true" round>目录</el-button>
    </div>
    <el-backtop :right="10" :bottom="48" />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watchEffect, nextTick, onMounted ,onUpdated} from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { getArticleInfo } from '../../service/article/index'

import Prism from 'prismjs'

import message from '../../utils/message'
import { htmlToHNode } from '../../utils/htmlToHNode'
import type { IResponse } from '../../utils/htmlToHNode'

import ArticleLListCard from './ArticleLListCard.vue'
import ArticleInfoRCard from '../article/cnps/ArticleInfoRCard.vue'
import CommentsCard from '../comment/CommentsCard.vue'
import ArticleHeader from './ArticleHeader.vue'

export default defineComponent({
  name: 'ArticleInfo',
  components: {
    ArticleLListCard,
    CommentsCard,
    ArticleHeader,
    ArticleInfoRCard,
  },
  setup(props, content) {
    const router = useRouter()
    const route = useRoute()
    let drawer = ref(false)
    let articleData = ref({})
    let hTHNData = ref<IResponse>({
      data: {
        cataList: [],
        domStr: '',
      },
      msg: '',
      success: false,
    })
    async function articleInfo(id: any) {
      const data = await getArticleInfo(id)
      if (data.success) {
        nextTick(() => {
          articleData.value = data.data
          hTHNData.value = htmlToHNode(data.data.articleContent)
        })
      } else {
        message.warning(data.data)
      }
    }
    articleInfo(route.params.id)
    onUpdated(()=>{
      Prism.highlightAll()
    })
    //跳转锚点
    const go = (id: string) => {
      //设置hash值,便于保留位置
      // router.push('/test#'+id)
      var element = document.getElementById(id) as HTMLElement
      element.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
    //接收到目录组件点击的目录项
    const clickCataFun = (data: string) => {
      go(data)
    }
    return {
      articleData,
      hTHNData,
      clickCataFun,
      drawer,
    }
  },
})
</script>

<style scoped lang="less">
@col2: #388e3c;
@col1: #2196f3;

.mainBox {
  display: flex;
  justify-content: center;
  // margin-top: 2vw;
}
.cataPhoneBtn {
  display: block;
  margin-left: 4px;
  position: fixed;
  bottom: 88px;
  left: -20px;
  transition: all 1s;
  z-index: 1999;
  &:hover {
    left: 0;
  }
}
main {
  width: 100%;
  display: flex;
  justify-content: center;
  // margin: 0 auto;
  .active {
    height: 80px;
    display: flex;
    justify-content: center;
    margin-top: 10px;
  }
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
.left {
  display: none;
}
.right {
  display: none;
}
@media screen and (min-width: 1000px) {
  .cataPhoneBtn {
    display: none;
  }
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
