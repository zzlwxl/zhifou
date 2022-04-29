<template>
  <div class="AuthorCard">
    <div class="authorCardBox">
      <div class="avatar">
        <el-avatar src="" />
      </div>
      <div class="content">
        <div>身份</div>
        <span>昵称</span>
        <span>
        <slot name="userActice">
        </slot>
        </span>
      </div>
      <el-button style="margin-right: 4px" :type="true ? 'primary' : ''" round>取消关注</el-button>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AuthorCard',
  setup(props, content) {},
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
}
</style>
