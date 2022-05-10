<template>
  <div class="ArticleCataItem">
    <el-tree :default-expand-all="true" :expand-on-click-node="false" v-if="cataData.success" :data="cataData.data.cataList" :props="defaultProps" @node-click="clickCata" />
    <p v-else>{{ cataData.msg }}</p>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ArticleCataItem',
  props: ['cataData'],
  emits:['cataItemEmit'],
  setup(props, content) {
      interface Tree {
        hName:string,
        label: string,
        hType:string,
        children?: Tree[]
    }
    const defaultProps = {
      children: 'children',
      label: 'label',
    }
    const clickCata = (data: Tree) => {
      content.emit('cataItemEmit', data.hName)
    }

    return{
        clickCata,
        defaultProps
    }
  },
})
</script>

<style scoped lang="less"></style>
