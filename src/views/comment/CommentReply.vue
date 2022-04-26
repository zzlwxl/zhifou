<template>
  <div class="CommentReply">
    <div class="commentBox" :class="deep === 1 ? 'replyItem' : 'commentItem'">
      <ReplyOfComment @destroyCommentEmit="destroyComment" v-if="!isDestroy" @isReplyOkEmit="isReplyOk" :comment="comment" :present="present2" :isReply="isReply"></ReplyOfComment>
      <template v-if="isShowVirComment">
        <template v-if="isDelVirCommentFlag>0">
          <div v-for="(item, index) in virReplyCommentList" :key="index" class="replyItem">
            <ReplyOfComment v-if="!delVirCommentMap.has(index)" :present="present" :virIndex="index" :isVirComment="true" @VirReplyDelEmit="VirReplyDel" :comment="item" :isReply="true"></ReplyOfComment>
          </div>
        </template>
      </template>
      <template v-if="!isDestroy">
        <CommentReply v-for="item in reply" :key="item.commentId" :reply="item.children" :comment="item" :isReply="true" :present2="!item.children.length ? present2 : item.author" :deep="deep + 1"></CommentReply>
      </template>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

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
    let isDestroy = ref(false)
    //用户回复成功,渲染形成的虚拟评论
    let isShowVirComment = ref(false)
    let virReplyCommentList = ref<any>([])
    let replyInputContent = ref('')

    //该变量用来告诉页面更新数据
    let isDelVirCommentFlag=ref(1)
    //已经删除的虚拟列表
    let delVirCommentMap=ref(new Map())

    let isReplyInput = ref(false)
    const isReplyOk = (value: any) => {
      isShowVirComment.value = true
      present.value.nickName = value.byReplyer
      virReplyCommentList.value.push({
        commentContent: value.commentContent,
        createTime: value.createTime,
        commentId: value.user.commentId,
        owner: true,
        author: {
          headImgUrl: value.user.author.headImgUrl,
          nickName:value.user.author.nickName,
          userId:value.user.author.userId
        },
      })
    }
    // 监听删除评论事件
    const destroyComment = (Destroy: boolean) => {
      isDestroy.value = Destroy
    }
    //监听虚拟评论删除事件
    const VirReplyDel = (value: any) => {
      console.log(value)
      delVirCommentMap.value.set(value,value)
      isDelVirCommentFlag.value++
    }
    return {
      formatUtcString,
      isReplyInput,
      replyInputContent,
      isShowVirComment,
      isReplyOk,
      present,
      virReplyCommentList,
      isDestroy,
      destroyComment,
      VirReplyDel,
      isDelVirCommentFlag,
      delVirCommentMap
    }
  },
})
</script>

<style scoped lang="less">
@col1: #2196f3;
@col2: #388e3c;

.commentBox {
  .replyInput {
    margin: 6px;
  }
}
.commentItem {
  margin: 10px 0;
}
.replyItem {
  margin: 5px 0 5px 20px;
}
</style>
