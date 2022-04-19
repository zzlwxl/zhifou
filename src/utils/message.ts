import { ElNotification } from 'element-plus'
class message{
    success(tips:string) {
        ElNotification.success({
            message: tips,
            showClose: false,
            duration:2000
        })
    }
    warning(tips:string) {
        ElNotification.warning({
            message: tips,
            showClose: false,
            duration:2000
        })
    }
    error(tips:string) {
        ElNotification.error({
            message: tips,
            showClose: false,
            duration:2000
        })
    }
    info(tips:string) {
        ElNotification.info({
            message: tips,
            showClose: false,
            duration:2000
          })
    }
}
export default new message