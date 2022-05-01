<template>
  <div class="AuthorCard">
    <div class="authorCardBox">
      <div class="avatar">
        <el-avatar :src="authorData.headImgUrl" />
      </div>
      <div class="content">
        <div>身份</div>
        <span>{{ authorData.nickName }}</span>
        <span>
          <slot name="userActice"> </slot>
        </span>
      </div>
      <div class="active">
        <el-button v-if="!followed" @click.stop="followFun(authorData.userId)" color="#388e3c" style="color: white; margin-left: 4px" :type="true ? 'primary' : ''" round>关注</el-button>
        <el-button v-else @click.stop="unFollowFun(authorData.userId)" style="margin-left: 4px" :type="true ? 'primary' : ''" round>取消关注</el-button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

import { getById, follow, unFollow } from '../../../service/user/user'

import message from '../../../utils/message'

export default defineComponent({
  name: 'AuthorCard',
  props: ['authorData'],
  setup(props, content) {
    let followed = ref(props.authorData.followed)
    //关注
    async function followFun(userId: string) {
      const data = await follow(userId)
      if (data.success) {
        followed.value = true
      } else {
        message.error(data.data)
      }
    }
    //取消关注
    async function unFollowFun(userId: string) {
      const data = await unFollow(userId)
      if (data.success) {
        console.log(data)
        followed.value = false
      } else {
        message.error(data.data)
      }
    }
    return {
      followed,
      followFun,
      unFollowFun,
    }
  },
})
</script>

<style scoped lang="less">
@col1: #2196f3;
@col2: #388e3c;
@fontCol: #777;
.authorCardBox {
  width: 100%;
  height: 80px;
  background: rgb(255, 255, 255);
  border-radius: 10px;
  display: flex;
  align-items: center;
  margin-bottom: 1vw;
  font-size: 12px;
  .avatar {
    cursor: pointer;
    margin-left: 4px;
  }
  .content {
    flex: 1;
    display: flex;
    flex-direction: column;
    margin: 0 4px 0 4px;
  }
  .active {
    margin-right: 4px;
  }
}
</style>
