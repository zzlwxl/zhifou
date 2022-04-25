<template>
  <div class="CommentsCard">
    <div>
      <el-form class="demo-ruleForm form">
        <el-form-item prop="desc">
          <el-input style="width:100%" placeholder="我要评论..." ref="inputRef" v-model="commentContent" type="textarea" />
        </el-form-item>
        <el-form-item>
          <el-button class="subBtn" type="primary" @click="submitComment()">发表评论</el-button>
        </el-form-item>
      </el-form>
    </div>
    <CommentReply v-for="item in commentAllList" :key="item.commentId" :reply="item.children" :comment="item" :deep="0" :isReply="false" :present2="item.author"></CommentReply>
    <div class="nullBox">
      <el-button @click="wantComment" color="#2196f3" style="color: white">我要评论</el-button>
      <el-button :loading="loading" v-if="!isNullComment" @click="getCommentFun" color="#388e3c" style="color: white">加载更多</el-button>
      <el-button v-else :disabled="isNullComment" color="#388e3c" style="color: white">已经到底</el-button>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref ,nextTick} from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { addComment, getComment } from '../../service/comment/index'
import { IDataType } from '../../service/comment/type'
import { ElInput} from 'element-plus'
import message from '../../utils/message'
import CommentReply from './CommentReply.vue'

export default defineComponent({
  name: 'CommentsCard',
  components: {
    CommentReply,
  },
  props: {
    articleId: {
      type: String,
      dafault: '',
    },
  },
  setup(props, content) {
    let route = useRoute()
    let commentContent = ref('')
    let current = 1
    let size = 10
    let commentAllList = ref<any>([])
    let isNullComment = ref(false)
    let loading = ref(true)
    const inputRef=ref<InstanceType<typeof ElInput>>()

    const init = () => {
      current = 1
      size = 10
      commentAllList.value.length = 0
      isNullComment.value = false
      loading.value = false
    }

    async function getCommentFun() {
      loading.value=true
      let commentData!: IDataType
      commentData = await getComment({ articleId: route.params.id as string, current, size, orderBy: 'createTime.desc' })
      if (commentData.success) {
        if (commentData.data.pages === commentData.data.current) {
          isNullComment.value = true
        }
        commentAllList.value.push(...commentData.data.records)
        console.log(commentAllList.value)
        current++
        loading.value=false
      } else {
        message.warning(commentData.data)
      }
    }
    getCommentFun()

    const submitComment = () => {
      addCommentFun()
    }
    async function addCommentFun() {
      if (!props.articleId) {
        return
      } else if (!commentContent.value) {
        return message.warning('请输入评论内容')
      }
      const data = await addComment({
        articleId: props.articleId,
        commentContent: commentContent.value,
      })
      if (data.success) {
        message.success('评论成功')
        commentContent.value = ''
        init()
        getCommentFun() //刷新评论
      } else {
        message.warning(data.data)
      }
    }
    const wantComment=()=>{
       nextTick(()=>{
        inputRef.value?.focus()
      })
    }
    return {
      commentContent,
      submitComment,
      commentAllList,
      getCommentFun,
      isNullComment,
      inputRef,
      wantComment,
      loading
    }
  },
})
</script>

<style scoped lang="less">
.CommentsCard {
  width: 100%;
  .demo-ruleForm {
    margin-top: 10px;
    margin-right: 10px;
  }
}
.nullBox {
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: center;
}
.active {
  width: 90%;
  position: fixed;
  bottom: 8vh;
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
.form{
  margin: 0 4px;
  position: relative;
  .subBtn{
    position: absolute;
    right: 0;
  }
}
</style>
