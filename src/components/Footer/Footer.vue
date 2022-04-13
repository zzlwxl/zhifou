<template>
  <div class="Footer">
    <div class="mainTop"></div>
    <footer class="main">
      <el-tabs  tab-position="bottom" class="demo-tabs">
        <el-tab-pane label="User">d</el-tab-pane>
        <el-tab-pane label="Config"></el-tab-pane>
        <el-tab-pane label="Role"></el-tab-pane>
        <el-tab-pane label="Task"></el-tab-pane>
      </el-tabs>
    </footer>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Footer',
  setup(props, content) {},
})
</script>

<style scoped lang="less">
.mainTop {
  height: 28px;
}
.main {
  position: fixed;
  bottom: 0;
  width: 100%;
}
.demo-tabs{
    width: 100%;
    display: flex;
    justify-content: space-around;
}
.demo-tabs > .el-tabs__content{
    // background-color: blue;
}
.el-tabs .el-tabs--bottom .demo-tabs{
    display: none;
}
@media screen and (min-width: 800px) {
  .main {
    display: none;
  }
}
</style>
