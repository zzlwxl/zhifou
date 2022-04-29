<template>
  <div class="user">
    <Nav :headImgUrl="userInfo ? userInfo.headImgUrl : ''"></Nav>
    <div class="mainBox">
      <aside class="left">左</aside>
      <div class="userBox">
        <PhoneBackBtn></PhoneBackBtn>
        <el-tabs tab-position="top" class="demo-tabs">
          <el-tab-pane label="关于博主"><AuthorInfo :userId="$route.params.userid"></AuthorInfo></el-tab-pane>
          <el-tab-pane label="关注的人">Role</el-tab-pane>
          <el-tab-pane label="博主文章"><ArticleByUserList type="byAuthor" :userId="$route.params.userid"></ArticleByUserList></el-tab-pane>
          <el-tab-pane label="点赞历史"><ArticleByUserList type="byStar" :userId="$route.params.userid"></ArticleByUserList></el-tab-pane>
          <el-tab-pane label="阅读历史"><ArticleByUserList type="byHistory" :userId="$route.params.userid"></ArticleByUserList></el-tab-pane>
        </el-tabs>
      </div>
      <aside class="right">右</aside>
    </div>
    <FooterNav></FooterNav>
    <footer></footer>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import {useRoute} from 'vue-router'

import Nav from '../../components/Nav/Nav.vue'
import PhoneBackBtn from '../../components/Nav/PhoneBackBtn.vue'
import FooterNav from '../../components/Footer/FooterNav.vue'
import AuthorInfo from './cpns/AuthorInfo.vue'
import ArticleByUserList from './cpns/ArticleByUserList.vue'

export default defineComponent({
  name: 'usermenu',
  components: {
    Nav,
    PhoneBackBtn,
    FooterNav,
    AuthorInfo,
    ArticleByUserList
  },
  setup(props, content) {
    const route = useRoute()
  },
})
</script>

<style scoped lang="less">
.mainBox {
  margin-top: 2vw;
  display: flex;
  width: 100%;
  justify-content: center;
}
.userBox {
  width: 96%;
  margin: 0 4px;
}
.activeBox {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
}
.imgBox {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
}
.left {
  display: none;
}
.right {
  display: none;
}
@media screen and (min-width: 800px) {
  .right {
    margin-right: 10px;
    margin-left: 30px;
    margin-top: 2px;
    height: 1000px;
    background-color: rgb(159, 159, 255);
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
    margin-right: 30px;
    margin-top: 2px;
    height: 1000px;
    background-color: rgb(150, 255, 150);
    width: 440px;
    display: block;
  }
}
</style>
