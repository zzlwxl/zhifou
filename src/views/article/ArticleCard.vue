<template>
  <div class="ArticleCard">
    <div class="ArticleCardBox" @click="clickArticleInfo(article.articleId)">
      <div class="top">
        <img class="img" :src="article.coverImg" alt="没有图片" />
        <div class="contentBox">
          <div class="title">
            <h1>{{ article.articleTitle }}</h1>
            <div class="cate">{{ article.category.categoryName }}</div>
          </div>
          <div class="content">{{ article.contentView }}</div>
        </div>
      </div>
      <div class="activeBox">
        <div class="time">{{ article.createTime }}</div>
        <div class="other-data">{{ article.author.nickName }}</div>
        <div class="active">{{ '浏览量' + article.articleViews }}</div>
        <div class="active">{{ '评论量' + article.articleViews }}</div>
        <div class="active">{{ '点赞量' + article.articleViews }}</div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'ArticleCard',
  props: {
    articleData: {
      type: Object,
    },
  },
  setup(props, content) {
    const router = useRouter()
    const article = props.articleData
    const clickArticleInfo = (id: string) => {
      router.push(`/articleinfo/info/${id}`)
    }
    return {
      article,
      clickArticleInfo,
    }
  },
})
</script>

<style scoped lang="less">
@col2: #388e3c;
.ArticleCardBox {
  padding: 5px 0;
  width: 100%;
  height: 25vw;
  background-color: #ffffff;
  border-radius: 10px;
  margin-bottom: 5px;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  .top {
    width: 100%;
    height: 80%;
    display: flex;
    align-items: center;
    img {
      width: 30%;
      height: 85%;
    }
    .contentBox {
      width: 70%;
      height: 85%;
      display: flex;
      flex-direction: column;
      margin-left: 1vw;
      .title {
        display: flex;
        align-items: center;
        h1 {
          color: rgb(27, 27, 27);
          font-size: 1rem;
        }
        .cate {
          font-size: 0.2rem;
          margin-left: 1vw;
        }
      }
      .content {
        overflow: hidden;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
        box-orient: vertical;
        display: -webkit-box;
        display: box;
        font-size: 0.5rem;
        color: rgb(29, 29, 29);
        margin-bottom: 2vw;
      }
    }
  }
  .activeBox {
    width: 100%;
    height: 20%;
    display: flex;
    align-items: center;
    .time {
      background-color: red;
      width: 30%;
      font-size: 0.1rem;
    }
    .other-data {
      width: 30%;
      font-size: 0.2rem;
    }
    .active {
      width: 50%;
      font-size: 0.2rem;
    }
  }
}
.ArticleCardBox:hover {
  box-shadow: darkgrey 10px 10px 30px 5px;
}
@media screen and (min-width: 800px) {
  .ArticleCardBox {
    height: 15vw;
    .img {
      width: 10vw;
    }
  }
}
</style>
