<template>
  <div class="NavMenu">
    <el-button class="menuBtn" @click="drawer2 = true">
      <el-icon :size="size" :color="color"> <Expand /> </el-icon>菜单</el-button
    >
    <el-drawer size="50%" v-model="drawer2" direction="ltr">
      <template #title>
        <h4 class="text item" @click="getHome">首页</h4>
      </template>
      <template #default>
        <el-card v-for="group in categorysArray" :key="group.categoryId" class="box-card">
          <template #header>
            <div class="card-header">
              <span>{{ group.categoryName }}</span>
            </div>
          </template>
          <template v-if="group.children.length">
            <div @click="articleListByData('category', item.categoryName, item.categoryId)" v-for="item in group.children" :key="item.categoryId" class="text item">{{ item.categoryName }}</div>
          </template>
          <template v-else>
            <div class="text item">没有子分类</div>
          </template>
        </el-card>
      </template>
    </el-drawer>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { getCategorys } from '../../service/article/index'
import { Expand } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'NavMenu',
  components: {
    Expand,
  },
  emits: ['NavMenuSelectEmit'],
  setup(props, content) {
    const router = useRouter()
    const drawer2 = ref(false)
    let categorysArray = ref([])
    //获取分类
    async function categorys() {
      const data = await getCategorys()
      if (data.success) {
        categorysArray.value = data.data
      } else {
      }
    }
    categorys()
    const articleListByData = (type: string, name: string, id: string) => {
      content.emit('NavMenuSelectEmit', { type, name, id })
      drawer2.value = false
    }
    const getHome = () => {
      router.push('/')
      drawer2.value = false
    }
    return {
      drawer2,
      categorysArray,
      articleListByData,
      getHome,
    }
  },
})
</script>

<style scoped lang="less">
@col1: #2196f3;
@col2: #388e3c;
.menuBtn {
  width: 100%;
  border-radius: 0;
  border: 0;
  height: 100%;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
  color: @col1;
  overflow: hidden;
  cursor: pointer;
}
.item:hover {
  color: @col2;
}

.box-card {
  width: 480px;
}
</style>
