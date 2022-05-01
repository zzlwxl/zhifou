<template>
  <div class='AuthorInfo'>
    <el-descriptions direction="vertical" :column="1" border>
        <el-descriptions-item>
          <template #label>
            博主信息
            <el-button v-if="!followed" @click.stop="followFun" color="#388e3c" style="color: white ;margin-left: 4px" :type="true ? 'primary' : ''" round>关注</el-button>
            <el-button v-else @click.stop="unFollowFun" style="margin-left: 4px" :type="true ? 'primary' : ''" round>取消关注</el-button>
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

import {getById,follow,unFollow} from '../../../service/user/user'
import message from '../../../utils/message'

export default defineComponent({
  name: 'AuthorInfo',
  props:['userId'],
  setup(props,content){
    const route = useRoute()
    const userInfo=ref({})
    let followed=ref(false)
    async function getByIdFun() {
        const data=await getById(route.params.userid+'')
        nextTick(()=>{
            userInfo.value=data.data
            followed.value=data.data.followed
        })
    }
    //关注 
    async function followFun() {
      const data=await follow(route.params.userid+'')
      if(data.success){
        followed.value=true
      }else{
        message.error(data.data)
      }
    }
    //取消关注
    async function unFollowFun() {
      const data=await unFollow(route.params.userid+'')
      if(data.success){
        console.log(data)
        followed.value=false
      }else{
        message.error(data.data)
      }
    }
    onMounted(()=>{
        getByIdFun()
    })

    return{
        userInfo,
        followFun,
        unFollowFun,
        followed
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
</style>