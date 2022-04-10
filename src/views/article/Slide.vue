<template>
  <div class='Slide'>
    <el-carousel :interval="4000" type="card" height="200px">
    <el-carousel-item v-for="(item,index) in articleTopAll" :key="index">
      <div class="imgBox">
      <img :src="item.coverImg" alt="没有图片">
      <span>{{ item.articleTitle }}</span>
      </div>
    </el-carousel-item>
  </el-carousel>
  </div>
</template>
<script lang='ts'>
import { defineComponent ,ref} from 'vue'
import {getArticleTop} from '../../service/article/index'

export default defineComponent({
  name: 'Slide',
  setup(props,content){
    let articleTopAll=ref<any>([])
    async function getArticle(){
      const artiicle = await getArticleTop()
      if(artiicle.success){
        articleTopAll.value.push(...artiicle.data)
      }
    }
    getArticle()
    return{
      articleTopAll
    }
  }
})
</script>

<style scoped lang='less'>
.el-carousel__item span{
  width: 100%;
  background-color: rgb(99, 99, 99,0.1);
  color: rgb(255, 255, 255);
  position: absolute;
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