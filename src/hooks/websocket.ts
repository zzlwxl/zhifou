
function useWebSocket(handleMessage:(e:any)=>void,url:string) {
  const ws = new WebSocket(url)
  const init = () => {
    bindEvent()
  }
  function bindEvent() {
    ws.addEventListener('open', handleOpen, false)
    ws.addEventListener('close', handleClose, false)
    ws.addEventListener('error', handleError, false)
    ws.addEventListener('message', handleMessage, false)
  }
  function handleOpen(e:any) {
    console.log('websocket open',e)
  }
  function handleClose(e:any) {
    console.log('websocket close')
  }
  function handleError(e:any) {
    console.log('websocket error',e)
  }
  init()
  return ws
}
export { useWebSocket }
