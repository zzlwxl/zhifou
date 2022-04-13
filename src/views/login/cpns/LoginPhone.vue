<template>
  <div class="LoginPhone">
    <div class="tip">
      <div>微信扫码登录</div>
      <img :src="codeImgSrc" />
    </div>
    <el-dialog v-model="centerDialogVisible" width="30%" center>
      <el-form :model="account" :rules="rules" class="demo-ruleForm">
        <el-form-item label="账号" prop="userName">
          <el-input v-model="account.userName" />
        </el-form-item>
        <el-form-item label="密码" prop="passWord">
          <el-input v-model="account.passWord" type="password" show-password />
        </el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)">提交</el-button>
      </el-form>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, reactive,watchEffect } from 'vue'

import { LoginByWxAuth2, LoginByWxAuth2Callback, CompleteUserInfo } from '../../../service/login/login'

import localCache from '../../../utils/cache'
import { rules } from '../config/account-config'

import { useRouter } from 'vue-router'

import { ElMessage } from 'element-plus'

export default defineComponent({
  name: 'LoginPhone',
  props: {
    isBindWxFlag: {
      type: Boolean,
      default: false,
    },
    isCallBack: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['getStateEmit'],
  setup(props, content) {
    const router = useRouter()
    let isCallBack = props.isCallBack //是否允许轮训
    let isBindWxFlag = props.isBindWxFlag
    let centerDialogVisible = ref(false)
    let state = ''
    let codeImgSrc = ref('')
    let callBackFlag = false
    let token = ''

    const account = reactive({
      userName: localCache.getCache('name') ?? '',
      passWord: localCache.getCache('password') ?? '',
    })
    LoginByWxAuthCode()
    async function loginCallback() {
      const data = await LoginByWxAuth2Callback(state)
      if (data.success) {
        callBackFlag = true
        token = data.data.token
        if (!isBindWxFlag && data.data.needUpdateInfo) {
          centerDialogVisible.value = true
        } else {
          localCache.setCache('token', data.data.token)
          ElMessage.success('登录成功')
          router.go(-1)
        }
      }
    }
    async function submitForm() {
      localCache.setCache('token', token)
      const data = await CompleteUserInfo(account)
      if (data.success) {
        ElMessage.success('登录成功')
        console.log('datadatafatfasfas', data)
        if (isBindWxFlag) {
          // content.emit('getStateEmit', data.data.state)
        } else {
          router.go(-1)
        }
      } else {
        ElMessage.warning(data.data)
        localCache.deleteCache('token')
      }
    }
    async function LoginByWxAuthCode() {
      ElMessage.success('打算论序')
      //不允许轮训
      // if (isCallBack) {
      //   ElMessage.success('不允许论序')
        
      // }else{
        const data = await LoginByWxAuth2()
        if (data.success) {
          state = data.data.state
          codeImgSrc.value = data.data.img
          if (isBindWxFlag) {
            console.log('datadatafatfasfas', data)
            content.emit('getStateEmit', data.data.state)
            callBackFlag=true
          }
          let count = 0
          let timer = setInterval(() => {
            if (callBackFlag) {
              clearInterval(timer)
            } else if (count === 60) {
              clearInterval(timer)
              ElMessage.error('长时间未操作')
            } else {
              count++
              loginCallback()
            }
          }, 1000)
        }
        console.log(data)
        
      // }
    }

    const submit = () => {
      // LoginByWx(input.value)
    }
    // async function LoginByWx(code: string) {
    //   const data = await LoginByWxCode(code)
    //   if (data.success) {
    //     centerDialogVisible.value = true
    //     localCache.setCache('token', data.data)
    //   }
    // }

    const isGoRouter = () => {
      centerDialogVisible.value = false
      router.go(-1)
    }
    return {
      submit,
      centerDialogVisible,
      isGoRouter,
      codeImgSrc,
      rules,
      account,
      submitForm,
    }
  },
})
</script>

<style scoped lang="less">
.tip {
  display: flex;
  flex-direction: column;
  align-items: center;
  div {
    font-size: 1.4rem;
  }
}
</style>
