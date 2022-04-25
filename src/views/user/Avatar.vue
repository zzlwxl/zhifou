<template>
  <div class="Avatar">
    <el-avatar :size="50" :src="circleUrl ? circleUrl : $store.state.user.userInfo.headImgUrl" />
    <el-upload class="upload-demo" :headers="headerObj" :action="action" :on-success="handleAvatarSuccess" :show-file-list="false" :on-remove="handleRemove">
      <el-button style="margin-top:10px" type="primary">更改头像</el-button>
    </el-upload>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import type { UploadProps, UploadUserFile } from 'element-plus'
import message from '../../utils/message'
// import localCache from '../../utils/cache'
import  localCache from '@/utils/cache'
import {useStore} from '../../store/index'
import {BASE_URL} from '../../service/request/config'
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
    const store = useStore()
    const action = BASE_URL+'/cos/upload'

    circleUrl.value=props.headImgUrl
    const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
      console.log(uploadFile, uploadFiles)
    }
    const handleAvatarSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {

      if (response.success) {
        circleUrl.value = response.data.fileBaseUrl + response.data.filePath
        update()
        message.success('上传成功')
      }else{
        message.error(response.data)
      }
    }
    async function update() {
      console.log('update')
        const data = await editUserInfo({
            headImgUrl:circleUrl.value
        })
        if(data.success){
            store.commit('user/changeUserInfo',data.data)
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
