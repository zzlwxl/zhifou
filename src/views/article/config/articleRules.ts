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
        required: false,
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

  export const editArticleRules = {
    articleTitle: [
      {
        required: false,
        message: '请输入文章标题',
        trigger: 'blur'
      },
    ],
    articleContent: [
      {
        required: false,
        message: '请输入文章内容',
        trigger: 'blur'
      },
    ],
    articleState: [
        {
          required: false,
          message: '请选择状态',
          trigger: 'change',
        },
      ],
  }