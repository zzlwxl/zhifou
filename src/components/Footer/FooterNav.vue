<template>
  <div class="Footer">
    <div class="navBox">
      <el-button-group class="ml-4 btnNav">
        <slot name="one"> 
          <el-button @click="$router.push('/')" class="btn" size="large" :icon="House">首页</el-button>
        </slot>
        <slot name="two">
          <el-button class="btn" size="large" :icon="Wallet">
            <el-dropdown trigger="click">
              <span class="el-dropdown-link"> 操作 </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="$router.push('/create')" command="a" :icon="Edit">创建文章</el-dropdown-item>
                  <el-dropdown-item command="b" @click="searchDialogVisible = !searchDialogVisible" :icon="Search">搜索文章</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown></el-button>
        </slot>
        <slot name="three">
          <el-button @click="$router.push('/user')" class="btn" size="large" :icon="User">个人中心</el-button>
        </slot>
      </el-button-group>
    </div>
    <el-dialog v-model="searchDialogVisible" width="90%" center>
      <Serarch @isOkSearchEmit="isOkSearch" style="width=100%"></Serarch>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { House, Edit, User, Wallet, Search } from '@element-plus/icons-vue'

import Serarch from '../../components/Serarch/Search.vue'

export default defineComponent({
  name: 'FooterNav',
  components: {
    Serarch,
  },
  setup(props, content) {
    let searchDialogVisible = ref(false)
    const isOkSearch = () => {
      searchDialogVisible.value = false
    }
    return {
      House,
      Edit,
      User,
      Wallet,
      Search,
      searchDialogVisible,
      isOkSearch,
    }
  },
})
</script>

<style scoped lang="less">
.Footer {
  position: fixed;
  bottom: 0;
  z-index: 1001;
  width: 100%;
  .btn {
    width: 30%;
    margin-bottom: 5px;
  }
  .btnNav {
    width: 100%;
    display: flex;
    justify-content: space-around;
  }
  .navBox {
    display: flex;
    justify-content: space-around;
    background-color: rgb(237, 237, 237);
  }
  @media screen and (min-width: 1000px) {
    .navBox {
      display: none;
    }
  }
}
</style>
