//防抖函数
export function debounce(fun:()=>void, wait:number, flag = false) {
    let timer:any = null
    return function () {
      if (timer) clearTimeout(timer)
      if (flag) {
        let call = !timer
        timer = setTimeout(() => {
          timer = null
        }, wait)
        if (call) fun()
      } else {
        timer = setTimeout(() => {
          fun()
          timer = null
        }, wait)
      }
    }
  }