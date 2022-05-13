<template>
  <div class="StarItem">
    <div v-if="(starNum === article.articleStar) == !article.liked" class="active" @click.stop="addStarFun(article.articleId)">
      <el-icon class="icon" :color="(starNum === article.articleStar) == !article.liked ? color : '#C62828'">
        <Star />
      </el-icon>
      {{ `${starNum ? starNum : 0}` }}
    </div>
    <div v-else class="active" style="color: #c62828" @click.stop="unStarFun(article.articleId)">
      <el-icon class="icon" :color="(starNum === article.articleStar) == !article.liked ? color : '#C62828'">
        <Star />
      </el-icon>
      {{ `${starNum ? starNum : 0}` }}
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watchEffect } from 'vue'

import { getAddStar, unStar } from '../../../service/article/index'

import {Star } from '@element-plus/icons-vue'

import message from '../../../utils/message'

export default defineComponent({
  name: 'StarItem',
  props: ['article'],
  components: {
    Star,
  },
  setup(props, content) {
    let starNum = ref(0)
    const color = '#777'
    watchEffect(() => {
      starNum.value = props.article?.articleStar
    })
    const addStarFun = (id: string) => {
      addStar(id)
    }
    async function addStar(id: string) {
      const data = await getAddStar({ articleId: id })
      if (data.success) {
        starNum.value++
      } else {
        message.warning(data.data)
      }
    }
    const unStarFun = (id: string) => {
      deleteStar(id)
    }
    async function deleteStar(id: string) {
      const data = await unStar(id)
      if (data.success) {
        starNum.value--
      } else {
        message.warning(data.data)
      }
    }
    return {
      starNum,
      addStarFun,
      unStarFun,
      color
    }
  },
})
</script>

<style scoped lang="less">
.active{
    display: flex;
}
</style>
