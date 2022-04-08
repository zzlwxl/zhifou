export const articleRules = {
    articleTitle: [
      {
        required: true,
        message: '请输入文章标题',
        trigger: 'blur'
      },
    ],
    articleContent: [
      {
        required: true,
        message: '请输入文章内容',
        trigger: 'blur'
      },
    ],
    articleState: [
        {
          required: true,
          message: '请选择状态',
          trigger: 'change',
        },
      ],
  }