<template>
  <div class="ArticleActive">
    <div class="activeBox">
      <div class="active">
        <el-icon class="icon" :size="size" :color="color">
          <Stopwatch />
        </el-icon>
        {{ formatUtcString(article.createTime) }}
      </div>
      <div class="active">
        <el-icon class="icon" :size="size" :color="color">
          <View />
        </el-icon>

        {{ '浏览 ' + article.articleViews }}
      </div>
      <div class="active">
        <el-icon class="icon" :size="size" :color="color">
          <ChatDotRound />
        </el-icon>
        {{ '评论 ' + article.articleComments }}
      </div>
      <div v-if="(starNum === article.articleStar) == !article.liked" class="active" @click.stop="addStarFun(article.articleId)">
        <el-icon class="icon" :size="size" :color="(starNum === article.articleStar) == !article.liked ? color : '#C62828'">
          <Star />
        </el-icon>
        {{ `点赞 ${starNum}` }}
      </div>
      <div v-else class="active" style="color: #c62828" @click.stop="unStarFun(article.articleId)">
        <el-icon class="icon" :size="size" :color="(starNum === article.articleStar) == !article.liked ? color : '#C62828'">
          <Star />
        </el-icon>
        {{ `点赞 ${starNum}` }}
      </div>
      <div class="active">
        <slot name="author"> </slot>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watchEffect } from 'vue'

import { formatUtcString } from '../../utils/date'

import { getAddStar, unStar } from '../../service/article/index'

import message from '../../utils/message'

import { Edit, Stopwatch, View, ChatDotRound, Star } from '@element-plus/icons-vue'

export default defineComponent({
  name: 'ArticleActive',
  props: ['article'],
  components: {
    Edit,
    Stopwatch,
    View,
    ChatDotRound,
    Star,
  },
  setup(props, content) {
    let starNum = ref(0)
    watchEffect(() => {
      starNum.value = props.article?.articleStar
    })
    const addStarFun = (id: string) => {
      addStar(id)
    }
    async function addStar(id: string) {
      const data = await getAddStar({ articleId: id })
      if (data.success) {
        message.success('点赞成功')
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
        message.success('取消点赞成功')
        starNum.value--
      } else {
        message.warning(data.data)
      }
    }

    return {
      addStarFun,
      unStarFun,
      formatUtcString,
      starNum,
    }
  },
})
</script>

<style scoped lang="less">
@fontCol: #777;
@col1: #2196f3;
@col2: #388e3c;
.activeBox {
  padding: 0 2px;
  display: flex;
  justify-content: space-around;
  .icon {
  }
  .active {
    font-size: 1.2rem;
    display: flex;
    color: @fontCol;
  }
  .active:nth-child(4){
    cursor: pointer;
  }
}
</style>
