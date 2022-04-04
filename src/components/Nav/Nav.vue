<template>
<div>
  <div class="main">
    <header class="phoneNavBox">
      <nav>
        <el-menu :default-active="activeIndex" class="el-menu-demo " mode="horizontal" @select="handleSelect">
          <el-menu-item index="1">sd</el-menu-item>
          <el-sub-menu index="2">
            <template #title>Workspace</template>
            <el-menu-item index="2-1">item one</el-menu-item>
            <el-menu-item index="2-2">item two</el-menu-item>
            <el-menu-item index="2-3">item three</el-menu-item>
            <el-sub-menu index="2-4">
              <template #title>item four</template>
              <el-menu-item index="2-4-1">item one</el-menu-item>
              <el-menu-item index="2-4-2">item two</el-menu-item>
              <el-menu-item index="2-4-3">item three</el-menu-item>
            </el-sub-menu>
          </el-sub-menu>
          <el-menu-item index="4">Orders</el-menu-item>
        </el-menu>
      </nav>
      <span class="logo">知<span>否</span></span>
      <span class="login">
        <el-link @click="loginOfUserInfo">{{userName ? userName : '登录/注册'}} </el-link>
      </span>
    </header>
    <header class="navBox">
      <span class="logo">知<span>否</span></span>
      <nav>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-menu-item index="1">Processing Center</el-menu-item>
          <el-sub-menu index="2">
            <template #title>Workspace</template>
            <el-menu-item index="2-1">item one</el-menu-item>
            <el-menu-item index="2-2">item two</el-menu-item>
            <el-menu-item index="2-3">item three</el-menu-item>
            <el-sub-menu index="2-4">
              <template #title>item four</template>
              <el-menu-item index="2-4-1">item one</el-menu-item>
              <el-menu-item index="2-4-2">item two</el-menu-item>
              <el-menu-item index="2-4-3">item three</el-menu-item>
            </el-sub-menu>
          </el-sub-menu>
          <el-menu-item index="4">Orders</el-menu-item>
        </el-menu>
      </nav>
      <span class="login">
        <el-link @click="loginOfUserInfo">{{userName ? userName : '登录/注册'}} </el-link>
      </span>
    </header>
  </div>
  <div class="mainBottom"></div>
</div>
</template>
<script lang="ts">
import { defineComponent,ref } from 'vue'
import { useRouter } from 'vue-router'
import { Edit } from '@element-plus/icons-vue'
import {GetUserInfo} from '../../service/user/user'
import localCache from '../../utils/cache'

export default defineComponent({
  name: 'main',
  components: {
    Edit,
  },
  setup(props, content) {
    const router = useRouter()
    const userName=ref()
    const login = () => {
      router.push('/login')
    }
    async function UserInfo(){
      console.log('获取用户信息',localCache.getCache('token'))
      if(localCache.getCache('token')){
        const userData = await GetUserInfo()
        console.log('userData',userData)
        if(userData.success){
          userName.value=userData.data.userName
        }
      }
    }
    UserInfo()
    const loginOfUserInfo=()=>{
      if(userName.value){
        router.push('/user')
      }else{
        router.push('/login')
      }
    }
    return {
      login,
      userName,
      loginOfUserInfo
    }
  },
})
</script>

<style scoped lang="less">
@col1: #2196f3;
@col2: #388e3c;
.mainBottom{
  height: 28px;
}
.main{
  position: fixed;
  width: 100%;
}
.navBox {
  display: none;
  background-color: red;
}
.phoneNavBox {
 .el-menu--horizontal {
    border-bottom: 0px;
}
  .logo {
    flex: 1;
    background-color: green;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    color: @col1;
    font-size: 25px;
      width: 20%;
    span {
      color: @col2;
    }
  }
  display: flex;
  .login {
    width: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
  }
  nav {
    width: 20%;
    
  }
}
@media screen and (min-width: 800px) {
  .mainBottom{
  height: 58px;
}
  .phoneNavBox {
    display: none;
  }
  .el-menu--horizontal {
    border-bottom: 1px solid @col2;
}
  .navBox {
    display: flex;
    .logo {
      width: 10%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #fff;
      color: @col1;
      font-size: 25px;
      span {
        color: @col2;
      }
    }
    .login {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #fff;
      width: 10%;
    }
    nav {
      flex: 1;
      background-color: rgb(1, 192, 255);
    }
  }
}
</style>
