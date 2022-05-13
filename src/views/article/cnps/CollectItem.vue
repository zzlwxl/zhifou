<template>
  <div class='Collect'>
    <div class="collect-box" @click="goAuthor" v-if="authorData">
      <div class="header">
        <div class="img-box"><el-avatar :size="50" :src="authorData.headImgUrl" /></div>
        <div class="info">{{authorData.nickName}}</div>
      </div>
      <div class="footer">
        <div>{{`被点赞 ${collectData.starNum} 个`}}</div>
        <div>{{`被访问 ${collectData.starNum} 次`}}</div>
        <div>{{`被评论 ${collectData.commentNum} 条`}}</div>
      </div>
    </div>
  </div>
</template>
<script lang='ts'>
import { defineComponent ,onMounted,ref,watchEffect} from 'vue'
import {useRouter} from 'vue-router'

import {getAuthorCollect} from '../../../service/user/user'

import message from '../../../utils/message'

export default defineComponent({
  name: 'CollectItem',
  props:['authorData'],
  setup(props,content){
    let collectData=ref({})
    const router = useRouter()
    async function getAuthorCollectFun() {
      const data=await getAuthorCollect(props.authorData.userId)
      if(data.success){
        collectData.value=data.data
      }else{
        message.error(data.data)
      }
    }
    watchEffect(()=>{
      if(props.authorData&&props.authorData.userId){
        getAuthorCollectFun()
      }
    })
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
      collectData,
      goAuthor
    }
  }
})
</script>

<style scoped lang='less'>
.collect-box{
  display: flex;
  flex-direction: column;
  cursor: pointer;
  .header{
    display: flex;
    align-items: center;
    .img-box{
      margin-right: 4px;
    }
  }
  .footer{
    display: flex;
    justify-content:space-between;
  }
}
</style>