<template>
  <div class="ArticleActive">
    <div class="activeBox">
      <div class="active">
        <el-icon class="icon">
          <Stopwatch />
        </el-icon>
        {{ formatUtcString(article.createTime) }}
      </div>
      <div class="active">
        <el-icon class="icon">
          <View />
        </el-icon>
        {{ article.articleViews }}
      </div>
      <slot name="comment">
        <sapn class="active">
          <CommentItem :article="article"></CommentItem>
        </sapn>
      </slot>
      <slot name="star">
        <span class="active">
          <StarItem :article="article"></StarItem>
        </span>
      </slot>
      <span class="active" @click.stop="goAuthor">
        <slot name="author"> </slot>
      </span>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'

import { formatUtcString } from '../../utils/date'

import { getAddStar, unStar } from '../../service/article/index'

import CommentItem from './cnps/CommentItem.vue'
import StarItem from './cnps/StarItem.vue'

import { Edit, Stopwatch, View, ChatDotRound, Star } from '@element-plus/icons-vue'

export default defineComponent({
  name: 'ArticleActive',
  props: ['article'],
  components: {
    Edit,
    Stopwatch,
    View,
    CommentItem,
    StarItem,
  },
  setup(props, content) {
    const router = useRouter()
    const goAuthor = () => {
      router.push({
        name: 'usermenu',
        path: '/usermenu',
        params: {
          userid: props.article.author.userId,
        },
      })
    }
    return {
      formatUtcString,
      goAuthor,
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
  .active:nth-child(n + 3) {
    cursor: pointer;
  }
}
</style>
