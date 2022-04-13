<template>
  <div class="LoginPanel">
    <span class="back">
      <el-link @click="$router.go(-1)">返回</el-link>
    </span>
    <el-tabs type="border-card" class="demo-tabs" stretch v-model="currentTab">
      <el-tab-pane name="login">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><Avatar /></el-icon>
            <span>账号登录</span>
          </span>
        </template>
        <Login v-if="currentTab === 'login'" ref="loginRef"></Login>
      </el-tab-pane>
      <el-tab-pane name="register">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><Avatar /></el-icon>
            <span>账号注册</span>
          </span>
        </template>
        <LoginAccount v-if="currentTab === 'register'" ref="accountRef"></LoginAccount>
      </el-tab-pane>

      <el-tab-pane name="phone">
        <template #label>
          <span class="custom-tabs-label">
            <el-icon><Iphone /></el-icon>
            <span>扫码登录</span>
          </span>
        </template>
        <LoginPhone v-if="currentTab === 'phone'" :isCallBack="true" ref="phoneRef"></LoginPhone>
      </el-tab-pane>
    </el-tabs>
    <div v-if="currentTab !== 'phone'" class="accountAction">
      <el-checkbox v-model="isKeepPassword" label="记住密码" size="large" />
      <el-link type="primary" @click="$router.push('/forgetpwd')">忘记密码</el-link>
    </div>
    <el-button v-if="currentTab!=='phone'" class="subForm" type="primary" @click="submitForm()">提交</el-button>
  </div>
</template>

<script lang="ts">
import { Avatar, Iphone } from '@element-plus/icons-vue'
import { defineComponent, ref } from 'vue'
import LoginAccount from './LoginAccount.vue'
import LoginPhone from './LoginPhone.vue'
import Login from './Login.vue'
import localCache from '../../../utils/cache'

export default defineComponent({
  components: {
    Avatar,
    Iphone,
    LoginAccount,
    LoginPhone,
    Login,
  },
  setup() {
    const isKeepPassword = ref(true)
    const currentTab = ref<string>('login')

    // const test = ref<string>()
    // test = 'wxl'
    /**
     * class c {
     *   x=0
     * }
     * type T = InstanceType<typeof c>
     * T 就等于 c
     */
    const accountRef = ref<InstanceType<typeof LoginAccount>>() //拥有构造函数的实例（拿到类型->再拿到它对应的实例)
    const loginRef = ref<InstanceType<typeof Login>>()
    const phoneRef = ref<InstanceType<typeof LoginPhone>>()
    function submitForm() {
      console.log(localCache.getCache('token') ?? '没有')
      if (currentTab.value === 'register') {
        accountRef.value?.loginAction(isKeepPassword.value)
      } else if (currentTab.value === 'login') {
        loginRef.value?.loginAction(isKeepPassword.value)
      } else {
        console.log('手机登录')
      }
    }
    return {
      isKeepPassword,
      submitForm,
      accountRef,
      loginRef,
      phoneRef,
      currentTab,
    }
  },
})
</script>

<style scoped lang="less">
@col1: #2196f3;
@col2: #388e3c;
.accountAction {
  display: flex;
  justify-content: space-between;
}
.subForm {
  width: 100%;
}

.back {
  display: inline-block;
  margin-bottom: 5px;
}
.LoginPanel {
  width: 350px;
  margin: 0 auto;
  margin-top: 50px;
}
.logo {
  background-color: #fff;
  color: @col1;
  font-size: 25px;
  width: 20%;
  span {
    color: @col2;
  }
}
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
.demo-tabs .custom-tabs-label .el-icon {
  vertical-align: middle;
}
.demo-tabs .custom-tabs-label span {
  vertical-align: middle;
  margin-left: 4px;
}
.el-link {
  margin-right: 8px;
}
</style>
