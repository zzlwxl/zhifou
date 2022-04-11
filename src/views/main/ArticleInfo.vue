<template>
  <div class="ArticleMain">
    <Nav></Nav>
    <div class="mainBox">
      <aside class="left">左</aside>
        <div class="articleBox">
          <router-view></router-view>
        </div>
      <aside class="right">右</aside>
    </div>
    <footer>
      <Footer></Footer>
    </footer>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import Nav from '../../components/Nav/Nav.vue'
import Footer from '../../components/Footer/Footer.vue'
// import Slide from '../article/Slide.vue'
import ArticleList from '../article/ArticleList.vue'

export default defineComponent({
  name: 'ArticleMain',
  components: {
    Nav,
    Footer,
    // Slide,
    ArticleList,
  },
  setup(props, content) {
    console.log('dd')
  },
})
</script>

<style scoped lang="less">
.articleBox {
  width: 100%;
  height: 100%;
  background-color: red;
}
.mainBox {
  margin-top: 2vw;
  display: flex;
  width: 100%;
  background-color: pink;
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
    background-color: rgb(145, 145, 255);
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
    width: 30%;
    display: block;
  }
  .right {
    height: 1000px;
    background-color: rgb(138, 138, 255);
    width: 30%;
    display: block;
  }
  .articleBox {
    width: 40%;
    height: 1000px;
    // padding: 100%;
    background-color: red;
  }
}
</style>
