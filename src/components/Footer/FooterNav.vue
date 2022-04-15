<template>
  <div class="Footer">
    <div class="navBox">
      <el-button-group class="ml-4 btnNav">
        <el-button @click="$router.push('/')" class="btn" size="large" :icon="House">首页</el-button>
        <el-button @click="$router.push('/create')" class="btn" size="large" :icon="Edit">创建文章</el-button>
        <el-button @click="$router.push('/user')" class="btn" size="large" :icon="User">个人中心</el-button>
      </el-button-group>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { House, Edit, User } from '@element-plus/icons-vue'

export default defineComponent({
  name: 'FooterNav',
  setup(props, content) {
    return {
      House,
      Edit,
      User,
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
  .btn{
    width: 30%;
    margin-bottom: 5px;
  }
  .btnNav{
    width: 100%;
    display: flex;
    justify-content: space-around;
  }
  .navBox {
    display: flex;
    justify-content: space-around;
    background-color: rgb(237, 237, 237);
  }
  @media screen and (min-width: 800px) {
    .navBox {
      display: none;
    }
  }
}
</style>
