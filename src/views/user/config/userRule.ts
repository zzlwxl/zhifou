export const userRules = {
    userName: [
      {
        required: true,
        message: '用户名是必传内容~',
        trigger: 'blur'
      },
    ],
    nickName: [
      {
        required: true,
        message: '请输入别名',
        trigger: 'blur'
      },
    ],
    phoneNum: [
      {
        required: true,
        message: '请输入手机号',
        trigger: 'blur'
      },
      {
        pattern: /^\+86(1[0-9])\d{9}$/,
        message: '手机号格式+8615555555555',
        trigger: 'blur'
      }
    ],
    email: [
      {
        required: true,
        message: '请输入邮箱',
        trigger: 'blur'
      },
      {
        pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
        message: '请输入正确的邮箱',
        trigger: 'blur'
      }
    ],
    sex: [
        {
          required: true,
          message: '请选择性别',
          trigger: 'change',
        },
      ],
  }

  