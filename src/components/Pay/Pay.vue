<template>
  <div class="Pay-box">
    <div class="Pay-box">
      <h1 class="title">赞助我们!</h1>
      <div class="radio">
        <el-radio-group v-model="radio" size="large">
          <el-radio-button label="支付宝" />
          <el-radio-button label="微信" />
        </el-radio-group>
      </div>
      <div class="pay">
        <el-input-number  v-model="num" :precision="2" :step="0.1" :max="10" />
        <el-button style="margin-top:10px" type="primary" @click="payFun">支付</el-button>
      </div>
      <img :src="payImg" alt="" />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

import { aliPay, wxPay } from '../../service/pay/index'
import { IDataType } from '../../service/pay/type'

import message from '../../utils/message'

export default defineComponent({
  name: 'Pay',
  setup(props, content) {
    let radio = ref('支付宝')
    let num = ref(1)
    let payImg = ref('')
    async function getPay() {
      let data: IDataType
      if (radio.value === '支付宝') {
        data = await aliPay({ title: '赞助', totalAmount: num.value })
      } else {
        data = await wxPay({ title: '赞助', totalAmount: num.value })
      }
      if (data.success) {
        console.log(data)
        payImg.value = data.data.img
      } else {
        message.error(data.data)
      }
    }
    const payFun = () => {
      getPay()
    }
    return {
      radio,
      num,
      payFun,
      payImg,
    }
  },
})
</script>

<style scoped lang="less">
.Pay-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  .radio{
      margin: 10px;
  }
  .pay {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
