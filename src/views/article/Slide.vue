<template>
  <div class="Slide">
    <el-carousel :interval="2000" type="card" height="200px">
      <el-carousel-item @click="$router.push(`/articleinfo/info/${item.articleId}`)" v-for="(item, index) in articleTopAll" :key="index">
        <div class="imgBox">
          <img :src="item.coverImg" alt="没有图片" />
          <span>{{ item.articleTitle }}</span>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { getArticleTop } from '../../service/article/index'
import message  from '../../utils/message'

export default defineComponent({
  name: 'Slide',
  setup(props, content) {
    let articleTopAll = ref<any>([])
    async function getArticle() {
      const artiicle = await getArticleTop({ orderBy: 'articleViews.desc' })
      if (artiicle.success) {
        articleTopAll.value.push(...artiicle.data)
      } else {
        message.error(artiicle.data)
      }
    }
    getArticle()
    return {
      articleTopAll,
    }
  },
})
</script>

<style scoped lang="less">
.imgBox {

  span {
    overflow: hidden;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    display: -webkit-box;
  }
}
.el-carousel__item span {
  width: 100%;
  background-color: rgba(239, 0, 0, 0.1) !important;
  color: rgb(255, 255, 255);
  position: absolute;
  font-size: 14px;
  top: 90%;
  padding-left: 2%;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
