// 环境的切换
let BASE_URL = ''
const TIME_OUT = 10000
if (process.env.NODE_ENV == 'development') {
  BASE_URL = 'http://192.168.1.68:8080';
} else if (process.env.NODE_ENV == 'debug') {
  BASE_URL = '';
} else if (process.env.NODE_ENV == 'production') {
  BASE_URL = '';
} else {
  //test 单元测试
  BASE_URL = '';
}

export { BASE_URL, TIME_OUT }