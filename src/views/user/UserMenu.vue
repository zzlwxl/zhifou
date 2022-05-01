<template>
  <div class="user">
    <Nav></Nav>
    <div class="mainBox">
      <aside class="left">左</aside>
      <div class="userBox">
        <PhoneBackBtn></PhoneBackBtn>
        <el-tabs v-model="tabIndex" class="demo-tabs">
          <el-tab-pane label="关于博主"><AuthorInfo v-if="tabIndex==='0'"></AuthorInfo></el-tab-pane>
          <el-tab-pane label="关注的人"><AuthorList v-if="tabIndex==='1'"></AuthorList></el-tab-pane>
          <el-tab-pane label="ta的粉丝"><AuthorList type="fan" v-if="tabIndex==='2'"></AuthorList></el-tab-pane>
          <el-tab-pane label="博主文章"><ArticleByUserList v-if="tabIndex==='3'" ></ArticleByUserList></el-tab-pane>
          <el-tab-pane label="点赞历史"><ArticleByUserList v-if="tabIndex==='4'" type="byStar"></ArticleByUserList></el-tab-pane>
          <el-tab-pane label="阅读历史"><ArticleByUserList v-if="tabIndex==='5'" type="byHistory" ></ArticleByUserList></el-tab-pane>
        </el-tabs>
        <el-backtop :right="10" :bottom="48" />
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
import AuthorList from './cpns/AuthorList.vue'

export default defineComponent({
  name: 'usermenu',
  components: {
    Nav,
    PhoneBackBtn,
    FooterNav,
    AuthorInfo,
    ArticleByUserList,
    AuthorList
  },
  setup(props, content) {
    const route = useRoute()
    let tabIndex=ref('0')
    return{
      tabIndex,
    }

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
