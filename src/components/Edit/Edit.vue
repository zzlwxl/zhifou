<template>
    <div style="border: 1px solid #ccc">

      <Toolbar
        style="border-bottom: 1px solid #ccc"
        :editor="editorRef"
        :defaultConfig="toolbarConfig"
        :mode="mode"
      />
      <Editor
        style="height: 500px; overflow-y: hidden;"
        v-model="valueHtml"
        :defaultConfig="editorConfig"
        :mode="mode"
        @onCreated="handleCreated"
      />
       <div v-html="valueHtml"></div>
    </div>
</template>
<script>

import { onBeforeUnmount, ref, shallowRef, onMounted,computed,watchEffect,nextTick} from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import Prism from 'prismjs'

import EditTest from './EditTest.vue'

export default {
  components: { Editor, Toolbar ,EditTest},
  setup() {
    // 编辑器实例，必须用 shallowRef
    const editorRef = shallowRef()

    // 内容 HTML
    const valueHtml = ref('<p>hello</p>')

    watchEffect(()=>{
      if(valueHtml.value){
        nextTick(()=>{
          console.log("changed")
          Prism.highlightAll()
          // valueHtml.value=Prism.highlight(valueHtml.value, Prism.languages.html, 'html');
        })
      }
    })
    
    // 模拟 ajax 异步获取内容
    onMounted(() => {
        setTimeout(() => {
            valueHtml.value = '<p>模拟 Ajax 异步设置内容</p>'
        }, 1500)
    })

    const toolbarConfig = {}
    const editorConfig = { placeholder: '请输入内容...' }

    // 组件销毁时，也及时销毁编辑器
    onBeforeUnmount(() => {
        const editor = editorRef.value
        if (editor == null) return
        editor.destroy()
    })

    const handleCreated = (editor) => {
      editorRef.value = editor // 记录 editor 实例，重要！
    }

    return {
      editorRef,
      valueHtml,
      mode: 'default', // 或 'simple'
      toolbarConfig,
      editorConfig,
      handleCreated
    };
  }
}
</script>    
<style src="/Users/new/lean/view/vue3/zhifou/node_modules/@wangeditor/editor/dist/css/style.css"></style>