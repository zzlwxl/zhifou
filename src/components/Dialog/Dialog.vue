<template>
  <div class="Dialog">
    <el-dialog v-model="centerDialogVisible" title="Warning" width="30%" center>
      <span>{{dialogInfo}}</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="centerDialogVisible = false">我已知晓</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { defineComponent ,ref} from 'vue'

export default defineComponent({
  name: 'Dialog',
  setup(props, content) {
      const centerDialogVisible = ref(false)
      const dialogInfo=ref()

      const changeDialog=(info:string)=>{
          console.log('ddd')
          centerDialogVisible.value=true
          dialogInfo.value=info
      }
      return{
          centerDialogVisible,
          changeDialog,
          dialogInfo
      }
  },
})
</script>

<style scoped lang="less"></style>
