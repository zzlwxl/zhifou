<template>
  <el-form ref="ruleFormRef" :model="userInfoForm" :rules="userRules" label-width="120px" class="demo-userInfoForm" :size="formSize">
    <el-form-item label="用户名" prop="userName">
      <el-input v-model="userInfoForm.userName" />
    </el-form-item>
    <el-form-item label="昵称" prop="nickName">
      <el-input v-model="userInfoForm.nickName" />
    </el-form-item>
    <el-form-item label="手机号" prop="phoneNum">
      <el-input v-model="userInfoForm.phoneNum" />
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="userInfoForm.email" />
    </el-form-item>
    <el-form-item label="性别" prop="sex">
      <el-radio-group v-model="userInfoForm.sex">
        <el-radio label="1" size="large">男</el-radio>
        <el-radio label="0" size="large">女</el-radio>
        <el-radio label="2" size="large">私密</el-radio>
      </el-radio-group>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitFormRule(ruleFormRef)">提交</el-button>
    </el-form-item>
  </el-form>
</template>
<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import { useStore } from '../../store'
import { userRules } from './config/userRule'

import {ElMessage} from 'element-plus'

import type { FormInstance } from 'element-plus'
import {IUserInfo} from '../../service/user/type'

import {editUserInfo} from '../../service/user/user'

export default defineComponent({
  name: 'ChangeUserInfo',
  emits:['changeDialogVisibleEmit'],
  setup(props, content) {
    const store = useStore()
    const ruleFormRef = ref<FormInstance>()
    const userInfoStore = store.state.user.userInfo
    const userInfoForm = reactive({...userInfoStore })

    //提交前验证表单
    const submitFormRule = async (formEl: FormInstance | undefined) => {
      if (!formEl) return
      await formEl.validate((valid:any, fields:any) => {
        if (valid) {
          const submitFormData= {
            userName: userInfoForm.userName,
            nickName: userInfoForm.nickName,
            phoneNum: `${userInfoForm.phoneNum}`,
            email: userInfoForm.email,
            sex: userInfoForm.sex,
          }
          submitForm(submitFormData)
        }
      })
    }
    //提交表单
    async function submitForm(data:IUserInfo) {
        const value = await editUserInfo(data)
        if(value.success){
          ElMessage({
          message: '修改成功',
          type: 'success',
        })
        }
        //更改vuex里的用户信息
        store.commit('user/changeUserInfo',value.data)
        content.emit('changeDialogVisibleEmit')
    }
    return {
      userInfoForm,
      submitFormRule,
      userRules,
      ruleFormRef,
    }
  },
})
</script>

<style scoped lang="less"></style>
