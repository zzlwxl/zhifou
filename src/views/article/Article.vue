<template>
  <div class="article">
    <div class="articleBox">
      <span class="back">
        <el-link @click="$router.go(-1)">返回</el-link>
      </span>
      <el-form ref="ruleFormRef" :model="subForm" :rules="isArtcileRules" class="demo-userInfoForm" :size="formSize">
        <el-form-item label="文章标题" prop="articleTitle">
          <el-input @input="isEditDataFun('articleTitle')" v-model="subForm.articleTitle" />
        </el-form-item>
        <!-- <el-form-item label="文章内容" prop="articleContent">
          <el-input @input="isEditDataFun('articleContent')" type="textarea" v-model="subForm.articleContent" />
        </el-form-item> -->
        <Edit @inputByEditConentEmit="inputByEditConent" :againEditData="subForm.articleContent"></Edit>
        <Category :editCateName="editCateName" :editCateId="editCateId" @changeCateEmit="changeCate"></Category>
        <el-form-item label="文章状态" prop="articleState">
          <el-radio-group v-model="subForm.articleState">
            <el-radio @click.stop="subForm.articleState === '1' ? '' : isEditDataFun('articleState')" label="1" size="large">发布</el-radio>
            <el-radio @click.stop="subForm.articleState === '2' ? '' : isEditDataFun('articleState')" label="2" size="large">草稿</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="文章头图">
          <CoverImg :imgUrl="coverImg" @coverImgEmit="coverImgFun"></CoverImg>
        </el-form-item>
        <el-form-item class="btnBox">
          <el-button v-if="!$route.query.articleId" style="width: 100%" type="primary" @click="submitFormRule(ruleFormRef)">提交2</el-button>
          <el-button class="btn" v-else type="primary" @click="submitFormEdit()">提交</el-button>
          <el-button v-if="$route.query.articleId" class="btn" type="primary" @click="delArticleFun()">删除文章</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watchEffect, nextTick } from 'vue'

import Category from './Category.vue'
import CoverImg from './CoverImg.vue'
import Edit from '../../components/Edit/Edit.vue'

import { useRouter, useRoute } from 'vue-router'
import { articleRules, editArticleRules } from './config/articleRules'

import message from '../../utils/message'
import {defaultEditContent} from './config/defaultEditContent'

import type { FormInstance } from 'element-plus'
import { IArticle } from '../../service/article/type'

import { categoryID } from './config/defaultCateID'

import { addArticle, getArticleInfo, editArticle,delArticle } from '../../service/article/index'

export default defineComponent({
  name: 'Article',
  components: {
    Category,
    CoverImg,
    Edit
  },
  setup(props, content) {
    const router = useRouter()
    const route = useRoute()
    const ruleFormRef = ref<FormInstance>()
    let isArtcileRules = articleRules
    let subForm = ref({
      articleTitle: '',
      articleName: '',
      categoryId: categoryID,
      articleContent: '',
      articleState: '',
      coverImg: '',
    })

    //编辑文章
    let coverImg = ref('')
    let editCateName = ref('')
    let editCateId = ref('')
    let isEditData = new Map()

    //接收分类组件传过来的分类ID
    const changeCate = (value: any) => {
      //categoryID是创建的ID,value是选择的ID
      subForm.value.categoryId = value.categoryID ?? value.categoryId
      isEditData.set('categoryId', true)
    }
    //接收头图组件传过来的图片地址
    const coverImgFun = (url: string) => {
      subForm.value.coverImg = url
      isEditData.set('coverImg', true)
    }
    //提交前验证表单
    const submitFormRule = async (formEl: FormInstance | undefined) => {
      if(subForm.value.articleContent===defaultEditContent){
        return message.warning('请输入文章内容')
      }
      if (!formEl) return
      
      await formEl.validate((valid: any, fields: any) => {
        if (valid) {
          const submitFormData = {
            articleTitle: subForm.value.articleTitle,
            articleName: subForm.value.articleName,
            categoryId: subForm.value.categoryId,
            articleContent: subForm.value.articleContent,
            articleState: subForm.value.articleState,
            coverImg: subForm.value.coverImg,
          }
          submitForm(submitFormData)
        }
      })
    }
    //提交编辑文章的表单
    const submitFormEdit = () => {
      const submitFormData = {
        articleTitle: isEditData.get('articleTitle') ? subForm.value.articleTitle : '',
        categoryId: isEditData.get('categoryId') ? subForm.value.categoryId : '',
        articleContent: isEditData.get('articleContent') ? subForm.value.articleContent : '',
        articleState: isEditData.get('articleState') ? subForm.value.articleState : '',
        coverImg: isEditData.get('coverImg') ? subForm.value.coverImg : '',
        articleId:route.query.articleId
      }
      submitForm(submitFormData)
    }
    //提交表单
    async function submitForm(data: IArticle) {
      let value = {}
      if (route.query.articleId) {
        value = await editArticle(data)
      } else {
        value = await addArticle(data)
      }
      isOkSubmit(value)
    }
    const isOkSubmit=(value:any)=>{
      if (value.success) {
        message.success('提交成功')
        if (route.query.articleId) {
          router.go(-1)
        } else {
          router.push('/')
        }
      } else {
        message.warning(value.data)
      }
    }
    //是否是编辑文章
    const init = () => {
      const articleId = route.query.articleId
      if (articleId) {
        console.log('route.query.articleId', articleId)
        isArtcileRules = editArticleRules
        getArticleInfoFun(articleId as string)
      }
    }
    init()
    //先获取文章信息
    async function getArticleInfoFun(articleId: string) {
      const data = await getArticleInfo(articleId)
      if (data.success) {
        console.log('data',data)
        nextTick(() => {
          subForm.value.articleTitle = data.data.articleTitle
          subForm.value.articleContent = data.data.articleContent
          console.log('sub',subForm.value)
          subForm.value.categoryId = data.data.category.categoryId
          subForm.value.articleState = data.data.articleState === '发布' ? '1' : '2'
          subForm.value.coverImg = data.data.coverImg
        })
        coverImg.value = data.data.coverImg
        editCateName.value = data.data.category.categoryName
        editCateId.value = data.data.category.categoryId
        console.log('subForm.value',subForm.value)
      } else {
        message.error(data.data)
      }
    }
    const delArticleFun=()=>{
      subDelArticle()
    }
    async function subDelArticle() {
      const data=await delArticle(route.query.articleId as string)
      if(data.success){
        message.success('删除文章成功')
        router.go(-1)
      }else{
        message.error(data.data)
      }
    }
    //动态拿到用户修改了哪些字段(先用这个方法,后边需要比对)
    const isEditDataFun = (name: string) => {
      isEditData.set(name, true)
    }
    const inputByEditConent=(data:any)=>{
      subForm.value.articleContent=data
      isEditData.set('articleContent',true)
      console.log(subForm.value)
    }
    return {
      subForm,
      submitFormRule,
      isArtcileRules,
      ruleFormRef,
      changeCate,
      coverImgFun,
      coverImg,
      editCateName,
      isEditDataFun,
      submitFormEdit,
      delArticleFun,
      inputByEditConent
    }
  },
})
</script>

<style scoped lang="less">
.article {
  width: 100%;
  margin: 0 auto;
  margin-top: 10px;
  .articleBox {
    margin: 10px;
  }
}
.pwd {
  width: 350px;
  margin: 50px auto;
}
.btnBox{
  width: 100%;
  position: relative;
  .btn:nth-child(1){
    width: 40%;
    position: absolute;
    left: 0;
  }
  .btn:nth-child(2){
    width: 40%;
    position: absolute;
    right: 0;
  }
}
</style>
