<template>
  <div class="chat">
    <div ref="innerRef" class="scorllBox">
      <div v-for="(item, index) in messageList" :key="index" class="item">
        <template v-if="item.data.user">
          <div :class="userId===item.data.user.userId ? 'topByUser' : 'top'">
            <div style="cursor: pointer;" @click.stop="goAuthor(item.data.user.userId)" class="avaImg">
              <el-avatar :size="30" :src="item.data.user.headImgUrl" />
            </div>
            <span @click.stop="goAuthor(item.data.user.userId)" style="margin-left: 4px; margin-right: 4px;cursor: pointer;">{{ item.data.user.nickName }}</span>
            <span style="margin-left: 4px ; font-size: 12px;">{{item.time}}</span>
          </div>
          <div :class="userId===item.data.user.userId ? 'msgByUser' : 'msg'">{{ item.data.message }}</div>
        </template>
      </div>
    </div>
    <div class="btnBox">
       <el-button v-if="messageNum" @click="goNewMessageFun" :class="isScroll ? 'showBtn' : 'noShowBtn'" type="primary" round>{{`未读消息${messageNum}`}}</el-button>
    </div>
    <el-input @keyup.enter.native="sendBtnFun" clearable v-model="msg" placeholder="发个消息" class="input-with-select">
      <template #append>
        <el-button @click.stop="sendBtnFun" class="sendBtn" :icon="Promotion" />
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
import { useRouter } from 'vue-router'

import { formatUtcAllString } from '../../utils/date'
import message from '../../utils/message'

import {GetMsg} from '../../service/word/word'

export default defineComponent({
  name: 'LoginAccount',
  setup(props, content) {
    let msg = ref('')
    let messageList = ref<any>([])
    const innerRef = ref<HTMLDivElement>()
    const store=useStore()
    const router = useRouter()
    let userId=computed(()=>{
      return store.state.user.userInfo.userId
    })

    let scrollLen=0
    let messageNum=ref(0)
    let isScroll = ref(false)
    let isMouseover=(false)

    
    const init=()=>{
      scrollLen=0
      messageNum.value=0
      isScroll.value=false
    }
    //获取历史世界消息
    async function getMsgFun() {
      const data=await GetMsg()
      if(data.success){
        messageList.value=data.data
        nextTick(()=>{
          innerRef.value!.scrollTop=innerRef.value!.scrollHeight
        })
      }else{
        message.error(data.data)
      }
    }
    onMounted(()=>{
      getMsgFun()
      //监听pc端鼠标经过,当用户鼠标经过并且又监听到滚动条滚动了,则视为用户在翻记录
      innerRef.value!.addEventListener('mouseover',(e)=>{
      isMouseover=true
      })
      //监听手机端滚动,只要滚动就代表用户已经在翻记录了(滚动条也会跟着滚动)
      innerRef.value!.addEventListener('scroll',(e)=>{
      isMouseover=true
      })
      //滚动条滚动了
      innerRef.value!.addEventListener('scroll',(e)=>{
        if(isMouseover){
          if(innerRef.value!.scrollHeight-innerRef.value!.scrollTop<300){
            init()
          }else {
            isScroll.value=true
          }
        }
      })
    })
    //回到最新的消息列表
    const goNewMessageFun=()=>{
      innerRef.value!.scrollTop=scrollLen
      init()
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
      if (!store.state.user.userInfo.userId) {
        router.push('/login')
        return
      }
      if (!msg.value) {
        return message.warning('请输入消息')
      }
      init()
      MySocket.sendMessage(msg.value)
      msg.value = ''
    }
    const goAuthor=(userid:string)=>{
      router.push({
        name:'usermenu',
        path:'/usermenu',
        params:{
          userid
        }
      })
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
      messageNum,
      goAuthor
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
  overflow-x: hidden;
  overflow-y: auto;
}
.btnBox{
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 4px;
}
.showBtn{
  z-index: 1000;
  display: block;
}
.noShowBtn{
  display:none;
}
.sendBtn {
  color: white !important;
  background-color: @col1 !important;
  border-radius: 0 4px 4px 0;
}
.sendBtn:hover {
  background-color: @col2 !important;
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
