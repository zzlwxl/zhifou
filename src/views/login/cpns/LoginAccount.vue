<template>
  <div class="LoginAccount">
    <el-form
    ref="ruleFormRef"
    :model="account"
    :rules="rules"
    class="demo-ruleForm"
  >
    <el-form-item label="账号" prop="userName">
      <el-input v-model="account.userName" />
    </el-form-item>
    <el-form-item label="密码" prop="passWord">
      <el-input
        v-model="account.passWord"
        type="password"
        show-password
      />
    </el-form-item>
  </el-form>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive,ref } from 'vue'
import type { FormInstance } from 'element-plus'
import localCache from '/Users/new/lean/view/vue3/cms/src/utils/cache'

import { rules } from '../config/account-config'

import {useStore} from 'vuex'

export default defineComponent({
  name: 'LoginAccount',
  setup(props, content) {
    const store = useStore()

    const account = reactive({
      userName: localCache.getCache('name') ?? '',
      passWord: localCache.getCache('password') ?? '',
    })
    const ruleFormRef = ref<FormInstance>()

    const loginAction = (isKeepPassword:boolean)=>{
      ruleFormRef.value?.validate((valid)=>{
        if(valid){
          //是否记住密码
          if(isKeepPassword){
            localCache.setCache('name',account.userName)
            localCache.setCache('password',account.passWord)
          }else{
            localCache.deleteCache('name')
            localCache.deleteCache('password')
          }
          //登录验证
          store.dispatch('login/accountLoginAction',{...account})
        }
      })
    } 
    return {
      account,
      rules,
      loginAction,
      ruleFormRef
    }
  },
})
</script>

<style scoped lang="less">

</style>
