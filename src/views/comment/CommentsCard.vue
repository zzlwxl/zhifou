<template>
  <div class='CommentsCard'>
    <el-form
    ref="ruleFormRef"
    :rules="rules"
    label-width="120px"
    class="demo-ruleForm"
  >
    <el-form-item label="我来评论" prop="desc">
      <el-input v-model="commentContent" type="textarea" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitComment()"
        >发表评论</el-button
      >
    </el-form-item>
  </el-form>
  </div>
</template>
<script lang='ts'>
import { defineComponent,ref } from 'vue'
import {addComment} from '../../service/comment/index'
import {IComment} from '../../service/comment/type'
import { ElMessage } from 'element-plus'

export default defineComponent({
  name: 'CommentsCard',
  props:{
    articleId:{
      type:String,
      dafault:''
    }
  },
  setup(props,content){
    let commentContent=ref('')
    const submitComment=()=>{
      addCommentFun()
    }
    async function addCommentFun() {
      if(!props.articleId){
        return
      }else if(!commentContent.value){
        return ElMessage.warning('请输入评论内容')
      }
      const data=await addComment({
        articleId:props.articleId,
        commentContent:commentContent.value
      })
      if(data.success){
        ElMessage.success('评论成功')
        commentContent.value=''
      }else{
        ElMessage.warning(data.data)
      }
    }
    return{
      commentContent,
      submitComment
    }
  }
})
</script>

<style scoped lang='less'>
.CommentsCard{
    width: 100%;
}
</style>