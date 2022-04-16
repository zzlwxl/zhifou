<template>
  <div class="CommentReply">
    <div class="commentBox" :class="deep >= 1 ? 'replyItem' : 'commentItem'">
      <span>{{ nickNameFun(comment.author.nickName) }}</span>
      <span v-if="reply.length">
      
      </span>
      <sapn v-else>
        <button @click="addReply(comment.id)">回复</button>
      </sapn>
      <CommentReply v-for="item in reply" :key="item.commentId" :reply="item.children" :comment="item" :deep="deep + 1"></CommentReply>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'CommentReply',
  props: ['reply', 'comment', 'deep'],
  setup(props, content) {
    const addReply = (id: string) => {}
    const nickNameFun = (nickName: string) => {
      return nickName ? nickName : '路人甲'
    }
    return {
      addReply,
      nickNameFun,
    }
  },
})
</script>

<style scoped lang="less">
.commentItem {
  margin: 10px 0;
}
.replyItem {
  margin: 5px 0 5px 20px;
  background-color: red;
}
</style>
