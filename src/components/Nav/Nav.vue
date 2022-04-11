<template>
  <div>
    <div class="main">
      <header class="phoneNavBox">
        <nav>
          <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-sub-menu :index="item.categoryId"  v-for="(item) in categorysArray" :key="item.categoryId">
              <template #title>{{ item.categoryName }}</template>
              <template v-if="item.children.length">
                <el-menu-item :index="item.categoryId" v-for="item in item.children" :key="item.categoryId">{{item.categoryName}}</el-menu-item>
              </template>
              <template v-else>
                <span class="nullCate">没有子分类</span>
              </template>
            </el-sub-menu>
          </el-menu>
        </nav>
        <span @click="$router.push('/')" class="logo">知<span>否</span></span>
        <span class="login">
          <el-link v-if="!userName" @click="$router.push('/login')">登录/注册</el-link>
        </span>
      </header>
      <header class="navBox">
        <span @click="$router.push('/')" class="logo">知<span>否</span></span>
        <nav>
          <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-sub-menu :index="item.categoryId"  v-for="(item) in categorysArray" :key="item.categoryId">
              <template #title>{{ item.categoryName }}</template>
              <template v-if="item.children.length">
                <el-menu-item @click="articleListByCate(item.categoryName,item.categoryId)" :index="item.categoryId" v-for="item in item.children" :key="item.categoryId">{{item.categoryName}}</el-menu-item>
              </template>
              <template v-else>
                <span class="nullCate">没有子分类</span>
              </template>
            </el-sub-menu>
          </el-menu>
        </nav>
        <Search></Search>
        <span class="login">
          <template v-if="userName">
            <div class="user-info">
              <el-dropdown size="small" type="primary">
                <el-avatar :size="30" :src="$store.state.user.userInfo.headImgUrl" />
                <template #dropdown>
                  <el-dropdown-menu>
                    <div style="margin: 5px; text-align: center">
                      {{ userName }}
                    </div>
                    <el-dropdown-item @click="$router.push('/user')">个人中心</el-dropdown-item>
                    <el-dropdown-item @click="$router.push(`/article/user/${$store.state.user.userInfo.userId}`)">文章管理</el-dropdown-item>
                    <el-dropdown-item @click="outLogin">退出登录</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
            <el-button @click="$router.push('/create')" color="#388e3c" style="color: white" round>创作文章</el-button>
          </template>
          <template v-else>
            <el-link @click="$router.push('/login')">登录/注册</el-link>
          </template>
        </span>
      </header>
    </div>
    <div class="mainBottom"></div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, computed, ref, reactive, watchEffect } from 'vue'
import Search from '../Serarch/Search.vue'
import { useRouter } from 'vue-router'
import { Edit } from '@element-plus/icons-vue'
import { getCategorys } from '../../service/article/index'
import {logout} from '../../service/user/user'
import localCache from '../../utils/cache'
import { useStore } from 'vuex'
import {ElMessage} from 'element-plus'

export default defineComponent({
  name: 'main',
  components: {
    Edit,
    Search
  },
  setup(props, content) {
    const router = useRouter()
    const store = useStore()

    let categorysArray = ref([])

    async function categorys() {
      const data = await getCategorys()
      if (data.success) {
        categorysArray.value = data.data
      } else {
      }
    }
    categorys()
    const articleListByCate=(categoryName:string,categoryId:string)=>{
      console.log(categoryName,categoryId)
      router.push(`/article/articlebycate/${categoryId}`)
    }

    function userInfo() {
      console.log(store.state.login.token)
      if (store.state.login.token || localCache.getCache('token')) {
        store.dispatch('user/getUserInfoAction')
      }
    }
    onMounted(() => {
      userInfo()
    })

    const userName = computed(() => {
      return store.state.user.userInfo.userName
    })
    async function out() {
      const data = await logout()
      if(data.success){
        localCache.deleteCache('token')
        store.commit('user/changeUserInfo', {})
        router.push('/')
        ElMessage.success(data.data)
      }else{
        ElMessage.warning(data.data)
      }
    }
    const outLogin = () => {
      out()
    }
    return {
      userName,
      outLogin,
      categorysArray,
      articleListByCate
    }
  },
})
</script>

<style scoped lang="less">
@col1: #2196f3;
@col2: #388e3c;
.mainBottom {
  height: 38px;
}
.main {
  position: fixed;
  width: 100%;
  z-index: 1000;
}
.navBox {
  display: none;
}
.nullCate{
  color: rgb(110, 110, 110);
  margin-left: 10px;
}
.phoneNavBox {
  .el-menu--horizontal {
    border-bottom: 0px;
  }
  nav{
    margin-top: 10px;
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
    cursor: pointer;
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
  .mainBottom {
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
      cursor: pointer;
      span {
        color: @col2;
      }
    }
    .login {
      display: flex;
      justify-content: space-around;
      align-items: center;
      background-color: rgb(255, 255, 255);
      width: 16%;
    }
    nav {
      flex: 1;
    }
    .create-article {
      padding: 5px;
      background-color: @col2;
      border-radius: 20px 5px 20px 5px;
      color: rgb(255, 255, 255);
    }
  }
}
</style>
