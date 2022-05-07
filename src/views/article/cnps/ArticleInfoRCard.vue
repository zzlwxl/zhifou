<template>
  <div class="ArticleInfoRCard">
    <LRCard>
      <template #title> 目录 </template>
      <template #content>
        <el-tree :default-expand-all="true" :expand-on-click-node="false" v-if="cataData.success" :data="cataData.data.cataList" :props="defaultProps" @node-click="clickCata" />
        <p v-else>{{ cataData.msg }}</p>
      </template>
    </LRCard>
  </div>
</template>
<script lang="ts">
import { defineComponent, watchEffect } from 'vue'

import LRCard from '../../../components/LRCard/LRCard.vue'

export default defineComponent({
  name: 'ArticleInfoRCard',
  props: ['cataData'],
  emits:['clickCataEmit'],
  components: {
    LRCard,
  },
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
    const clickCata=(data:Tree)=>{
        content.emit('clickCataEmit',data.hName)
    }
    return{
        defaultProps,
        clickCata
    }
  },
})
</script>

<style scoped lang="less">
.ArticleInfoRCard{

}
@media screen and (min-width:800px) {
  .ArticleInfoRCard {
    position: fixed;
    margin-right: 10px;
    width: 340px;
    height: 100%;
    overflow:scroll;
  }
}
</style>
