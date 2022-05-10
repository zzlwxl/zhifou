<template>
  <div class="ArticleHeader" ref="articleHeaderRef">
    <div class="box">
    <h1 class="title">{{ articleData.articleTitle }}</h1>
    <div class="active">
      <ArticleActive :article="articleData">
        <template v-if="isShowPhone" #comment>
          <span style="display:none"></span>
        </template>
        <template v-if="isShowPhone" #star>
          <span style="display:none"></span>
        </template>
        <template #author>
           <el-icon class="icon">
          <User />
        </el-icon>
          {{articleData.author ? articleData.author.nickName : ''}}
        </template>
      </ArticleActive>
    </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watchEffect ,onMounted} from 'vue'
import ArticleActive from './ArticleActive.vue'
import { User } from '@element-plus/icons-vue'

import {debounce} from '../../utils/debounce'

export default defineComponent({
  name: 'ArticleHeader',
  components: {
    ArticleActive,
    User
  },
  props: ['article'],
  setup(props, content) {
    let articleData = ref('')
    let isShowPhone=ref(false)
    let articleHeaderRef=ref<HTMLDivElement>()
    window.addEventListener('resize',function(){
      computedInnerWidthDebounce()
      })
    watchEffect(() => {
      articleData.value = props.article
    })
    const computedInnerWidth=()=>{
      if(window.innerWidth<=1000){
        isShowPhone.value=true
      }else{
        isShowPhone.value=false
      }
    }
    const computedInnerWidthDebounce= debounce(computedInnerWidth,1000,false)
    onMounted(()=>{
      computedInnerWidth()
    })
    return {
      articleData,
      articleHeaderRef,
      isShowPhone
    }
  },
})
</script>

<style scoped lang="less">
@fontCol: #777;
@borderCol: rgb(204, 204, 204);
@col1: #2196f3;
@col2: #388e3c;
h1 {
  color: @col2;
  display: flex;
  justify-content: center;
}
</style>
