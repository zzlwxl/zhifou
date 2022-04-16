<template>
  <div class="CommentsCard">
    <el-form ref="ruleFormRef" :rules="rules" label-width="120px" class="demo-ruleForm">
      <el-form-item label="我来评论" prop="desc">
        <el-input v-model="commentContent" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitComment()">发表评论</el-button>
      </el-form-item>
    </el-form>
    <CommentReply v-for="item in commentAllList"
    :key="item.commentId"
    :reply="item.children"
    :comment="item"
    :deep="0"
    ></CommentReply>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRoute,useRouter } from 'vue-router'
import { addComment ,getComment} from '../../service/comment/index'
import { IComment,IDataType } from '../../service/comment/type'
import { ElMessage } from 'element-plus'
import CommentReply from './CommentReply.vue'

export default defineComponent({
  name: 'CommentsCard',
  components:{
    CommentReply
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
    async function getCommentFun() {
      let commentData!:IDataType
      commentData = await getComment({articleId:route.params.id as string,current,size})
      if(commentData.success){
        commentAllList.value.push(...commentData.data.records)
        console.log(commentAllList.value)
      }else{
        ElMessage.warning(commentData.data)
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
        return ElMessage.warning('请输入评论内容')
      }
      const data = await addComment({
        articleId: props.articleId,
        commentContent: commentContent.value,
      })
      if (data.success) {
        ElMessage.success('评论成功')
        commentContent.value = ''
      } else {
        ElMessage.warning(data.data)
      }
    }
    return {
      commentContent,
      submitComment,
      commentAllList
    }
  },
})
</script>

<style scoped lang="less">
.CommentsCard {
  width: 100%;
}
</style>
