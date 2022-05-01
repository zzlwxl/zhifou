<template>
  <div class="ArticleTop5List">
    <div class="box" @click="$router.push(`/articleinfo/info/${data.articleId}`)">
      <div class="linkBox">
        <el-link class="link" :underline="false">{{ data.articleTitle }}</el-link>
      </div>
      <div class="active">
        <el-icon v-if="type==='articleTopByViewsType'" class="icon">
          <View />
        </el-icon>
        <el-icon v-if="type==='articleTopByStarsType'" class="icon">
          <Star />
        </el-icon>
        <el-icon v-if="type==='articleTopByCommentsType'" class="icon">
          <ChatDotRound />
        </el-icon>
        {{num}}
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent ,ref,watchEffect} from 'vue'
import { Stopwatch, View, ChatDotRound, Star } from '@element-plus/icons-vue'

export default defineComponent({
  name: 'ArticleTop5List',
  props: ['data','type'],
  components: {
    Stopwatch,
    View,
    ChatDotRound,
    Star,
  },
  setup(props, content) {
    let num=ref(0)
    let type=ref('')
    watchEffect(()=>{
        if(props.type){
            switch(props.type){
                case 'articleTopByViewsType':
                    num.value=props.data.articleViews
                    type.value='articleTopByViewsType'
                    break
                case 'articleTopByStarsType':
                    num.value=props.data.articleStar
                    type.value='articleTopByStarsType'
                    break
                case 'articleTopByCommentsType':
                    num.value=props.data.articleComments
                    type.value='articleTopByCommentsType'
                    break
            }
        }
    })
    return{
        num,
        type
    }
  },
})
</script>

<style scoped lang="less">
@col1: #2196f3;
@col2: #388e3c;
@bgcCol: rgb(221, 221, 221);
.box {
  width: 100%;
  overflow: hidden;
  display: flex;
  cursor: pointer;
  &:hover{
      color: @col1;
      .link{
        color: @col1;
      }
  }
  .linkBox {
    width: 80%;
  }
  .active {
    display: flex;
    align-items: center;
    cursor: default;
  }
}
.el-link {
  margin: 6px;
}
.el-link .el-icon--right.el-icon {
  vertical-align: text-bottom;
}
</style>
