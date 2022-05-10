<template>
  <div class="ArticleInfoRCard">
    <LRCard>
      <template #title> 目录 </template>
      <template #content>
        <ArticleCataItem :cataData="cataData" @cataItemEmit="cataItemFun"></ArticleCataItem>
      </template>
    </LRCard>
  </div>
</template>
<script lang="ts">
import { defineComponent, watchEffect } from 'vue'

import LRCard from '../../../components/LRCard/LRCard.vue'
import ArticleCataItem from './ArticleCataItem.vue'

export default defineComponent({
  name: 'ArticleInfoRCard',
  props: ['cataData'],
  emits:['clickCataEmit'],
  components: {
    LRCard,
    ArticleCataItem
  },
  setup(props, content) {
    const cataItemFun=(hName:string)=>{
        content.emit('clickCataEmit',hName)
    }
    return{
        cataItemFun
    }
  },
})
</script>

<style scoped lang="less">
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
