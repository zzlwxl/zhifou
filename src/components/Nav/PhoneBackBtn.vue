<template>
  <div class="PhoneBackBtn">
    <span class="back">
      <el-link @click="$router.go(-1)">返回</el-link>
    </span>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PhoneBackBtn',
  setup(props, content) {},
})
</script>

<style scoped lang="less">
.back{
  display: block;
}
@media screen and (min-width:600px) {
  .back{
    display: none;
  }
}
</style>
