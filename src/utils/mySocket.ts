import {useWebSocket} from '../hooks'
// import {WS_ADDRESS} from '../configs/index'
import {WS_URL} from '../service/request/config'
import { useStore } from 'vuex'
import localCache from '../utils/cache'

export function anonymousSocket(a:(e:any)=>void,state:string){
    let url=`${WS_URL}/anonymous?state=${state}`
    const ws=useWebSocket(a,url)
    return ws
}
export function userSocket(id:string,a:(e:any)=>void){
    const token=localCache.getCache('token')
    if(token){
        let url=`${WS_URL}/${id}?token=${token}`
        const ws=useWebSocket(a,url)
        return ws
    }
}
