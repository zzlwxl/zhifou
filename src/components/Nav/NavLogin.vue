<template>
  <div class='NavLogin'>
    <el-button type="text" @click="btnLogin">登录</el-button>
  </div>
</template>
<script lang='ts'>
import { defineComponent } from 'vue'
import router from '../../router/index'

export default defineComponent({
  name: 'NavLogin',
  setup(props,content){
    const btnLogin=()=>{
        router.push('/login')
    }

    return{
        btnLogin
    }
  }
})
</script>

<style scoped lang='less'>
.NavLogin{
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>