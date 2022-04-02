<template>
  <div class="main">
    <header class="phoneNavBox">
      <nav>导航</nav>
      <span class="logo">logo</span>
      <span class="login">登录/注册</span>
    </header>
    <header class="navBox">
      <span class="logo">logo</span>
      <nav>导航</nav>
      <span class="login">登录/注册</span>
    </header>
    <button @click="login">登录</button>
    首页
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
// import router from '/Users/new/lean/view/vue3/cms/src/router/index'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'main',
  setup(props, content) {
    const router = useRouter()
    const login = () => {
      router.push('/login')
    }

    return {
      login,
    }
  },
})
</script>

<style scoped lang="less">

.navBox{
  display: none;
  background-color: red;
}
.phoneNavBox{
  display: flex;
  background-color: blue;
}
@media screen and (min-width: 800px){
    .phoneNavBox{
      display: none;
    }
    .navBox{
      display: flex;
    }
}
</style>
