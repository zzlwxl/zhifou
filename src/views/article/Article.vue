<template>
  <div class="article">
    <el-form ref="ruleFormRef" :model="subForm" :rules="articleRules" label-width="120px" class="demo-userInfoForm" :size="formSize">
      <el-form-item label="文章标题" prop="articleTitle">
        <el-input v-model="subForm.articleTitle" />
      </el-form-item>
      <Category></Category>
      <!-- <el-form-item label="文章内容" prop="articleName">
        <el-input v-model="subForm.articleName" />
      </el-form-item> -->
      <el-form-item label="文章内容" prop="articleContent">
        <el-input type="textarea" v-model="subForm.articleContent" />
      </el-form-item>
      <el-form-item label="文章状态" prop="articleState">
        <el-radio-group v-model="subForm.articleState">
          <el-radio label="1" size="large">发布</el-radio>
          <el-radio label="2" size="large">草稿</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitFormRule(ruleFormRef)">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'

import Category from './Category.vue'

import { useRouter } from 'vue-router'
import { articleRules } from './config/articleRules'

import { ElMessage } from 'element-plus'

import type { FormInstance } from 'element-plus'
import { IArticle } from '../../service/article/type'

import { addArticle } from '../../service/article/index'

export default defineComponent({
  name: 'Article',
  components:{
      Category
  },
  setup(props, content) {
    const router = useRouter()
    const ruleFormRef = ref<FormInstance>()
    const subForm = reactive({
      articleTitle: '',
      articleName: '',
      categoryId: '',
      articleContent: '',
      articleState: '',
    })

    //提交前验证表单
    const submitFormRule = async (formEl: FormInstance | undefined) => {
      if (!formEl) return
      await formEl.validate((valid: any, fields: any) => {
        if (valid) {
          const submitFormData = {
            articleTitle: subForm.articleTitle,
            articleName: subForm.articleName,
            categoryId: subForm.categoryId,
            articleContent: subForm.articleContent,
            articleState: subForm.articleState,
          }
          submitForm(submitFormData)
        }
      })
    }
    //提交表单
    async function submitForm(data: IArticle) {
      const value = await addArticle(data)
      if (value.success) {
        ElMessage({
          message: '提交成功',
          type: 'success',
        })
        //   router.replace('/login')
      } else {
        ElMessage({
          message: value.data,
          type: 'warning',
        })
      }
    }
    return {
      subForm,
      submitFormRule,
      articleRules,
      ruleFormRef,
    }
  },
})
</script>

<style scoped lang="less">
.article {
  width: 400px;
  margin: 0 auto;
  margin-top: 10px;
}
.pwd {
  width: 350px;
  margin: 50px auto;
}
</style>
