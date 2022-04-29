<template>
  <div class='AuthorList'>
    <AuthorCard>
      <template v-if="_isInsertActive" #userActice>
        <span>动态</span>
      </template>
    </AuthorCard>
  </div>
</template>
<script lang='ts'>
import { defineComponent } from 'vue'
import AuthorCard from './AuthorCard.vue'

export default defineComponent({
  name: 'AuthorList',
  props:{
    isInsertActive:{
      type:Boolean,
      default:true
    }
  },
  components:{
      AuthorCard
  },
  setup(props,content){
    const _isInsertActive=props.isInsertActive
    
    return{
      _isInsertActive
    }
  }
})
</script>

<style scoped lang='less'>

</style>