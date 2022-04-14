<template>
  <div>
  <router-view></router-view>
  <el-dialog v-model="centerDialogVisible" title="提示" width="60%" center>
      <h1>网站还在开发中...</h1>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="centerDialogVisible = false">我已经了解</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { defineComponent,ref } from 'vue';
import router from './router/index'

export default defineComponent({
  setup(){
    let centerDialogVisible=ref(true)
    return{
      centerDialogVisible
    }
  }
});
</script>
<style lang="less">

</style>
