import { ElNotification } from 'element-plus'
class message{
    success(tips:string) {
        ElNotification.success({
            message: tips,
            showClose: true,
            duration:1500
        })
    }
    warning(tips:string) {
        ElNotification.warning({
            message: tips,
            showClose: true,
            duration:1500
        })
    }
    error(tips:string) {
        ElNotification.error({
            message: tips,
            showClose: true,
            duration:1500
        })
    }
    info(tips:string) {
        ElNotification.info({
            message: tips,
            showClose: true,
            duration:1500
          })
    }
}
export default new message