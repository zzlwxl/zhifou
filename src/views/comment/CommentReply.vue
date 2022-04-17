<template>
  <div class="CommentReply">
    <div class="commentBox" :class="deep === 1 ? 'replyItem' : 'commentItem'">
      <ReplyOfComment @isReplyOkEmit="isReplyOk" :comment="comment" :present="present2" :isReply="isReply"></ReplyOfComment>
      <template v-if="isShowVirComment">
        <div v-for="item in virReplyCommentList" :key="item.commentId"   class="replyItem">
          <ReplyOfComment :present="present" @isReplyOkEmit="isReplyOk" :comment="item" :isReply="true"></ReplyOfComment>
        </div>
      </template>
      <CommentReply v-for="item in reply" :key="item.commentId" :reply="item.children" :comment="item" :isReply="true" :present2="!item.children.length ? present2 : item.author" :deep="deep + 1"></CommentReply>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed, ref } from 'vue'

import { formatUtcString } from '../../utils/date'

import ReplyOfComment from './ReplyOfComment.vue'

export default defineComponent({
  name: 'CommentReply',
  props: ['reply', 'comment', 'deep', 'isReply', 'present2'],
  components: {
    ReplyOfComment,
  },
  setup(props, content) {
    let present = ref({
      nickName: '',
    })
    //用户回复成功,渲染形成的虚拟评论
    let isShowVirComment = ref(false)
    let virReplyCommentList=ref<any>([])
    let replyInputContent = ref('')
    let isReplyInput = ref(false)
    const isReplyOk = (value: any) => {
      isShowVirComment.value = true
      present.value.nickName = value.byReplyer
      virReplyCommentList.value.push({
        commentContent:value.commentContent,
        createTime:value.createTime,
        commentId:value.user.commentId,
        author:{
          headImgUrl:value.user.headImgUrl
        }
      })
    }
    return {
      formatUtcString,
      isReplyInput,
      replyInputContent,
      isShowVirComment,
      isReplyOk,
      present,
      virReplyCommentList
    }
  },
})
</script>

<style scoped lang="less">
@col1: #2196f3;
@col2: #388e3c;

.commentBox {
  // background-color: rgb(255, 144, 144);
  .replyInput {
    margin: 6px;
  }
}
.commentItem {
  margin: 10px 0;
  // background-color: rgb(255, 213, 0);
}
.replyItem {
  margin: 5px 0 5px 20px;
  // background-color: rgb(21, 255, 0);
}
</style>
