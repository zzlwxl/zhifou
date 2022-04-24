<template>
  <div class='Home'>
     <ul>
      <li v-for="item of msgList" :key="item.toUserId">
        <p>
          <span>{{item.toUserId}}</span>
        </p>
        <p>消息:{{item.contentText}}</p>
      </li>
    </ul>
    <input type="text" placeholder="输入消息" v-model="msg">
    <button @click="handleSendBtnClick">发送</button>
  </div>
</template>
<script>
import { defineComponent ,reactive,toRefs,onMounted} from 'vue'
import {useWebSocket} from '../../hooks'

export default defineComponent({
  name: 'Socket',
  setup(props,content){
    const ws=useWebSocket(handleMessage,'11')
    const state=reactive({
      msg:'',
      msgList:[]
    })
    let username=''
    onMounted(()=>{
      username=localStorage.getItem('username')
    })
    const handleSendBtnClick=() =>{
      ws.send(JSON.stringify({
        toUserId:'11',
        contentText:state.msg,
      }))
      state.msg=''
    }
    function handleMessage(e){
      let result = null;
        let msg=e
        const data=JSON.parse(e.data)
        console.log(data)
        state.msgList.push(data)
        // if (msg.data instanceof Blob) {
        //     const reader = new FileReader();
        //     reader.readAsText(msg.data, "UTF-8");
        //     reader.onload = (e) => {
        //         result = JSON.parse(reader.result);
        //         state.msgList.push(result)
        //     }
        // }
    }
    return{
      //平铺对象 msg=state.msg
      ...toRefs(state),
      handleSendBtnClick
    }
  }
})
</script>

<style scoped lang='less'>

</style>