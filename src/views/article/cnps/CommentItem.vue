<template>
  <div class="CommentItem" @click.stop="$router.push(`/articleinfo/info/${article.articleId}#comment`)">
    <el-icon class="icon">
      <ChatDotRound />
    </el-icon>
    {{ article ? article.articleComments : 0 }}
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { ChatDotRound } from '@element-plus/icons-vue'

export default defineComponent({
  name: 'CommentItem',
  props: ['article'],
  components: {
    ChatDotRound,
  },
  setup(props, content) {},
})
</script>

<style scoped lang="less">
.CommentItem {
  display: flex;
}
</style>
