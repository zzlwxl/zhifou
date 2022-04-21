<template>
  <div class="LoginPhone">
    <div class="tip">
      <div>
        <slot name="title">
          <div class="title">
            <span>微信扫码登录</span>
            <span class="tips">首次使用默认密码是123456</span>
          </div>
        </slot>
      </div>
      <img :src="codeImgSrc" />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, reactive, watchEffect, onMounted, onUnmounted } from 'vue'

import { LoginByWxAuth2, LoginByWxAuth2Callback, CompleteUserInfo } from '../../../service/login/login'

import localCache from '../../../utils/cache'
import { rules } from '../config/account-config'
import { BindWx } from '../../../service/login/login'

import { useStore } from '../../../store/index'
import { useRoute, useRouter } from 'vue-router'

import message from '../../../utils/message'

export default defineComponent({
  name: 'LoginPhone',
  props: {
    isBindWxFlag: {
      type: Boolean,
      default: false,
    },
    isViewBind:{
      type:Boolean,
      default:false
    }
  },
  emits: ['getStateEmit', 'bindWxOkEmit'],
  setup(props, content) {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    let isBindWxFlag = props.isBindWxFlag
    let centerDialogVisible = ref(false)
    let state = ''
    let codeImgSrc = ref('')
    let callBackFlag = false
    let token = ''
    let count = 0
    let flag = true

    const account = reactive({
      userName: localCache.getCache('name') ?? '',
      passWord: localCache.getCache('password') ?? '',
    })

    watchEffect(() => {
    })
    //轮训请求用户是否扫码成功
    async function loginCallback() {
      if (isBindWxFlag) {
        const data = await BindWx(state)
        console.log('isddddddd', state)
        if (data.success) {
          console.log('绑定的信息', data)
          message.success('绑定成功')
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
        //先保存token
        localCache.setCache('token', data.data.token)
        message.success('登录成功')
        router.go(-1)
      }else{
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
            message.error('二维码已经失效')
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
.title{
  display: flex;
  flex-direction: column;
  align-items: center;
  .tips{
    color: rgb(161, 161, 161);
    margin-top: 2px;
    font-size: 12px;
  }
}
</style>
