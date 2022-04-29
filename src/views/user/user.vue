<template>
  <div class="user">
    <Nav :headImgUrl="userInfo ? userInfo.headImgUrl : ''"></Nav>
    <div class="userBox">
      <PhoneBackBtn></PhoneBackBtn>
      <div class="imgBox">
        <Avatar :headImgUrl="userInfo ? userInfo.headImgUrl : ''"></Avatar>
      </div>
      <el-descriptions title="用户信息" direction="vertical" :column="1" border>
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
        <el-button v-if="!userInfo.userIdWechat" type="primary" @click="changeBindWxDialogVisible">绑定微信</el-button>
        <el-button v-else type="primary" @click="unBindWx">解绑微信</el-button>
        <el-button type="primary" @click="completeUserInfoDialogVisible = true">编辑信息</el-button>
        <el-button type="primary" @click="$router.push('/setpwd')">修改密码</el-button>
      </div>
      <el-dialog v-model="completeUserInfoDialogVisible" :title="userInfo.firstLogin ? '请补充用户信息' : '更新用户信息'" width="95%" center>
        <ChangeUserInfo @changeDialogVisibleEmit="changeDialogVisible"></ChangeUserInfo>
      </el-dialog>
      <el-dialog v-model="bindWxDialogVisible" width="90%" center>
        <LoginPhone v-if="bindWxDialogVisible" :isViewBind="bindWxDialogVisible" :isBindWxFlag="true" @bindWxOkEmit="bindWxOk">
          <template v-slot:title> 绑定微信 </template>
        </LoginPhone>
      </el-dialog>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, computed} from 'vue'
import Nav from '../../components/Nav/Nav.vue'
import PhoneBackBtn from '../../components/Nav/PhoneBackBtn.vue'
import Avatar from './Avatar.vue'
import ChangeUserInfo from './ChangeUserInfo.vue'
import LoginPhone from '../login/cpns/LoginPhone.vue'

import { BindWx, UnBind } from '../../service/login/login'

import { useStore } from '../../store'
import { useRouter } from 'vue-router'

import message from '../../utils/message'

export default defineComponent({
  name: 'user',
  components: {
    ChangeUserInfo,
    Nav,
    Avatar,
    LoginPhone,
    PhoneBackBtn
  },
  setup(props, content) {
    const store = useStore()
    const userInfo = computed(() => store.state.user.userInfo)
    const completeUserInfoDialogVisible = ref(false)
    const bindWxDialogVisible = ref(false)
    if (store.state.user.userInfo.firstLogin) {
      //用户首次登录从未补充信息
      completeUserInfoDialogVisible.value = true
    }
    const changeDialogVisible = () => {
      completeUserInfoDialogVisible.value = false
    }
    //绑定微信
    async function bindWx(state: string) {
      const data = await BindWx(state)
      if (data.success) {
        message.success('绑定成功')
        bindWxDialogVisible.value = false
        userInfo.value.userIdWechat = true
      } else {
        message.warning(data.data)
      }
    }
    async function unBindWx() {
      const data = await UnBind()
      if (data.success) {
        message.success('解绑成功')
        userInfo.value.userIdWechat = false
      } else {
        message.warning(data.data)
      }
    }
    const bindWxOk = () => {
      message.success('绑定成功')
      bindWxDialogVisible.value = false
      userInfo.value.userIdWechat = true
    }
    const changeBindWxDialogVisible = () => {
      bindWxDialogVisible.value = true
    }
    return {
      userInfo,
      completeUserInfoDialogVisible,
      bindWxDialogVisible,
      changeDialogVisible,
      changeBindWxDialogVisible,
      bindWxOk,
      unBindWx,
    }
  },
})
</script>

<style scoped lang="less">
.userBox {
  width: 350px;
  margin: 50px auto;
}
.activeBox {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}
.imgBox {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
}
</style>
