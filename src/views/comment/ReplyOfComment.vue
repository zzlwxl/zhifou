<template>
  <div class="ReplyOfComment">
    <div class="top">
      <div>
        <el-avatar :size="40" :src="comment.author.headImgUrl" />
      </div>
      <span v-if="!isReply">{{ nickNameFun(comment.author.nickName) }} :</span>
      <span v-else>{{ nickNameFun(comment.author.nickName) }} 回复 @{{ nickNameFun(present.nickName) }} :</span>
    </div>
    <div class="content">
      {{ comment.commentContent }}
    </div>
    <div class="active">
      <template v-if="!comment.owner">
        <div>{{ formatUtcString(comment.createTime) }}</div>
        <div class="commentBtn">点赞 {{ comment.commentStar }}</div>
        <div class="commentBtn" @click="replyFun(comment.commentId)">评论</div>
      </template>
      <template v-else>
        <div>编辑</div>
        <div>删除</div>
      </template>
    </div>
    <div v-if="isReplyInput" class="replyInput">
      <el-input v-model="replyInputContent" class="input-with-select">
        <template #prepend>
          <div>评论 @{{ nickNameFun(comment.author.nickName) }}</div>
        </template>
        <template #append>
          <el-button @click="submitReplyFun">提交</el-button>
        </template>
      </el-input>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStore } from '../../store/index'
import { useRoute, useRouter } from 'vue-router'

import { ElMessage } from 'element-plus'

import { formatUtcString } from '../../utils/date'

import { addComment } from '../../service/comment/index'

export default defineComponent({
  name: 'ReplyOfComment',
  props: ['comment', 'isReply', 'present'],
  emits: ['isReplyOkEmit'],
  setup(props, content) {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    let isReplyInput = ref(false)
    let parentCommentId = ''
    let replyInputContent = ref('')

    //是否已经登录
    const isLogin = () => {
      if (!store.state.user.userInfo) {
        router.push('/login')
      }
    }

    const replyFun = (parentCommentID: string) => {
      isLogin()
      isReplyInput.value = !isReplyInput.value
      parentCommentId = parentCommentID
    }
    const nickNameFun = (nickName: string) => {
      return nickName ? nickName : '路人甲'
    }
    //提交回复
    const submitReplyFun = () => {
      isLogin()
      if (replyInputContent.value) {
        submitComment()
      } else {
        return ElMessage.warning('请输入回复内容')
      }
    }
    async function submitComment() {
      const data = await addComment({
        articleId: route.params.id as string,
        commentContent: replyInputContent.value,
        parentCommentId: parentCommentId,
      })
      if (data.success) {
        ElMessage.success('回复成功')
        isReplyInput.value = false
        content.emit('isReplyOkEmit', { 
            replyer: store.state.user.userInfo, 
            byReplyer: nickNameFun(props.comment.author.nickName), 
            user:data.data,
            commentContent: replyInputContent.value })
        replyInputContent.value = ''
      } else {
        ElMessage.error(data.data)
      }
    }
    return {
      replyFun,
      nickNameFun,
      formatUtcString,
      replyInputContent,
      isReplyInput,
      submitReplyFun,
    }
  },
})
</script>

<style scoped lang="less">

.top {
  display: flex;
  align-items: center;
}
.commentBtn{
    cursor: pointer;
}
span {
  font-size: 14px;
  margin-left: 5px;
  // color: @colFirstComment;
}
.content {
  background-color: #fff;
  margin-left: 50px;
  font-size: 1rem;
  // color: @colFirstComment;
}
.active {
  display: flex;
  justify-content: end;
  margin-top: 2px;
//   background-color: rgb(114, 114, 255);
  div {
    margin: 0 8px;
    font-size: 12px;
    // color: @colOtherComment;
  }
}
</style>
