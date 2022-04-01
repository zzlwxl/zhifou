<template>
<div class="navBox">
  <div class="Nav">
    <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
  >
    <el-menu-item>logo</el-menu-item>
    <el-menu-item index="1">Processing Center</el-menu-item>
    <el-sub-menu index="2">
      <template #title>Workspace</template>
      <el-menu-item index="2-1">item one</el-menu-item>
      <el-menu-item index="2-2">item two</el-menu-item>
      <el-menu-item index="2-3">item three</el-menu-item>
      <el-sub-menu index="2-4">
        <template #title>item four</template>
        <el-menu-item index="2-4-1">item one</el-menu-item>
        <el-menu-item index="2-4-2">item two</el-menu-item>
        <el-menu-item index="2-4-3">item three</el-menu-item>
      </el-sub-menu>
    </el-sub-menu>
    <el-menu-item index="3" disabled>Info</el-menu-item>
    <el-menu-item index="4">Orders</el-menu-item>
  </el-menu>
  </div>

</div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Avatar} from '@element-plus/icons-vue'

export default defineComponent({
  name: 'Nav',
  setup(props, content) {
    const activeIndex = ref('1')
    const handleSelect = (key: string, keyPath: string[]) => {
      console.log(key, keyPath)
    }

    return {
      activeIndex,
      handleSelect,
    }
  },
})
</script>

<style scoped lang="less">
.login{
  float: right !important;
}
</style>
