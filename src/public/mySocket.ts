import {userSocket} from '../utils/mySocket'
import { IWsMsg,WsMsgType } from './type';

export class MySocket{
    public static socket:any;
    public static userId:string
    public static funList:((data:any)=>void)[]=[(e)=>{}];
    
    static init(id:string,a:(e:any)=>void){
        if(!MySocket.socket){
            MySocket.socket = userSocket(id,MySocket.callback)
            MySocket.userId=id
        }
        setTimeout(() => {
            MySocket.sendMessage('wxl')
        }, 1000);
    }                                                                                                                                                            
    //指定消息类型
    static sendMessage(message:string){
        MySocket.send(WsMsgType.MESSAGE,message)
    }
    //调用者重新指定消息类型
    static send(event:WsMsgType,data:any){
        if(!MySocket.socket){
            return
        }
        let msg:IWsMsg={
            event,
            data,
            userId:MySocket.userId,
            time:new Date()
        }
        MySocket.socket.send(JSON.stringify(msg))
    }
    static callback(e:any){
        let data=JSON.parse(e.data)
        MySocket.funList.forEach((fun)=>{
            fun(data)
        })
    }
    static finish() {
        MySocket.socket=null
    }
}