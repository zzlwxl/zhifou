<template>
  <div>
    <div class="main">
      <header class="phoneNavBox">
        <nav>
          <NavMenu @NavMenuSelectEmit="NavMenuSelect"></NavMenu>
        </nav>
        <span @click="$router.push('/')" class="logo">知<span>否</span></span>
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
                    <el-dropdown-item @click="articleListByData('user', $store.state.user.userInfo.nickName)">文章管理</el-dropdown-item>
                    <el-dropdown-item @click="outLogin">退出登录</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
          </template>
          <template v-else>
            <el-link @click="$router.push('/login')">登录/注册</el-link>
          </template>
        </span>
      </header>
      <header class="navBox">
        <span @click="$router.push('/')" class="logo">知<span>否</span></span>
        <nav>
          <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-sub-menu :index="item.categoryId" v-for="item in categorysArray" :key="item.categoryId">
              <template #title>{{ item.categoryName }}</template>
              <template v-if="item.children.length">
                <el-menu-item @click="articleListByData('category', item.categoryName, item.categoryId)" :index="item.categoryId" v-for="item in item.children" :key="item.categoryId">{{ item.categoryName }}</el-menu-item>
              </template>
              <template v-else>
                <span class="nullCate">没有子分类</span>
              </template>
            </el-sub-menu>
          </el-menu>
          <!-- <HelloWorld></HelloWorld> -->
        </nav>
        <div class="orther"></div>
        <Search @chilkSearchEmit="chilkSearch"></Search>
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
                    <el-dropdown-item @click="articleListByData('user', $store.state.user.userInfo.nickName)">文章管理</el-dropdown-item>
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
import NavMenu from './NavMenu.vue'
import HelloWorld from '../HelloWorld.vue'
import { useRouter } from 'vue-router'
import { Edit } from '@element-plus/icons-vue'
import { getCategorys } from '../../service/article/index'
import { logout } from '../../service/user/user'
import localCache from '../../utils/cache'
import { useStore } from 'vuex'
import { NavMenuEmitData } from './types'

import message from '../../utils/message'

export default defineComponent({
  name: 'main',
  components: {
    Edit,
    Search,
    NavMenu,
    HelloWorld,
  },
  emits: ['chilkEmit'],
  setup(props, content) {
    const router = useRouter()
    const store = useStore()

    let categorysArray = ref([])
    async function categorys() {
      const data = await getCategorys()
      if (data.success) {
        categorysArray.value = data.data
      } else {
        message.warning(data.data)
      }
    }
    categorys()
    /**
     * type:通过什么类型请求数据
     * name:在URL地址栏中向用户展示查询条件
     * id:请求数据的参数
     */
    const articleListByData = (type: string, name: string, id: string) => {
      router.push({
        name: 'article',
        path: '/article',
        query: {
          name,
          id,
        },
        params: {
          type,
        },
      })
      emitFun(id)
    }
    /**
     * 移动端导航的传值,并且要调用nav的articleListByData
     */
    const NavMenuSelect = (data: NavMenuEmitData) => {
      articleListByData(data.type, data.name, data.id)
    }

    /**
     * data请求数据的参数
     */
    const emitFun = (data: string) => {
      content.emit('chilkEmit', { data })
    }
    /**
     * 因为搜索组件是Articlelist的孙组件,需要三个组件来传值
     */
    const chilkSearch = (value: string) => {
      emitFun(value)
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
      if (data.success) {
        localCache.deleteCache('token')
        store.commit('user/changeUserInfo', {})
        router.push('/')
        message.success(data.data)
      } else {
        message.warning(data.data)
      }
    }
    const outLogin = () => {
      out()
    }
    return {
      userName,
      outLogin,
      categorysArray,
      articleListByData,
      chilkSearch,
      NavMenuSelect,
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
.nullCate {
  color: rgb(110, 110, 110);
  margin-left: 10px;
}
.phoneNavBox {
  background-color: #fff;
  .el-menu--horizontal {
    border-bottom: 0px;
  }
  nav {
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
    border-bottom: 1px solid #ffffff;
  }
  .navBox {
    display: flex;
    .logo {
      width: 10%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: rgb(255, 255, 255);
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
      // flex: 1;
      width: 5%;
      height: 40px;
      display: flex;
      background-color: rgb(255, 255, 255);
    }
    .orther {
      flex: 1;
      background-color: #fff;
    }
    .create-article {
      padding: 5px;
      background-color: @col2;
      border-radius: 20px 5px 20px 5px;
      color: rgb(255, 255, 255);
    }
    .el-sub-menu__title {
      padding: 9px 19px !important;
    }
  }
}
</style>
