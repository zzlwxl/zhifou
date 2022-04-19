<template>
  <div class="Avatar">
    <img v-if="circleUrl" @click="handlePictureCardPreview" :src="circleUrl" class="avatar" />
    <el-upload class="upload-demo" :headers="headerObj" :action="action" :on-success="handleAvatarSuccess" :on-preview="handlePreview" :show-file-list="false" :on-remove="handleRemove">
      <el-button style="margin-top: 10px; margin-left: 10px" type="primary">选择文章缩略图</el-button>
    </el-upload>
    <el-dialog v-model="dialogVisible" class="dialog">
      <img :src="circleUrl" alt="" />
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import type { UploadProps, UploadFile } from 'element-plus'
import  message  from '../../utils/message'
import localCache from '../../utils/cache'

export default defineComponent({
  name: 'Avatar',
  emits: ['coverImgEmit'],
  props:{
    imgUrl:{}
  },
  setup(props, content) {
    const circleUrl = ref()
    const action = 'http://192.168.1.68:8080/cos/upload'
    const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
      console.log(uploadFile, uploadFiles)
    }
    const dialogVisible = ref(false)
    const handlePictureCardPreview = () => {
      dialogVisible.value = true
    }
    const handleAvatarSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
      if (response.success) {
        circleUrl.value = response.data.fileBaseUrl + response.data.filePath
        console.log(response.data)
        message.success('上传成功')
        content.emit('coverImgEmit', circleUrl.value)
      } else {
        message.error(response.data)
      }
    }
    const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
      if (rawFile.type !== 'image/jpeg') {
        message.warning('请上传jpeg、jpg、png')
        return false
      } else if (rawFile.size / 1024 / 1024 > 2) {
        message.error('图片大小不能超过2MB')
        return false
      }
      return true
    }
    const headerObj = { token: 'zzl_' + localCache.getCache('token') }
    //是否是编辑文章
    const init=()=>{
      if(props.imgUrl){
        circleUrl.value=props.imgUrl
      }
    }
    init()
    return {
      circleUrl,
      handleRemove,
      action,
      headerObj,
      handleAvatarSuccess,
      handlePictureCardPreview,
      dialogVisible,
    }
  },
})
</script>

<style scoped lang="less">
.avatar {
  width: 100px;
  cursor: pointer;
}

.Avatar {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
