// 环境的切换
let BASE_URL = ''
const TIME_OUT = 10000
if (process.env.NODE_ENV == 'development') {
  BASE_URL = 'https://api.lddcc.cn';
} else if (process.env.NODE_ENV == 'debug') {
  BASE_URL = 'https://api.lddcc.cn';
} else if (process.env.NODE_ENV == 'production') {
  BASE_URL = 'https://api.lddcc.cn';
} else {
  //test 单元测试
  BASE_URL = '';
}

export { BASE_URL, TIME_OUT }