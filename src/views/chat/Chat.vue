<template>
  <div class="chat">
    <div ref="innerRef" class="scorllBox">
      <div v-for="(item, index) in messageList" :key="index" class="item">
        <template v-if="item.data.user">
          <div :class="userId===item.data.user.userId ? 'topByUser' : 'top'">
            <div class="avaImg">
              <el-avatar :size="30" :src="item.data.user.headImgUrl" />
            </div>
            <span style="margin-left: 4px; margin-right: 4px">{{ item.data.user.nickName }}</span>
            <span style="margin-left: 4px">{{item.time}}</span>
          </div>
          <div :class="userId===item.data.user.userId ? 'msgByUser' : 'msg'">{{ item.data.message }}</div>
        </template>
      </div>
    </div>
       <el-button @click="goNewMessageFun" :class="isScroll ? 'showBtn' : 'noShowBtn'" type="danger" round>{{`未读消息${messageNum}`}}</el-button>
    <el-input @change="sendBtnFun" clearable v-model="msg" placeholder="发个消息" class="input-with-select">
      <template #append>
        <el-button @click="sendBtnFun" class="sendBtn" :icon="Promotion" />
      </template>
    </el-input>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed, ref, nextTick, onMounted } from 'vue'

import { MySocket } from '../../public/mySocket'
import { WsMsgType } from '../../public/type'

import { Promotion } from '@element-plus/icons-vue'

import { useStore } from '../../store/'

import { formatUtcAllString } from '../../utils/date'
import message from '../../utils/message'

export default defineComponent({
  name: 'LoginAccount',
  setup(props, content) {
    let msg = ref('')
    let messageList = ref<any>([])
    const innerRef = ref<HTMLDivElement>()
    const store=useStore()
    let userId=computed(()=>{
      return store.state.user.userInfo.userId
    })

    let scrollLen=0
    let messageNum=ref(0)
    let isScroll = ref(false)
    let isMouseover=(false)

    
    const init=()=>{
      isMouseover=false
      scrollLen=0
      messageNum.value=0
      isScroll.value=false
    }
    onMounted(()=>{
      innerRef.value!.addEventListener('mouseover',(e)=>{
      isMouseover=true
      })
      //滚动条滚动了
      innerRef.value!.addEventListener('scroll',(e)=>{
        if(isMouseover){
          isScroll.value=true
        }
      })
    })
    //回到最新的消息列表
    const goNewMessageFun=()=>{
      isScroll.value=false
      innerRef.value!.scrollTop=scrollLen
      messageNum.value=0
    }
    const callback = (data: any) => {
      if (data.event === WsMsgType.BROADCAST_MESSAGE) {
        messageList.value.push(data)
        nextTick(()=>{
          if(!isScroll.value){
            messageNum.value=0
            if(innerRef.value){
              
              innerRef.value!.scrollTop=innerRef.value!.scrollHeight
            }
          }else{
            messageNum.value++
            scrollLen=innerRef.value!.scrollHeight
          }
        })
      }
    }
    onMounted(() => {
      MySocket.funList.push(callback)
    })
    const sendBtnFun = () => {
      if (!msg.value) {
        return message.warning('请输入消息')
      }
      init()
      MySocket.sendMessage(msg.value)
      msg.value = ''
    }
    return {
      msg,
      sendBtnFun,
      Promotion,
      messageList,
      formatUtcAllString,
      innerRef,
      userId,
      isScroll,
      goNewMessageFun,
      messageNum
    }
  },
})
</script>

<style scoped lang="less">
@col1: #2196f3;
@col2: #388e3c;
@border: #ebebeb;
@fontCol: #777;
.chat{
  position: relative;
}
.scorllBox{
  height: 280px;
  overflow: scroll;
}
.showBtn{
  z-index: 1000;
  display: block;
}
.noShowBtn{
  display:none;
}
.sendBtn {
  color: white;
  background-color: @col2;
  border-radius: 0 4px 4px 0;
}
.sendBtn:hover {
  background-color: @col1;
  color: white;
}
.item {
  display: flex;
  flex-direction: column;
  margin-left: 4px;
  margin-right: 4px;
  margin-bottom: 12px;
  .msg {
    color: @fontCol;
    margin-left: 34px;
  }
    .top {
      display: flex;
      align-items: center;
      span {
        color: @fontCol;
      }
    }
  .topByUser{
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    span {
      color: @fontCol;
    }
  }
  .msgByUser{
    color: @fontCol;
    display: flex;
    flex-direction: row-reverse;
    margin-right: 34px;
  }
}
</style>
