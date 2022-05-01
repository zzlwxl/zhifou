<template>
  <div class="AuthorList">
    <template v-for="item in followsAllList">
      <AuthorCard :authorData="item">
        <template v-if="isInsertActive" #userActice>
          <span>动态</span>
        </template>
      </AuthorCard>
    </template>
    <div class="nullBox">
      <el-button :loading="loading" v-if="!isNullFollow" @click="getFollowsFun" color="#388e3c" style="color: white">加载更多</el-button>
      <el-button v-else :disabled="isNullFollow" color="#388e3c" style="color: white">已经到底</el-button>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AuthorCard from './AuthorCard.vue'

import { getFollows, getFans } from '../../../service/user/user'
import { IDataType } from '../../../service/user/type'

import message from '../../../utils/message'

export default defineComponent({
  name: 'AuthorList',
  props: {
    isInsertActive: {
      type: Boolean,
      default: true,
    },
    type: {
      type: String,
      default: 'default',
    },
  },
  components: {
    AuthorCard,
  },
  setup(props, content) {
    const isInsertActive = props.isInsertActive
    const route = useRoute()
    const router = useRouter()
    let current = 1
    let size = 10
    let followsAllList = ref<any>([])
    let isNullFollow = ref(false)
    let loading = ref(false)

    //获取关注和粉丝列表
    async function getFollowsFun() {
      loading.value = true
      let followsData!: IDataType
      switch (props.type) {
        case 'default':
          followsData = await getFollows({
            userId: route.params.userid + '',
            current,
            size,
            orderBy: 'createTime.desc',
          })
          break
        case 'fan':
          followsData = await getFans({
            userId: route.params.userid + '',
            current,
            size,
            orderBy: 'createTime.desc',
          })
          break
        default:
          isNullFollow.value=true
          return
      }
      if (followsData.success) {
        if (followsData.data.pages === followsData.data.current || followsData.data.pages===0) {
          isNullFollow.value = true
        }
        console.log('关注列表', followsData)
        current++
        loading.value = false
        followsAllList.value.push(...followsData.data.records)
      } else {
        message.error(followsData.data)
        loading.value = false
      }
    }
    onMounted(() => {
      getFollowsFun()
    })
    return {
      isInsertActive,
      getFollowsFun,
      followsAllList,
      isNullFollow,
      loading
    }
  },
})
</script>

<style scoped lang="less">
.nullBox {
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: center;
}
</style>
