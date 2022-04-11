<template>
  <div class="Category">
    <el-form label-width="120px" class="demo-userInfoForm" :size="formSize">
      <el-form-item id="create-cate-input" label="文章分类">
        <div class="selectBox">
        <el-input v-model="changeCateForm.categoryName" class="selectInput" disabled placeholder="Please input" />
        <el-select class="selectDiy" v-if="changeCateInputView" @change="changeCate" v-model="changeCateForm" placeholder="Select">
          <el-option-group v-for="group in categorysArray" :key="group.categoryId" :label="group.categoryName">
            <template v-if="group.children.length">
              <el-option v-for="item in group.children" :key="item.categoryId" :label="item.categoryName" :value="item" />
              <el-button @click="createCateDialog(group.categoryId)" color="#388e3c" style="color: white; margin-left: 5px" size="small" :icon="Edit" round>创建子分类</el-button>
            </template>
            <template v-else>
              <div class="nullCate">没有子分类</div>
              <el-button @click="createCateDialog(group.categoryId)" color="#388e3c" style="color: white; margin-left: 5px" size="small" :icon="Edit" round>创建子分类</el-button>
            </template>
          </el-option-group>
        </el-select>
        </div>
      </el-form-item>
    </el-form>
    <el-dialog @close="changeCateInputView = true" v-model="centerDialogVisible" title="创建子分类" width="56%" center>
      <CreageCate :parentCateId="createCateParentID" @createOKCateEmit="createOKCate"></CreageCate>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref ,watchEffect} from 'vue'
import { getCategorys } from '../../service/article/index'
import { Edit } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import CreageCate from './CreateCate.vue'
// import {defaultCateID} from './config/defaultCateID'
import type { FormInstance } from 'element-plus'

export default defineComponent({
  name: 'Category',
  components: {
    CreageCate,
  },
  emits: ['changeCateEmit'],
  setup(props, content) {
    let categorysArray = ref([])
    const changeCateForm = ref({
      categoryName:'默认',
      categoryID:'b8a4436ccfff49f4643627e36ece4d8f'
    })
    //隐藏选择分类表单，避免显示收缩下拉框
    let changeCateInputView = ref(true)
    //获取分类
    async function categorys() {
      const data = await getCategorys()
      if (data.success) {
        categorysArray.value = data.data
      } else {
      }
    }
    categorys()
    //创建分类
    const centerDialogVisible = ref(false)
    //父分类ID
    const createCateParentID = ref('')
    //创建子分类ID
    const createCateChildrenID = ref('')
    const createCateDialog = (id: string) => {
      changeCateInputView.value = false
      centerDialogVisible.value = true
      createCateParentID.value = id
    }
    //接收CreagteCate创建好的子分类的ID
    const createOKCate = (data: any) => {
      centerDialogVisible.value = false
      changeCateInputView.value = false
      createCateChildrenID.value = data.categoryId
      changeCateForm.value = {
        categoryName:data.categoryName,
        categoryID:data.categoryId
      }
      // changeCateForm.value.cateId=data.categoryId
      changeCate()
    }

    //传给文章父组件分类ID
    const changeCate = () => {
      content.emit('changeCateEmit', changeCateForm.value)
    }
    return {
      categorysArray,
      changeCateForm,
      changeCate,
      Edit,
      createCateParentID,
      createCateDialog,
      centerDialogVisible,
      createOKCate,
      changeCateInputView,
    }
  },
})
</script>

<style scoped lang="less">
.selectDiy{
  width: 3px;
  display: flex;
  
}
.selectBox{
  width: 100%;
  display: flex;

}
.Category {
  display: flex;
}
.nullCate {
  color: rgb(110, 110, 110);
  margin-left: 10px;
}
</style>
