<template>
  <div class="FollowedItem">
    <template v-if="userInfo.userId !== $store.state.user.userInfo.userId">
      <el-button v-if="!followed" @click.stop="followFun" color="#388e3c" style="color: white; margin-left: 4px" :type="true ? 'primary' : ''" round>关注</el-button>
      <el-button v-else @click.stop="unFollowFun" style="margin-left: 4px" :type="true ? 'primary' : ''" round>取消关注</el-button>
    </template>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, nextTick ,watchEffect} from 'vue'
import { useRoute } from 'vue-router'

import { follow, unFollow } from '../../../service/user/user'

import message from '../../../utils/message'

export default defineComponent({
  name: 'FollowedItem',
  props:['userInfo'],
  setup(props, content) {
    const route = useRoute()
    let followed = ref(false)
    //关注
    async function followFun() {
      const data = await follow(props.userInfo.userId + '')
      if (data.success) {
        followed.value = true
      } else {
        message.error(data.data)
      }
    }
    //取消关注
    async function unFollowFun() {
      const data = await unFollow(props.userInfo.userId + '')
      if (data.success) {
        console.log(data)
        followed.value = false
      } else {
        message.error(data.data)
      }
    }
    watchEffect(()=>{
        followed.value = props.userInfo.followed
    })
    return {
      followFun,
      unFollowFun,
      followed,
    }
  },
})
</script>

<style scoped lang="less"></style>
