<template>
  <div class="pwd">
    <el-form ref="ruleFormRef" :model="pwdForm" :rules="pwdRules"  class="demo-userInfoForm" :size="formSize">
      <el-form-item label="旧密码" prop="oldPwd">
        <el-input v-model="pwdForm.oldPwd" />
      </el-form-item>
      <el-form-item label="新密码" prop="pwd">
        <el-input v-model="pwdForm.pwd" />
      </el-form-item>
      <el-form-item>
        <el-button style="margin:0 auto" type="primary" @click="submitFormRule(ruleFormRef)">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import localCache from '../../utils/cache'
import { useRouter } from 'vue-router'
import { pwdRules } from './config/pwdRule'

import { ElMessage } from 'element-plus'

import type { FormInstance } from 'element-plus'
import { IEditPwd } from '../../service/user/type'

import { editPwd } from '../../service/user/user'

export default defineComponent({
  name: 'SetPwd',
  setup(props, content) {
    const router = useRouter()
    const ruleFormRef = ref<FormInstance>()
    const pwdForm = reactive({
      oldPwd: '',
      pwd: '',
    })

    //提交前验证表单
    const submitFormRule = async (formEl: FormInstance | undefined) => {
      if (!formEl) return
      await formEl.validate((valid: any, fields: any) => {
        if (valid) {
          const submitFormData = {
            oldPwd: pwdForm.oldPwd,
            pwd: pwdForm.pwd,
          }
          submitForm(submitFormData)
        }
      })
    }
    //提交表单
    async function submitForm(data: IEditPwd) {
      const value = await editPwd(data)
      if (value.success) {
        ElMessage({
          message: '修改成功，请重新登录',
          type: 'success',
        })
          localCache.deleteCache('token')
          router.replace('/login')
      }else{
          ElMessage({
          message: value.data,
          type: 'warning',
        })
      }
    }
    return {
      pwdForm,
      submitFormRule,
      pwdRules,
      ruleFormRef,
    }
  },
})
</script>

<style scoped lang="less">
.pwd {
  width: 350px;
  margin: 50px auto;
}
</style>
