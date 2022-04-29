<template>
  <div class='AuthorInfo'>
    <el-descriptions direction="vertical" column="1" size="24" border>
        <el-descriptions-item label="博主信息">
            <el-avatar :size="50" :src="userInfo.headImgUrl" />
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

import {getById} from '../../../service/user/user'

export default defineComponent({
  name: 'AuthorInfo',
  props:['userId'],
  setup(props,content){
    const userInfo=ref({})

    async function getByIdFun() {
        const data=await getById(props.userId)
        nextTick(()=>{
            userInfo.value=data.data
        })
    }

    onMounted(()=>{
        getByIdFun()
    })

    return{
        userInfo
    }
  }
})
</script>

<style scoped lang='less'>

</style>