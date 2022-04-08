export const userRules = {
    code: [
        { required: true, message: '请输入验证码', trigger: 'blur' },
        { min: 6, max: 6, message: '请输入6位验证码', trigger: 'blur' },
    ],
    passWord: [
        { required: true, message: '请输入新密码', trigger: 'blur' },
        { pattern: /^[a-z0-9]{3,}$/, message: '密码必须是8位以上的字母或者数字', trigger: 'blur' },
    ],

}

