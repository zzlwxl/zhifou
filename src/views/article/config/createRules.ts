export const createRules = {
    categoryName: [
      {
        required: true,
        message: '请输入分类名',
        trigger: 'blur'
      },
    ],
    categoryAlias: [
      {
        required: true,
        message: '请输入分类别名',
        trigger: 'blur'
      },
    ],
  }