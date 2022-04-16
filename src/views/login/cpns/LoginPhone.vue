<template>
  <div class="LoginPhone">
    <div class="tip">
      <div><slot name="title">微信扫码登录</slot></div>
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
import { defineComponent, ref, reactive, watchEffect, onMounted, onUnmounted } from 'vue'

import { LoginByWxAuth2, LoginByWxAuth2Callback, CompleteUserInfo } from '../../../service/login/login'

import localCache from '../../../utils/cache'
import { rules } from '../config/account-config'
import { BindWx } from '../../../service/login/login'

import { useRouter } from 'vue-router'

import { ElMessage } from 'element-plus'

export default defineComponent({
  name: 'LoginPhone',
  props: {
    isBindWxFlag: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['getStateEmit', 'bindWxOkEmit'],
  setup(props, content) {
    const router = useRouter()
    let isBindWxFlag = props.isBindWxFlag
    let centerDialogVisible = ref(false)
    let state = ''
    let codeImgSrc = ref('')
    let callBackFlag = false
    let token = ''
    let count = 0

    const account = reactive({
      userName: localCache.getCache('name') ?? '',
      passWord: localCache.getCache('password') ?? '',
    })

    //轮训请求用户是否扫码成功
    async function loginCallback() {
      if (isBindWxFlag) {
        const data = await BindWx(state)
        console.log('isddddddd', state)
        if (data.success) {
          console.log('绑定的信息', data)
          ElMessage.success('绑定成功')
          callBackFlag = true
          content.emit('bindWxOkEmit')
          return
        }
      }
      if (isBindWxFlag) return
      const data = await LoginByWxAuth2Callback(state)
      if (data.success) {
        callBackFlag = true
        token = data.data.token
        if (!isBindWxFlag && data.data.needUpdateInfo) {
          //补全用户信息的弹窗
          centerDialogVisible.value = true
        } else if (!isBindWxFlag) {
          //先保存token
          localCache.setCache('token', data.data.token)
          ElMessage.success('登录成功')
          router.go(-1)
        }
      }
    }
    //补全用户信息
    async function submitForm() {
      localCache.setCache('token', token)
      const data = await CompleteUserInfo(account)
      if (data.success) {
        ElMessage.success('登录成功')
        localCache.setCache('token', token)
        router.go(-1)
      } else {
        ElMessage.warning(data.data)
        //用户未正确补全用户信息,就再删除token
        localCache.deleteCache('token')
      }
    }

    onMounted(() => {
      //获取二维码
      LoginByWxAuthCode()
      console.log('isddddddd', isBindWxFlag)
    })
    onUnmounted(() => {
      count = 60
    })
    async function LoginByWxAuthCode() {
      const data = await LoginByWxAuth2() //获取二维码
      if (data.success) {
        state = data.data.state
        codeImgSrc.value = data.data.img
        // if (isBindWxFlag) {
        //   console.log('datadatafatfasfas', data)
        //   content.emit('getStateEmit', data.data.state)
        //   callBackFlag=true
        // }

        let timer = setInterval(() => {
          if (callBackFlag) {
            //   if (isBindWxFlag) {
            //     content.emit('getStateEmit', data.data.state)
            //     content.emit('getStateEmit', data.data.state)
            //   }
            clearInterval(timer)
          } else if (count === 60) {
            clearInterval(timer)
            ElMessage.error('二维码已经失效')
          } else {
            count++
            //轮训请求用户是否已经扫码成功
            loginCallback()
          }
        }, 1000)
      }
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
