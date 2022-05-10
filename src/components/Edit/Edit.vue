<template>
  <div style="border: 1px solid #ccc">
    <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :defaultConfig="toolbarConfig" :mode="mode" />
    <Editor 
    style="height: 500px; overflow-y: hidden" 
    v-model="valueHtml" 
    :defaultConfig="editorConfig" 
    :mode="mode" 
    @onChange="handleChange"
    @onCreated="handleCreated" />
  </div>
</template>
<script lang="ts">
import { onBeforeUnmount, ref, shallowRef, onMounted, computed, watchEffect, nextTick, defineComponent } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { IEditorConfig, IToolbarConfig, createToolbar } from '@wangeditor/editor'
import Prism from 'prismjs'

import localCache from '../../utils/cache'
import message from '../../utils/message'
import {debounce} from '../../utils/debounce'
import imageUplooadType from '../../utils/imageUplooadType'
import {htmlToHNode} from '../../utils/htmlToHNode'

import { BASE_URL } from '../../service/request/config'
import { defaultEditContent } from '../../views/article/config/defaultEditContent'

import { imgUploadServer } from '../../views/article/config/upload'

import '@wangeditor/editor/dist/css/style.css'

export default defineComponent({
  components: { Editor, Toolbar },
  emits: ['inputByEditConentEmit'],
  props: ['againEditData'],
  setup(props, content) {
    // 编辑器实例，必须用 shallowRef
    const editorRef = shallowRef()
    const action = BASE_URL + '/cos/upload'

    // 内容 HTML
    let valueHtml = ref('')
    let flag = true
    watchEffect(() => {
      if (props.againEditData) {
        if (props.againEditData !== defaultEditContent && flag) {
          flag = false
          valueHtml.value = props.againEditData
          content.emit('inputByEditConentEmit', valueHtml.value)
        }
      }
      if (valueHtml.value) {
        content.emit('inputByEditConentEmit', valueHtml.value)
      }
    })
    const toolbarConfig: Partial<IToolbarConfig> = {
      excludeKeys: ['uploadVideo'],
    }
    //上传图片
    type InsertFnType = (url: string, alt?: string, href?: string) => void
    const headerObj = { token: 'zzl_' + localCache.getCache('token') }
    const editorConfig: Partial<IEditorConfig> = { MENU_CONF: {} }
    editorConfig.MENU_CONF!['uploadImage'] = {
      server: action,
      fieldName: 'file',

      // 单个文件的最大体积限制，默认为 2M
      maxFileSize: 1 * 1024 * 1024, // 1M

      // 最多可上传几个文件，默认为 100
      maxNumberOfFiles: 10,

      // 选择文件时的类型限制，默认为 ['image/*'] 。如不想限制，则设置为 []
      allowedFileTypes: ['image/jpeg', 'image/png', 'image/jpg'],
      // 自定义增加 http  header
      headers: headerObj,

      // 超时时间，默认为 10 秒
      // timeout: 5 * 1000, // 5 秒
      customInsert(res: any, insertFn: InsertFnType) {
        // 从 res 中找到 url alt href ，然后插图图片
        insertFn(res.data.fileBaseUrl + res.data.filePath)
      },
    }
    
    //检验编辑的标题格式是否正确
    const cheak=()=>{
      const data=htmlToHNode(valueHtml.value)
      if(!data.success){
        message.error(data.msg)
      }
    }
    const precheck = debounce(cheak, 1000, true)

    // 组件销毁时，也及时销毁编辑器
    onBeforeUnmount(() => {
      const editor = editorRef.value
      if (editor == null) return
      editor.destroy()
    })
    const handleChange = (editor: { getAllMenuKeys: () => any }) => { 
      precheck()
      }
    const handleCreated = (editor: { getAllMenuKeys: () => any }) => {
      editorRef.value = editor // 记录 editor 实例，重要
      const editorList=editor
    }

    return {
      editorRef,
      valueHtml,
      mode: 'default', // 或 'simple'
      toolbarConfig,
      editorConfig,
      handleCreated,
      handleChange
    }
  },
})
</script>
