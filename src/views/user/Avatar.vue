<template>
  <div class="Avatar">
    <el-avatar :size="50" :src="circleUrl ? circleUrl : $store.state.user.userInfo.headImgUrl" />
    <el-upload class="upload-demo" :headers="headerObj" :action="action" :on-success="handleAvatarSuccess" :on-preview="handlePreview" :show-file-list="false" :on-remove="handleRemove">
      <el-button style="margin-top:10px" type="primary">更改头像</el-button>
    </el-upload>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import type { UploadProps, UploadUserFile } from 'element-plus'
import { ElMessage } from 'element-plus'
import localCache from '../../utils/cache'
import { editUserInfo } from '../../service/user/user'

export default defineComponent({
  name: 'Avatar',
  props:{
      headImgUrl:{
          type:String,
      }
  },
  setup(props, content) {
    const circleUrl = ref()
    const action = 'http://192.168.1.68:8080/cos/upload'

    circleUrl.value=props.headImgUrl
    const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
      console.log(uploadFile, uploadFiles)
    }
    const handleAvatarSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
        
    //   if (response.data.success) {
        circleUrl.value = response.data.fileBaseUrl + response.data.filePath
        update()
    //   }
    }
    async function update() {
        const data = await editUserInfo({
            headImgUrl:circleUrl.value
        })
        console.log(data)
    }
    const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
      if (rawFile.type !== 'image/jpeg') {
        ElMessage({
          message: '请上传jpeg、jpg、png',
          type: 'warning',
        })
        return false
      } else if (rawFile.size / 1024 / 1024 > 2) {
        ElMessage.error('Avatar picture size can not exceed 2MB!')
        return false
      }
      return true
    }
    const headerObj = { token: 'zzl_' + localCache.getCache('token') }
    return {
      circleUrl,
      handleRemove,
      action,
      headerObj,
      handleAvatarSuccess,
    }
  },
})
</script>

<style scoped lang="less">
.Avatar {
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>
