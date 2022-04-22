<template>
  <div style="border: 1px solid #ccc">
    <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :defaultConfig="toolbarConfig" :mode="mode" />
    <Editor style="height: 500px; overflow-y: hidden" v-model="valueHtml" :defaultConfig="editorConfig" :mode="mode" 
    @onCreated="handleCreated"/>
  </div>
</template>
<script lang="ts">
import { onBeforeUnmount, ref, shallowRef, onMounted, computed, watchEffect, nextTick, defineComponent } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { IEditorConfig, IToolbarConfig, createToolbar } from '@wangeditor/editor'
import Prism from 'prismjs'

import localCache from '../../utils/cache'
import message from '../../utils/message'
import {BASE_URL} from '../../service/request/config'
import {defaultEditContent} from '../../views/article/config/defaultEditContent'

import { imgUploadServer } from '../../views/article/config/upload'

import EditTest from './EditTest.vue'

export default defineComponent({
  components: { Editor, Toolbar, EditTest },
  emits: ['inputByEditConentEmit'],
  props: ['againEditData'],
  setup(props, content) {
    // 编辑器实例，必须用 shallowRef
    const editorRef = shallowRef()
     const action = BASE_URL+'/cos/upload'

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
        nextTick(() => {
          Prism.highlightAll()
        })
      }
    })

    // const handleChange = (editor) => {
    //   console.log('change:', editor.children)
    // }
    // const handleDestroyed = (editor) => {
    //   console.log('destroyed', editor)
    // }
    // const handleFocus = (editor) => {
    //   console.log('focus', editor)
    // }
    // const handleBlur = (editor) => {
    //   console.log('blur', editor)
    // }
    // const customAlert = (info, type) => {
    //   alert(`【自定义提示】${type} - ${info}`)
    // }
    // const customPaste = (editor, event, callback) => {
    //   console.log('ClipboardEvent 粘贴事件对象', event)
    //   // const html = event.clipboardData.getData('text/html') // 获取粘贴的 html
    //   // const text = event.clipboardData.getData('text/plain') // 获取粘贴的纯文本
    //   // const rtf = event.clipboardData.getData('text/rtf') // 获取 rtf 数据（如从 word wsp 复制粘贴）

    //   // 自定义插入内容
    //   editor.insertText('xxx')

    //   // 返回 false ，阻止默认粘贴行为
    //   event.preventDefault()
    //   callback(false) // 返回值（注意，vue 事件的返回值，不能用 return）

    //   // 返回 true ，继续默认的粘贴行为
    //   // callback(true)
    // }

    // 模拟 ajax 异步获取内容
    // onMounted(() => {
    //   setTimeout(() => {
    //     valueHtml.value = '<p>模拟 Ajax 异步设置内容</p>'
    //   }, 1500)
    // })

    const toolbarConfig: Partial<IToolbarConfig> = {
      excludeKeys: ['uploadVideo'],
    }
    console.log('toolbarConfig', toolbarConfig)
    // editorConfig
    // const editorConfig = { placeholder: '请输入内容...' ,}
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
      allowedFileTypes: [],

      // 自定义上传参数，例如传递验证的 token 等。参数会被添加到 formData 中，一起上传到服务端。
      // meta: {
      //     token: 'xxx',
      //     otherKey: 'yyy'
      // },

      // 将 meta 拼接到 url 参数中，默认 false
      // metaWithUrl: false,

      // 自定义增加 http  header
      headers: headerObj,

      // 跨域是否传递 cookie ，默认为 false
      // withCredentials: true,

      // 超时时间，默认为 10 秒
      // timeout: 5 * 1000, // 5 秒
      customInsert(res: any, insertFn: InsertFnType) {
        // 从 res 中找到 url alt href ，然后插图图片
        insertFn(res.data.fileBaseUrl + res.data.filePath)
      },
      // 上传进度的回调函数
      // onProgress(progress: number) {
      //   // progress 是 0-100 的数字
      //   console.log('progress', progress)
      // },
      // // 单个文件上传成功之后
      // onSuccess(file: File, res: any) {
      //   console.log('上哈村')
      //   message.success(`${file.name} 上传成功`)
      // },
      // // 单个文件上传失败
      // onFailed(file: File, res: any) {
      //   message.error(`${file.name} 上传失败`)
      // },
      // // 上传错误，或者触发 timeout 超时
      // onError(file: File, err: any, res: any) {
      //   message.warning(`${file.name} 上传出错`,)
      // },
    }

    // 组件销毁时，也及时销毁编辑器
    onBeforeUnmount(() => {
      const editor = editorRef.value
      if (editor == null) return
      editor.destroy()
    })

    const handleCreated = (editor: { getAllMenuKeys: () => any }) => {
      editorRef.value = editor // 记录 editor 实例，重要
      // console.log(editor.getAllMenuKeys())
    }

    return {
      editorRef,
      valueHtml,
      mode: 'default', // 或 'simple'
      toolbarConfig,
      editorConfig,
      handleCreated,

      // handleChange,
      // handleDestroyed,
      // handleFocus,
      // handleBlur,
      // customAlert,
      // customPaste,
    }
  },
})
</script>
