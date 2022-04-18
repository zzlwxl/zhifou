<template>
  <div class="ReplyOfComment">
    <div class="top">
      <div>
        <el-avatar :size="40" :src="comment.author.headImgUrl" />
      </div>
      <span v-if="!isReply">{{ nickNameFun(comment.author.nickName) }}:</span>
      <span v-else>{{ nickNameFun(comment.author.nickName) }} 回复 @{{ nickNameFun(present.nickName) }}:</span>
    </div>
    <div class="content">
      {{ comment.commentContent }}
    </div>
    <div class="active">
      <template v-if="!comment.owner">
        <div>{{ formatUtcString(comment.createTime) }}</div>
        <el-icon :size="size" :color="(starNum === comment.commentStar) === !comment.liked ? color : '#C62828'">
          <Star />
        </el-icon>
        <div class="commentBtn" v-if="(starNum === comment.commentStar) === !comment.liked" @click.stop="commentStarFun(comment.commentId, false)">{{ `点赞 ${starNum}` }}</div>
        <div class="commentBtn" v-else @click.stop="commentStarFun(comment.commentId, true)">{{ `点赞 ${starNum}` }}</div>
        <div class="commentBtn" @click.stop="replyFun(comment.commentId)">评论</div>
      </template>
      <template v-else>
        <div v-if="!isVirComment" class="commentBtn" @click="delCommentFun(comment.commentId)">删除</div>
        <div v-else class="commentBtn" @click="delVirCommentFun(comment.commentId)">删除</div>
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

import { getCommentStar,getDelComment } from '../../service/comment/index'

import { Comment, Star } from '@element-plus/icons-vue'

export default defineComponent({
  name: 'ReplyOfComment',
  props: ['comment', 'isReply', 'present','isVirComment','virIndex'],
  emits: ['isReplyOkEmit','destroyCommentEmit','VirReplyDelEmit'],
  components: {
    Comment,
    Star,
  },
  setup(props, content) {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    let isReplyInput = ref(false)
    let parentCommentId = ''
    let replyInputContent = ref('')
    let starNum = ref(0)
    starNum.value = props.comment.commentStar

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
          user: data.data,
          commentContent: replyInputContent.value,
        })
        replyInputContent.value = ''
      } else {
        ElMessage.error(data.data)
      }
    }
    //点赞
    const commentStarFun = (commentId: string, isUnStar: boolean) => {
      commentStar(commentId, isUnStar)
    }
    async function commentStar(commentId: string, isUnStar: boolean) {
      const data = await getCommentStar(commentId, isUnStar)
      if (data.success) {
        if (isUnStar) {
          starNum.value--
          ElMessage.success('取消点赞成功')
        } else {
          starNum.value++
          ElMessage.success('点赞成功')
        }
      } else {
        ElMessage.error(data.data)
      }
    }
    //删除评论
    const delCommentFun=(commentId:string)=>{
      delComment(commentId)
    }
    async function delComment(commentId:string) {
      const data = await getDelComment(commentId)
        if(data.success){
          ElMessage.success('删除评论成功')
          content.emit('destroyCommentEmit',true)
        }else{
          ElMessage.error(data.data)
        }
    }
    //删除虚拟评论
    const delVirCommentFun=(commentId:string)=>{
      content.emit('VirReplyDelEmit',props.virIndex)
    }
    return {
      replyFun,
      nickNameFun,
      formatUtcString,
      replyInputContent,
      isReplyInput,
      submitReplyFun,
      commentStarFun,
      starNum,
      delCommentFun,
      delVirCommentFun
    }
  },
})
</script>

<style scoped lang="less">
.top {
  display: flex;
  align-items: center;
}
.commentBtn {
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
