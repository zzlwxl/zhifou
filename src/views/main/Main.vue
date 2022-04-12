<template>
  <div class="Main">
    <router-view></router-view>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import Nav from '../../components/Nav/Nav.vue'
import Footer from '../../components/Footer/Footer.vue'
// import Slide from '../article/Slide.vue'
import ArticleList from '../article/ArticleList.vue'

export default defineComponent({
  name: 'Main',
  components: {
    Nav,
    Footer,
    // Slide,
    ArticleList,
  },
  setup(props, content) {},
})
</script>

<style scoped lang="less"></style>
