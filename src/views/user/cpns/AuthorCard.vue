<template>
  <div class="AuthorCard">
    <div class="authorCardBox" @click="goAuthor">
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
        <FollowedItem :userInfo="authorData"></FollowedItem>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import {useRouter} from 'vue-router'

import { getById, follow, unFollow } from '../../../service/user/user'

import message from '../../../utils/message'

import FollowedItem from './FollowedItem.vue'

export default defineComponent({
  name: 'AuthorCard',
  props: ['authorData'],
  components:{
    FollowedItem
  },
  setup(props, content) {
    const router = useRouter()
    const goAuthor = () => {
      router.push({
        name: 'usermenu',
        path: '/usermenu',
        params: {
          userid: props.authorData.userId,
        },
      })
    }
    return{
      goAuthor
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
  cursor: pointer;
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
