<template>
  <div class="ArticleHeader">
    <div class="box">
    <h1 class="title">{{ articleData.articleTitle }}</h1>
    <div class="active">
      <ArticleActive :article="articleData">
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
import { defineComponent, ref, watchEffect } from 'vue'
import ArticleActive from './ArticleActive.vue'
import { User } from '@element-plus/icons-vue'

export default defineComponent({
  name: 'ArticleHeader',
  components: {
    ArticleActive,
    User
  },
  props: ['article'],
  setup(props, content) {
    let articleData = ref('')
    watchEffect(() => {
      articleData.value = props.article
      console.log('articleData.value',articleData.value)
    })

    return {
      articleData,
    }
  },
})
</script>

<style scoped lang="less">
@fontCol: #777;
@borderCol: rgb(204, 204, 204);
@col1: #2196f3;
@col2: #388e3c;
.box {
  margin: 10px;
  // border: 1px solid @borderCol;
}
h1 {
  color: @col2;
  display: flex;
  justify-content: center;
}
</style>
