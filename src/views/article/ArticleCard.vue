<template>
  <div class='ArticleCard'>
    <div class="ArticleCardBox">
        <div class="top">
        <img class="img" src="https://file.lddcc.cn/zhifou/6250fe81ed9484cda226935a.png" alt="">
        <div class="contentBox">
            <div class="title">
            <h1>文章标题</h1>
            <div class="cate">分类</div>
            </div>
            <div class="content">文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容</div>
        </div>
        </div>
        <div class="activeBox">
            <div class="time">时间</div>
            <div class="other-data">作者</div>
            <div class="active">操作</div>
        </div>
    </div>
  </div>
</template>
<script lang='ts'>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ArticleCard',
  setup(props,content){
    
  }
})
</script>

<style scoped lang='less'>
.ArticleCardBox{
    width: 100%;
    height: 25vw;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    cursor: pointer;
    .top{
        width: 100%;
        height: 80%;
        background-color: rgb(255, 192, 18);
        display: flex;
        align-items: center;
        img{
            width: 30%;
            height: 85%;
        }
        .contentBox{
            width: 70%;
            height: 85%;
            background-color: skyblue;
            display: flex;
            flex-direction: column;
            margin-left: 1vw;
            .title{
                display: flex;
                align-items: center;
                h1{
                    color: rgb(27, 27, 27);
                    font-size: 1rem;
                }
                .cate{
                    font-size: .2rem;
                    margin-left: 1vw;
                }
            }
            .content{
                overflow: hidden;
                font-size: .5rem;
                color: rgb(29, 29, 29);
                margin-bottom: 2vw;
            }
        }
    }
    .activeBox{
        width: 100%;
        height: 20%;
        background-color: green;
        display: flex;
        align-items: center;
        .time{
            width: 20%;
            font-size: .2rem;
            background-color: red;
        }
        .other-data{
            width: 30%;
            font-size: .2rem;
            background-color: pink;
        }
        .active{
            width: 50%;
            font-size: .2rem;
            background:yellow;
        }
    }
}
@media screen and (min-width:800px) {
    .ArticleCardBox{
        height: 15vw;
        .img{
            width: 10vw;
        }
    }
}
</style>