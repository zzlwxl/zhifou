<template>
  <div class="pwd">
    <el-form ref="ruleCodeFormRef" :model="codeForm" :rules="rules" label-width="120px" class="demo-userInfoForm" :size="formSize">
      <el-form-item label="用户名" prop="userName">
        <div class="get-code">
          <el-input v-model="codeForm.userName" placeholder="提交用户名发送手机验证码" />
          <el-button id="codeBtn" :disabled="disabled" style="margin-left: 5px" type="primary" @click="submitCodeFormRule(ruleCodeFormRef)">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>

    <el-form ref="ruleResetFormRef" :model="submitForm" :rules="userRules" label-width="120px" class="demo-userInfoForm" :size="formSize">
      <el-form-item label="验证码" prop="code">
        <el-input v-model="submitForm.code" />
      </el-form-item>
      <el-form-item label="新密码" prop="passWord">
        <el-input v-model="submitForm.passWord" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitPwdFormRule(ruleResetFormRef)">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'

import { useRouter } from 'vue-router'
import { pwdRules } from './config/pwdRule'
import { userRules } from './config/resetPwdRule'

import { ElMessage } from 'element-plus'

import type { FormInstance } from 'element-plus'
import { IForgetPwdCode, IResetPwd } from '../../service/user/type'

import { getPhone, resetPwd } from '../../service/user/user'

export default defineComponent({
  name: 'SetPwd',
  setup(props, content) {
    const router = useRouter()
    const ruleCodeFormRef = ref<FormInstance>()
    const ruleResetFormRef = ref<FormInstance>()
    const disabled = ref(false)
    const codeForm = reactive({
      userName: '',
    })
    const submitForm = reactive({
      uuid: '',
      code: '',
      passWord: '',
    })
    const rules = reactive({
      userName: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 3, max: 10, message: '', trigger: 'blur' },
      ],
    })
    //验证码提交前验证表单
    const submitCodeFormRule = async (formEl: FormInstance | undefined) => {
      if (!formEl) return
      await formEl.validate((valid: any, fields: any) => {
        if (valid) {
          const submitFormData = {
            userName: codeForm.userName,
          }
          submitCodeForm(submitFormData)
        }
      })
    }
    //提交验证码表单
    async function submitCodeForm(data: IForgetPwdCode) {
      const codeData = await getPhone(data)
      console.log(codeData)
      if (codeData.success) {
        submitForm.uuid = codeData.data
        disabled.value=true
        ElMessage({
          message: '获取验证码成功',
          type: 'success',
        })
        setTimeout(()=>{
            disabled.value=false
        },60000)
        
      } else {
        ElMessage({
          message: codeData.data,
          type: 'warning',
        })
      }
    }
    //修改密码提交前验证表单
    const submitPwdFormRule = async (formEl: FormInstance | undefined) => {
      if (!formEl) return
      await formEl.validate((valid: any, fields: any) => {
        if (valid) {
          submitPwdForm(submitForm)
        }
      })
    }
    //提交修改密码表单
    async function submitPwdForm(data: IResetPwd) {
      const resetPwdData = await resetPwd(submitForm)
      if (resetPwdData.success) {
          ElMessage({
              message:'修改成功',
              type:'success'
          })
        router.push('/login')
      }else{
          ElMessage({
              message:resetPwdData.data,
              type:'warning'
          })
      }
    }
    return {
      codeForm,
      submitCodeFormRule,
      submitPwdFormRule,
      pwdRules,
      userRules,
      submitForm,
      rules,
      ruleCodeFormRef,
      ruleResetFormRef,
      disabled
    }
  },
})
</script>

<style scoped lang="less">
.pwd {
  width: 420px;
  margin: 50px auto;
}
.get-code {
  display: flex;
}

.get-btn {
  margin-left: 8px;
}
</style>
