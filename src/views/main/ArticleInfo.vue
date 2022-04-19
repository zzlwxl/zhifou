<template>
  <div class="ArticleMain">
    <Nav></Nav>
    <div class="mainBox">
      <aside class="left">左</aside>
      <div class="articleBox">
        <router-view></router-view>
      </div>
      <aside class="right">右边</aside>
    </div>
      <FooterNav></FooterNav>
    <footer>
    </footer>
    
  </div>
</template>
<script lang="ts">
import { defineComponent ,ref} from 'vue'
import Nav from '../../components/Nav/Nav.vue'
import FooterNav from '../../components/Footer/FooterNav.vue'
// import Slide from '../article/Slide.vue'
import ArticleList from '../article/ArticleList.vue'

export default defineComponent({
  name: 'ArticleMain',
  components: {
    Nav,
    FooterNav,
    // Slide,
    ArticleList,
  },
  setup(props, content) {
    
  },
})
</script>

<style scoped lang="less">
.articleBox {
  width: 100%;
  height: 100%;
}
.mainBox {
  margin-top: 2vw;
  display: flex;
  width: 100%;
  justify-content: center;
}

.left {
  display: none;
}
.right {
  display: none;
}
@media screen and (min-width: 800px) {
  .right {
    height: 1000px;
    background-color: rgb(159, 159, 255);
    display: block;
    width: 40%;
  }
  .left {
    display: none;
  }
}
@media screen and (min-width: 1600px) {
  .left {
    height: 1000px;
    background-color: rgb(150, 255, 150);
    width: 20%;
    display: block;
  }
  .right {
    height: 1000px;
    background-color: rgb(0, 0, 249);
    width: 20%;
    display: block;
  }
  .articleBox {
    width: 60%;
    height: 1000px;
    // padding: 100%;
  }
}
</style>
