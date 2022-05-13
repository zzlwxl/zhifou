<template>
  <div class="ArticleInfo" ref="articleInfoRef">
    <div class="mainBox">
      <aside class="left">
        <ArticleLListCard></ArticleLListCard>
      </aside>
      <main>
        <el-scrollbar @scroll="scrollFun" ref="scrollbarRef" :max-height="screenHeight" class="main-box">
          <div class="contentBox">
            <div class="header">
              <ArticleHeader :article="articleData"></ArticleHeader>
            </div>
            <div class="article_box">
              <div class="info-box"><div v-html="hTHNData.success ? hTHNData.data.domStr : articleData.articleContent" id="info-html-box"></div></div>
            </div>
            <el-backtop :right="10" :bottom="48" />
            <div class="commentBox" id="comment">
              <CommentsCard :articleId="articleData.articleId"></CommentsCard>
            </div>
          </div>
          <!-- <el-backtop @click="一天init" :right="10" :bottom="5" /> -->
        </el-scrollbar>
      </main>
      <aside class="right">
        <ArticleInfoRCard :cataData="hTHNData" :authorData="articleData.author" @clickCataEmit="clickCataFun"></ArticleInfoRCard>
      </aside>
    </div>
    
    <FooterNav>
      <template #one>
        <el-button class="btn"><StarItem style="width:100%;height:100%" :article="articleData"></StarItem></el-button>
      </template>
      <template #two>
        <el-button v-if="isShowBackByComment" class="btn" @click="backByComment"
          ><el-icon class="icon"> <Switch /> </el-icon
        ></el-button>
        <el-button v-else @click.stop="goCommentByArticle" class="btn"><CommentItem @click.stop="goCommentByArticle" :article="articleData"></CommentItem></el-button>
      </template>
      <template #three>
        <el-button class="btn" @click="drawer = true">
          <el-icon class="icon"> <Operation /> </el-icon
        ></el-button>
      </template>
    </FooterNav>
    <el-drawer v-model="drawer" size="50%" direction="btt" :show-close="false">
      <template #title>
        <span style="font-size: 14px">目录</span>
      </template>
      <ArticleCataItem :cataData="hTHNData" @cataItemEmit="clickCataFun"></ArticleCataItem>
    </el-drawer>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watchEffect, nextTick, onMounted, onUpdated, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { getArticleInfo } from '../../service/article/index'

import Prism from 'prismjs'

import message from '../../utils/message'
import { htmlToHNode } from '../../utils/htmlToHNode'
import type { IResponse } from '../../utils/htmlToHNode'
import type { ElScrollbar } from 'element-plus'
import {debounce} from '../../utils/debounce'

import ArticleLListCard from './ArticleLListCard.vue'
import ArticleInfoRCard from '../article/cnps/ArticleInfoRCard.vue'
import CommentsCard from '../comment/CommentsCard.vue'
import ArticleHeader from './ArticleHeader.vue'
import FooterNav from '../../components/Footer/FooterNav.vue'
import StarItem from './cnps/StarItem.vue'
import CommentItem from './cnps/CommentItem.vue'
import ArticleCataItem from './cnps/ArticleCataItem.vue'

import { Operation, Switch } from '@element-plus/icons-vue'

export default defineComponent({
  name: 'ArticleInfo',
  components: {
    ArticleLListCard,
    CommentsCard,
    ArticleHeader,
    ArticleInfoRCard,
    FooterNav,
    StarItem,
    CommentItem,
    ArticleCataItem,
    Operation,
    Switch,
  },
  setup(props, content) {
    const router = useRouter()
    const route = useRoute()
    const scrollbarRef = ref<InstanceType<typeof ElScrollbar>>()
    const articleInfoRef=ref<HTMLDivElement>()
    let drawer = ref(false)
    let screenData: number = 0
    let screenHeight = ref(0)
    let isShowBackByComment = ref(false) //是否展示返回正文按钮
    let isFirst = true //首次根据保存的hash值滚动
    let articleData = ref({
      articleId: '',
    })
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
        articleData.value = data.data
        hTHNData.value = htmlToHNode(data.data.articleContent)
      } else {
        message.warning(data.data)
      }
    }
    articleInfo(route.params.id)
    onUpdated(() => {
      Prism.highlightAll()
       if (route.hash && isFirst && hTHNData.value.data.domStr!=='') {
          const hashStr = route.hash
          go(hashStr.substr(1, hashStr.length))
        }
    })
    //跳转锚点
    const go = (id: string) => {
      //设置hash值,便于保留位置
      nextTick(() => {
        let element = document.getElementById(id) as HTMLElement
        if(element){
          element.scrollIntoView({ behavior: 'smooth', block: 'center' })
          isFirst = false
          router.push(`/articleinfo/info/${articleData.value!.articleId}#${id}`)
        }
      })
    }
    //接收到目录组件点击的目录项
    const clickCataFun = (data: string) => {
      isFirst = false
      screenData = 0
      isShowBackByComment.value = false
      go(data)
    }
    const init = () => {
      isFirst = true
      screenData = 0
      isShowBackByComment.value = false
      router.push(`/articleinfo/info/${articleData.value!.articleId}`)
    }
    const scrollFun = (data: any) => {
      if (!isShowBackByComment.value) {
        screenData = data.scrollTop
      }
    }
    //获取屏幕高度
    const getScreenHight = () => {
      screenHeight.value = window.innerHeight
    }
    // const getScreenHightCheck=debounce(getScreenHight,1000,false)
    onMounted(() => {
      getScreenHight()
    })
    //从评论里返回到正文
    const backByComment = () => {
      isShowBackByComment.value = false
      scrollbarRef.value!.setScrollTop(Number(screenData))
    }
    //从正文去到评论
    const goCommentByArticle = () => {
      isFirst = false
      isShowBackByComment.value = true
      go('comment')
    }
    return {
      articleData,
      hTHNData,
      clickCataFun,
      drawer,
      init,
      backByComment,
      isShowBackByComment,
      goCommentByArticle,
      scrollFun,
      screenHeight,
      scrollbarRef,
      articleInfoRef
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
.btn {
  width: 30%;
  margin-bottom: 5px;
}
@media screen and (min-width: 800px) {
  .active {
    bottom: 4px;
  }
}
.main-box {
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
    width: 50%;
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
@media screen and (min-width: 1400px) {
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
