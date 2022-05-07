<template>
  <div class="HelloWorld">
    <button class="btn" @click="go('hhh1')">标题1</button>
    <button class="btn" @click="go('hhh2')">标题2</button>
    <button class="btn" @click="go('hhh3')">标题3</button>
    <h1 id="hhh1" >标题一</h1>
    <p>段落</p>
    <p>段落</p>
    <p>段落</p>
    <p>段落</p>
    <p>段落</p>
    <p>段落</p>
    <p>段落</p>
    <p>段落</p>
    <p>段落</p>
    <p>段落</p>
    <p>段落</p>
    <p>段落</p>
    <p>段落</p>
    <p>段落</p>
    <p>段落</p>
    <p>段落</p>
    <p>段落</p>
    <p>段落</p>
    <p>段落</p>
    <p>段落</p>
    <p>段落</p>
    <h1 id="hhh2">标题2</h1>
    <p>段落</p>
    <p>段落</p>
    <p>段落</p>
    <p>段落</p>
    <p>段落</p>
    <p>段落</p>
    <p>段落</p>
    <p>段落</p>
    <p>段落</p>
    <p>段落</p>
    <p>段落</p>
    <p>段落</p>
    <p>段落</p>
    <p>段落</p>
    <p>段落</p>
    <p>段落</p>
    <p>段落</p>
    <p>段落</p>
    <p>段落</p>
    <p>段落</p>
    <p>段落</p>
    <p>段落</p>
    <p>段落</p>
    <p>段落</p>
    <p>段落</p>
    <p>段落</p>
    <h1 id="hhh3">标题3</h1>
    <p>段落</p>
    <p>段落</p>
    <p>段落</p>
    <p>段落</p>
    <p>段落</p>
    <p>段落</p>
    <p>段落</p>
    <p>段落</p>
    <p>段落</p>
    <p>段落</p>
    <p>段落</p>
    <p>段落</p>
    <p>段落</p>
    <p>段落</p>
    <p>段落</p>
    <p>段落</p>
    <p>段落</p>
    <div class="box" id="info-box">
    <p>段落</p>
        <h1>标题1-1</h1>
        <p>段落</p>

        <h1>标题1-2</h1>
        <p>段落</p>
        <h2>标题2-1</h2>
        <p>段落</p>
        <h2>标题2-2</h2>
        <p>段落</p>
        <h3>标题3-3</h3>
        <p>段落</p>
        <h3>标题3-4</h3>
        <p>段落</p>
        <h4>标题4-3</h4>
        <p>段落</p>
        <h5>标题5-2</h5>
        <p>段落</p>

        <h1>标题1-4</h1>
        <p>段落</p>
        <h2>标题2-3</h2>
        <p>段落</p>
        <h3>标题3-5</h3>
        <p>段落</p>
        <h3>标题3-6</h3>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, nextTick, onMounted } from 'vue'

import {useRouter} from 'vue-router'
import {htmlToHNode} from '../utils/htmlToHNode'

export default defineComponent({
  name: 'HelloWorld',
  setup(props, content) {
    const router=useRouter()
    onMounted(() => {
      console.log('hash',router)
    })

    const go = (id:string) => {
      //设置hash值,便于保留位置
      router.push('/test#'+id)
      var element = document.getElementById(id) as HTMLElement
      element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'end' })
    }
    return {
      go
    }
  },
})
</script>

<style scoped lang="less">
.btn{
  position: fixed;
  margin-left: 10px;
  top: 0;
  &:nth-child(2){
    left: 100px;
  }
  &:nth-child(3){
    left: 200px;
  }
}
</style>
