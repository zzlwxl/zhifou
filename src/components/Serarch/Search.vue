<template>
  <div class="Serarch">
    <el-input @focus="showList" @keyup.enter.native="getSearchPage('search', searchValue, searchValue)" clearable v-model="searchValue" placeholder="搜索文章" style="bor" class="input-with-select">
      <template #append>
        <el-button @click="getSearchPage('search', searchValue, searchValue)" class="searchBtn" :icon="Search" />
      </template>
    </el-input>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'Serarch',
  emits: ['chilkSearchEmit', 'isOkSearchEmit'],
  setup(props, content) {
    let searchValue = ref<string>('')
    const router = useRouter()

    const showList=()=>{

    }
    const getSearchPage = (type: string, name: string, id: string) => {
      router.push({
        path: 'article',
        name: 'article',
        query: {
          name,
        },
        params: {
          type,
        },
      })
      searchValue.value = ''
      content.emit('chilkSearchEmit', name)
      content.emit('isOkSearchEmit')
    }
    return {
      Search,
      searchValue,
      getSearchPage,
      showList
    }
  },
})
</script>

<style scoped lang="less">
@col1: #2196f3;
@col2: #388e3c;
.Serarch {
  background-color: rgb(255, 255, 255);
  display: flex;
  align-items: center;
  width: 260px;
  .searchBtn {
    color: white;
    background-color: @col2;
    border-radius: 0 4px 4px 0;
  }
  .searchBtn:hover {
    background-color: @col1;
    color: white;
  }
}
</style>
