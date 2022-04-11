<template>
  <div class="user">
    <Nav :headImgUrl="userInfo ? userInfo.headImgUrl : ''"></Nav>
    <div class="userBox">
      <span class="back">
    <el-link @click="$router.go(-1)">返回</el-link>
    </span>
     <div class="imgBox">
       <Avatar :headImgUrl="userInfo ? userInfo.headImgUrl : ''"></Avatar>
     </div>
    <el-descriptions title="用户信息" direction="vertical" column="1" size="24" border>
      <el-descriptions-item label="用户名">{{ userInfo.userName }}</el-descriptions-item>
      <el-descriptions-item label="昵称">{{ userInfo.nickName }}</el-descriptions-item>
      <el-descriptions-item label="手机号" :span="2">{{ userInfo.phoneNum }}</el-descriptions-item>
      <el-descriptions-item label="性别">
        <el-tag v-if="userInfo.sex === '男'" class="ml-2" type="success">男</el-tag>
        <el-tag v-else-if="userInfo.sex === '女'" class="ml-2" type="danger">女</el-tag>
        <el-tag v-else class="ml-2" type="info">未知</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="邮箱">{{ userInfo.email }} </el-descriptions-item>
    </el-descriptions>
    <div class="activeBox">
    <el-button type="primary" @click="centerDialogVisible=true">编辑信息</el-button>
    <el-button type="primary" @click="$router.push('/setpwd')">修改密码</el-button>
    </div>
    <el-dialog v-model="centerDialogVisible" :title="userInfo.firstLogin ? '首次登录，请补充用户信息' : '更新用户信息'" width="80%" center>
      <ChangeUserInfo @changeDialogVisibleEmit="changeDialogVisible"></ChangeUserInfo>
    </el-dialog>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref,computed } from 'vue'
import Nav from '../../components/Nav/Nav.vue'
import Avatar from './Avatar.vue'
import ChangeUserInfo from './ChangeUserInfo.vue'

import { useStore } from '../../store/'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'user',
  components: {
    ChangeUserInfo,
    Nav,
    Avatar
  },
  setup(props, content) {
    const store = useStore()
    const userInfo = computed(()=>store.state.user.userInfo)
    const centerDialogVisible=ref(false)
    if(store.state.user.userInfo.firstLogin){
      //用户首次登录从未补充信息
      centerDialogVisible.value=true
    }
    const changeDialogVisible=()=>{
      console.log('事件')
      centerDialogVisible.value=false
      
    }
    return {
      userInfo,
      centerDialogVisible,
      changeDialogVisible
    }
  },
})
</script>

<style scoped lang="less">
.userBox {
  width: 350px;
  margin: 50px auto;
}
.activeBox{
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}
.imgBox{
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
}
</style>
