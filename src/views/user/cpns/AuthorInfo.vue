<template>
  <div class='AuthorInfo'>
    <el-descriptions direction="vertical" :column="1" border>
        <el-descriptions-item>
          <template #label>
            <div class="label-box"><span>博主信息</span><FollowedItem :userInfo="userInfo"></FollowedItem></div>
          </template>
          <div class="imgTopBox">
            <el-avatar :size="50" :src="userInfo.headImgUrl" />
          </div>
        </el-descriptions-item>
        <el-descriptions-item label="昵称">{{ userInfo.nickName }}</el-descriptions-item>
        <el-descriptions-item label="性别">
          <el-tag v-if="userInfo.sex === '男'" class="ml-2" type="success">男</el-tag>
          <el-tag v-else-if="userInfo.sex === '女'" class="ml-2" type="danger">女</el-tag>
          <el-tag v-else class="ml-2" type="info">保密</el-tag>
        </el-descriptions-item>
      </el-descriptions>
  </div>
</template>
<script lang='ts'>
import { defineComponent,onMounted,ref,nextTick} from 'vue'
import {useRoute} from 'vue-router'
import { useStore } from '../../../store/'

import FollowedItem from './FollowedItem.vue'

import {getById,follow,unFollow} from '../../../service/user/user'


export default defineComponent({
  name: 'AuthorInfo',
  props:['userId'],
  components:{
    FollowedItem
  },
  setup(props,content){
    const route = useRoute()
    const userInfo=ref({})
   
    async function getByIdFun() {
        const data=await getById(route.params.userid+'')
        nextTick(()=>{
            userInfo.value=data.data
        })
    }
    
    onMounted(()=>{
        getByIdFun()
    })

    return{
        userInfo,
    }
  }
})
</script>

<style scoped lang='less'>
.imgTopBox{
  display: flex;
  align-items: center;
  justify-content:space-between;
}
.label-box{
  display: flex;
  align-items: center;
}
</style>