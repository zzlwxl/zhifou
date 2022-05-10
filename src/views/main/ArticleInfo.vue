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
.box{
  display: flex;
  flex-direction: column;
  .nav-box{
    width: 100%;
    background-color: blue;
  }
  .router-box{
    // padding-top: 2vw;
    margin-top: 2vw;
  }
}
@media screen and (min-width: 800px) {
  .right {
    margin-right: 10px;
    margin-top: 2px;
    height: 1000px;
    display: block;
    width: 440px;
  }
  .left {
    display: none;
  }
}
@media screen and (min-width: 1600px) {
  .left {
    margin-left: 10px;
    margin-top: 2px;
    height: 1000px;
    background-color: rgb(150, 255, 150);
    width: 440px;
    display: block;
  }
  .articleBox {
  }
}
</style>
