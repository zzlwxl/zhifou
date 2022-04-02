<template>
  <div class="LoginPanel">
    <el-tabs type="border-card" class="demo-tabs" stretch v-model="currentTab">
    <el-tab-pane name="account">
      <template #label>
        <span class="custom-tabs-label">
          <el-icon><Avatar /></el-icon>
          <span>账号登录</span>
        </span>
      </template>
      <LoginAccount ref="accountRef"></LoginAccount>
    </el-tab-pane>
    <el-tab-pane name="phone">
      <template #label>
        <span class="custom-tabs-label">
          <el-icon><Iphone /></el-icon>
          <span>手机登录</span>
        </span>
      </template>
      <LoginPhone ref="phoneRef"></LoginPhone> 
    </el-tab-pane>
  </el-tabs>
  <div class="accountAction">
    <el-checkbox v-model="isKeepPassword" label="记住密码" size="large" />
    <el-link type="primary">忘记密码</el-link>
  </div>
    <el-button class="subForm" type="primary" @click="submitForm()">登录</el-button>
  </div>
</template>

<script lang="ts">
import { Avatar ,Iphone} from '@element-plus/icons-vue'
import { defineComponent ,ref} from 'vue'
import LoginAccount from './LoginAccount.vue'
import LoginPhone from './LoginPhone.vue'

export default defineComponent({
  components:{
    Avatar,
    Iphone,
    LoginAccount,
    LoginPhone
  },
  setup() {
    const isKeepPassword = ref(true)
    const currentTab = ref<string>('account')

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
    const phoneRef = ref<InstanceType<typeof LoginPhone>>() //拥有构造函数的实例（拿到类型->再拿到它对应的实例)

    function submitForm() {
      if(currentTab.value==='account'){
        console.log('账号立即登录',accountRef.value)
        accountRef.value?.loginAction(isKeepPassword.value)
      }else{
        console.log('手机立即登录',phoneRef.value)

      }
    }
    return {
      isKeepPassword,
      submitForm,
      accountRef,
      phoneRef,
      currentTab
    }
  }
})
</script>

<style scoped lang="less">
.accountAction{
  display: flex;
  justify-content: space-between;
}
.subForm{
  width: 100%;
}
.LoginPanel{
  // width: 80%;
  margin-bottom: 150px;
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
