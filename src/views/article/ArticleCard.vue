<template>
  <div class="ArticleCard">
    <div class="ArticleCardBox" @click="clickArticleInfo(article.articleId)">
      <div class="top">
        <img class="img" :src="article.coverImg" alt="没有图片" />
        <div class="contentBox">
          <div class="top-cate-box">
            <div class="cate">{{ article.author.nickName }}</div>
            <div class="cate">原创</div>
            <div class="cate">
              <div></div>
              <span>{{ article.category.categoryName }}</span>
            </div>
          </div>
          <div class="title">
            <h1>{{ article.articleTitle }}</h1>
          </div>
          <div class="content">{{ article.contentView }}</div>
        </div>
      </div>
      <div class="activeBox">
        <div class="left">
          <ArticleActive :article="article"></ArticleActive>
        </div>
        <div class="right">
          <el-icon v-if="isEdit" :size="size" :color="color">
            <Edit />
          </el-icon>
          <div v-if="isEdit" @click.stop="editArticle">编辑</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'

import { getAddStar, unStar } from '../../service/article/index'

import { formatUtcString } from '../../utils/date'

import ArticleActive from './ArticleActive.vue'

import { Edit } from '@element-plus/icons-vue'

export default defineComponent({
  name: 'ArticleCard',
  props: {
    articleData: {
      type: Object,
    },
    isEdit: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    ArticleActive,
    Edit,
  },
  setup(props, content) {
    const router = useRouter()
    const article = props.articleData
    const isEdit = props.isEdit
    
    const clickArticleInfo = (id: string) => {
      router.push(`/articleinfo/info/${id}`)
    }
    const editArticle = () => {
      console.log(props.articleData)
      router.push({
        path: '/create',
        query: {
          articleId: props.articleData?.articleId,
        },
      })
    }
    return {
      article,
      clickArticleInfo,
      isEdit,
      formatUtcString,
      editArticle,
    }
  },
})
</script>

<style scoped lang="less">
@col1: #2196f3;
@col2: #388e3c;
@fontCol: #777;

.ArticleCardBox {
  background-color: #fff;
  padding: 0.2rem 0.4rem;
  height: 35vw;
  border-radius: 10px;
  margin-bottom: 0.4rem;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  .top {
    width: 100%;
    height: 80%;
    display: flex;
    align-items: center;
    img {
      border-radius: 10px;
      width: 30%;
      height: 85%;
    }
    .contentBox {
      width: 70%;
      height: 85%;
      display: flex;
      position: relative;
      flex-direction: column;
      margin-left: 1vw;
      .top-cate-box {
        display: flex;
        justify-content: end;
        margin-bottom: 0.2rem;
        .cate {
          position: relative;
          padding: 0.2rem;
          margin: 0.2rem;
          border-radius: 1px;
          font-size: 1rem;
          background-color: @col1;
          color: rgb(255, 255, 255);
          span {
            z-index: 999;
          }
        }
        .cate:nth-child(1) {
          background-color: @fontCol;
        }
        .cate:nth-child(3) {
          background-color: @col2;
          div {
            border-radius: 4px;
            position: absolute;
            top: 0;
            left: 0;
            width: 0px;
            height: 100%;
            background-color: @col1;
            transition: all 0.3s;
            z-index: 1;
          }
        }
      }
      .title {
        display: flex;
        align-items: center;
        h1 {
          color: @col2;
          font-size: 1.4rem;
          width: 100%;
          overflow: hidden;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          display: -webkit-box;
        }
      }
      .content {
        overflow: hidden;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        display: -webkit-box;
        font-size: 1.2rem;
        line-height: 5px;
        color: @fontCol;
        text-indent: 2em;
      }
      @media screen and (min-width: 320px) {
        .content {
          line-height: 16px;
        }
      }
      @media screen and (min-width: 540px) {
        .content {
          -webkit-line-clamp: 4;
          line-height: 16px;
        }
      }
      @media screen and (min-width: 600px) {
        .content {
          -webkit-line-clamp: 3;
          font-size: 1rem;
          line-height: 18px;
        }
      }
      @media screen and (min-width: 800px) {
        .content {
          -webkit-line-clamp: 1;
          font-size: 1.2rem;
        }
      }
      @media screen and (min-width: 900px) {
        .content {
          -webkit-line-clamp: 2;
          line-height: 18px;
        }
      }
      @media screen and (min-width: 1000px) {
        .content {
          -webkit-line-clamp: 3;
          line-height: 18px;
        }
      }
      @media screen and (min-width: 1200px) {
        .content {
          -webkit-line-clamp: 4;
          line-height: 18px;
        }
      }
    }
  }
  .activeBox {
    padding: 0 2px;
    width: 100%;
    display: flex;
    align-items: center;
    .left {
      width: 80%;
    }
    .right {
      width: 20%;
      display: flex;
      font-size: 1.2rem;
      color: @fontCol;
      &:hover {
        color: @col2;
      }
    }
  }
}
.ArticleCardBox:hover {
  box-shadow: darkgrey 10px 10px 30px 5px;
}
@media screen and (min-width: 800px) {
  .ArticleCardBox {
    height: 20vw;
  }
}
@media screen and (min-width: 1200px) {
  .ArticleCardBox {
    height: 20vw;
  }
}
</style>
