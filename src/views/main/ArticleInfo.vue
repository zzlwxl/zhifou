<template>
  <div class="ArticleMain">
    <div class="box">
      <div class="nav-box">
        <Nav></Nav>
      </div>
      <div class="router-box">
        <router-view></router-view>
      </div>
      <div class="footer-box">
        <footer></footer>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'

import Nav from '../../components/Nav/Nav.vue'
import FooterNav from '../../components/Footer/FooterNav.vue'
import ArticleInfoRCard from '../article/cnps/ArticleInfoRCard.vue'
import ArticleList from '../article/ArticleList.vue'

export default defineComponent({
  name: 'ArticleMain',
  components: {
    Nav,
    FooterNav,
    ArticleInfoRCard,
    ArticleList,
  },
  setup(props, content) {},
})
</script>

<style scoped lang="less">
.box {
  display: flex;
  flex-direction: column;
  .nav-box {
    width: 100%;
  }
  .router-box {
    margin-top: 2vw;
  }
}
</style>
