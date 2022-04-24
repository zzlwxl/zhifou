// 环境的切换
let BASE_URL = ''
let WS_URL=''
const TIME_OUT = 10000
if (process.env.NODE_ENV == 'development') {
  WS_URL='ws://192.168.1.68:8080/ws'
  // WS_URL='wss://api.lddcc.cn/ws'
  BASE_URL = 'http://192.168.1.68:8080';
  // BASE_URL = 'https://api.lddcc.cn';
} else if (process.env.NODE_ENV == 'debug') {
  WS_URL='ws://api.lddcc.cn:8080/ws'
  BASE_URL = 'https://api.lddcc.cn';
} else if (process.env.NODE_ENV == 'production') {
  WS_URL='ws://api.lddcc.cn:8080/ws'
  BASE_URL = 'https://api.lddcc.cn';
  alert('网站还在开发中...')
} else {
  //test 单元测试
  BASE_URL = '';
}

export { BASE_URL, TIME_OUT ,WS_URL}