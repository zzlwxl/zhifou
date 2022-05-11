<template>
  <div class='LRCard'>
    <el-scrollbar max-height="400px">
    <div class="cardBox">
      <div class="title">
        <slot name="title">标题</slot>
      </div>
      <div class="content">
        <slot name="content">
          文本
        </slot>
      </div>
    </div>
    </el-scrollbar>
  </div>
</template>
<script lang='ts'>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'LRCard',
  setup(props,content){
    
  }
})
</script>

<style scoped lang='less'>
@fontCol: #777;
@borderCol: rgb(221, 221, 221);
@col1: #2196f3;
@col2: #388e3c;
.cardBox{
  border-radius: 10px;
  background-color: #fff;
  margin-bottom: 8px;
  padding: 4px;
  .title{
    color: @col2;
    border-bottom: 1px solid @borderCol;
    margin-bottom: 4px;
    font-size: 16px;
  }
}
</style>