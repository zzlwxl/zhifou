<template>
  <div class="ReplyOfComment">
    <div class="top">
      <div>
        <el-avatar :size="30" :src="comment.author.headImgUrl" />
      </div>
      <span class="first" v-if="!isReply">{{ nickNameFun(comment.author.nickName) }}:</span>
      <span class="first" v-else
        >{{ nickNameFun(comment.author.nickName) }} <span>回复</span><span class="second">{{ nickNameFun(present.nickName) }}:</span></span
      >
    </div>
    <div class="content">
      {{ comment.commentContent }}
    </div>
    <div class="active">
      <template v-if="!comment.owner">
        <el-icon :size="size" :color="color">
          <Stopwatch />
        </el-icon>
        <span>{{ formatUtcString(comment.createTime) }}</span>
        <el-icon :size="size" :color="(starNum === comment.commentStar) === !comment.liked ? color : '#C62828'">
          <Star />
        </el-icon>
        <span class="commentBtn" v-if="(starNum === comment.commentStar) === !comment.liked" @click.stop="commentStarFun(comment.commentId, false)">{{ `点赞 ${starNum}` }}</span>
        <span class="commentBtn" style="color:#C62828" v-else @click.stop="commentStarFun(comment.commentId, true)">{{ `点赞 ${starNum}` }}</span>
        <el-icon :size="size">
          <Comment />
        </el-icon>
        <span class="commentBtn" @click.stop="replyFun(comment.commentId)">评论</span>
      </template>
      <template v-else>
        <el-icon :size="size" :color="(starNum === comment.commentStar) === !comment.liked ? color : '#C62828'">
          <DeleteFilled />
        </el-icon>
        <span v-if="!isVirComment" class="commentBtn" @click="delCommentFun(comment.commentId)">删除</span>
        <span v-else class="commentBtn" @click="delVirCommentFun(comment.commentId)">删除</span>
      </template>
    </div>
    <div v-if="isReplyInput" class="replyInput">
      <el-input @blur.stop="test" clearable ref="inputRef" v-model="replyInputContent" :placeholder="`回复 ${nickNameFun(comment.author.nickName)}`" class="input-with-select">
        <template #append>
          <el-button @click.stop="submitReplyFun">提交</el-button>
        </template>
      </el-input>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, nextTick} from 'vue'
import { useStore } from '../../store/index'
import { useRoute, useRouter } from 'vue-router'

import message from '../../utils/message'

import { formatUtcString } from '../../utils/date'

import { addComment } from '../../service/comment/index'

import { getCommentStar, getDelComment } from '../../service/comment/index'

import { Comment, Star, Stopwatch, DeleteFilled } from '@element-plus/icons-vue'
import {ElInput} from 'element-plus'

export default defineComponent({
  name: 'ReplyOfComment',
  props: ['comment', 'isReply', 'present', 'isVirComment', 'virIndex'],
  emits: ['isReplyOkEmit', 'destroyCommentEmit', 'VirReplyDelEmit'],
  components: {
    Comment,
    Star,
    Stopwatch,
    DeleteFilled,
  },
  setup(props, content) {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    let isReplyInput = ref(false)
    let parentCommentId = ''
    let replyInputContent = ref('')
    let starNum = ref(0)
    let isClickSubBtn=false
    const inputRef=ref<InstanceType<typeof ElInput>>()
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
      nextTick(()=>{
        inputRef.value?.focus()
      })
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
        return message.warning('请输入回复内容')
      }
    }
    async function submitComment() {
      const data = await addComment({
        articleId: route.params.id as string,
        commentContent: replyInputContent.value,
        parentCommentId: parentCommentId,
      })
      if (data.success) {
        message.success('回复成功')
        isReplyInput.value = false
        content.emit('isReplyOkEmit', {
          replyer: store.state.user.userInfo,
          byReplyer: nickNameFun(props.comment.author.nickName),
          user: data.data,
          commentContent: replyInputContent.value,
        })
        replyInputContent.value = ''
        //提交成功,隐藏输入框
        // isReplyInput.value=!isReplyInput.value
      } else {
        message.error(data.data)
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
          message.success('取消点赞成功')
        } else {
          starNum.value++
          message.success('点赞成功')
        }
      } else {
        message.error(data.data)
      }
    }
    //删除评论
    const delCommentFun = (commentId: string) => {
      delComment(commentId)
    }
    async function delComment(commentId: string, isDelVirComment = false) {
      const data = await getDelComment(commentId)
      if (data.success) {
        message.success('删除评论成功')
        if (isDelVirComment) {
          content.emit('VirReplyDelEmit', props.virIndex)
        } else {
          content.emit('destroyCommentEmit', true)
        }
      } else {
        message.error(data.data)
      }
    }
    //删除虚拟评论
    const delVirCommentFun = (commentId: string) => {
      delComment(commentId, true)
    }
    const test=()=>{
      console.log('切换焦点')
      // isReplyInput.value=!isReplyInput.value
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
      delVirCommentFun,
      inputRef,
      test
    }
  },
})
</script>

<style scoped lang="less">
@fontCol: #777;
@col1: #2196f3;
@col2: #388e3c;
.ReplyOfComment {
  margin-bottom: 30px;
}
.top {
  display: flex;
  align-items: center;
  .first{
    color: @col1;
    cursor: pointer;
  }
  .second{
    cursor: pointer;
    color: @col2;
  }
}
.commentBtn {
  cursor: pointer;
}
span {
  font-size: 12px;
  margin-left: 5px;
  color: @fontCol;
}
.content {
  margin-left: 50px;
  margin-right: 10px;
  margin-bottom: 4px;
  border-radius: 10px;
  padding: 4px;
  font-size: 1.2rem;
  color: rgb(117, 117, 117);
  line-height: 1.6rem;
  background-color: #fff;
}
.active {
  float: right;
  span {
    margin-right: 10px;
  }
}
.replyInput{
  margin: 0 10px;
}
</style>
