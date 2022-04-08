<template>
  <div class='Category'>
    <div class="example-block">
    <span class="example-demonstration">Filterable (Single selection)</span>
    <el-cascader
      placeholder="Try searchingL Guide"
      :options="options"
      filterable
    />
  </div>
  <div class="example-block">
    <span class="example-demonstration">Filterable (Multiple selection)</span>
    <el-cascader
      placeholder="Try searchingL Guide"
      :options="options"
      :props="props"
      filterable
    />
  </div>
  </div>
</template>
<script lang='ts'>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Category',
  setup(props,content){
    
  }
})
</script>

<style scoped lang='less'>
.example-block {
  margin: 1rem;
}
.example-demonstration {
  margin: 1rem;
}
</style>