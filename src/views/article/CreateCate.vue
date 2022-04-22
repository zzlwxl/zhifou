<template>
  <el-form ref="ruleFormRef" :model="cateForm" :rules="createRules" label-width="100px" class="demo-cateForm" :size="formSize">
    <el-form-item label="分类名字" prop="categoryName">
      <el-input v-model="cateForm.categoryName" />
    </el-form-item>
    <el-form-item label="分类别名" prop="categoryAlias">
      <el-input v-model="cateForm.categoryAlias" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitFormRule(ruleFormRef)">提交</el-button>
    </el-form-item>
  </el-form>
</template>
<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import { createRules } from './config/createRules'

import message from '../../utils/message'

import type { FormInstance } from 'element-plus'
import { createCate } from '../../service/article/index'

import { ICreateCate } from '../../service/article/type'

export default defineComponent({
  name: 'ChangeUserInfo',
  emits: ['changeDialogVisibleEmit', 'createOKCateEmit'],
  props: {
    parentCateId: {
      type: String,
    },
  },
  setup(props, content) {
    const ruleFormRef = ref<FormInstance>()
    const cateForm = reactive({
      categoryName: '',
      categoryAlias: '',
      parentCategoryId: props.parentCateId,
    })

    //提交前验证表单
    const submitFormRule = async (formEl: FormInstance | undefined) => {
      if (!formEl) return
      await formEl.validate((valid: any, fields: any) => {
        if (valid) {
          const submitFormData = {
            categoryName: cateForm.categoryName,
            categoryAlias: cateForm.categoryAlias,
            parentCategoryId: cateForm.parentCategoryId,
          }
          submitForm(submitFormData)
        }
      })
    }
    //提交表单
    async function submitForm(data: any) {
      const value = await createCate(data)
      if (value.success) {
        message.success('创建成功');
        (cateForm.categoryName = ''), (cateForm.categoryAlias = '')
        content.emit('createOKCateEmit', { categoryName: value.data.categoryName, categoryId: value.data.categoryId })
      } else {
        message.error(value.data)
      }
    }
    return {
      cateForm,
      submitFormRule,
      createRules,
      ruleFormRef,
    }
  },
})
</script>

<style scoped lang="less"></style>
