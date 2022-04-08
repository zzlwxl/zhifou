export const pwdRules = {
    oldPwd: [
      {
        required: true,
        message: '请输入旧密码',
        trigger: 'blur'
      },
      {
        pattern: /^[a-z0-9]{3,}$/,
        message: '密码必须是8位以上的字母或者数字~',
        trigger: 'blur'
      }
    ],
    pwd: [
      {
        required: true,
        message: '请输入新密码',
        trigger: 'blur'
      },
      {
        pattern: /^[a-z0-9]{3,}$/,
        message: '密码必须是8位以上的字母或者数字~',
        trigger: 'blur'
      }
    ],
  }