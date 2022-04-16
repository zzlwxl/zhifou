<template>
  <div class='HelloWorld'>
    <el-button class="menuBtn" @click="drawer2 = true">
      <el-icon :size="size" :color="color"> <Expand /> </el-icon>菜单</el-button
    >
    <div class="drawerBox">
    <el-drawer custom-class="drawer" size="50%" v-model="drawer2" direction="ttb">
    </el-drawer>

    </div>
  </div>
</template>
<script lang='ts'>
import { defineComponent ,ref} from 'vue'

export default defineComponent({
  name: 'HelloWorld',
  setup(props,content){
    const drawer2 = ref(false)

    return{
      drawer2
    }
  }
})
</script>

<style scoped lang='less'>

</style>