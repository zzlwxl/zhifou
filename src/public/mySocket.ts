import {userSocket} from '../utils/mySocket'
import { IWsMsg,WsMsgType } from './type';
import store from '../store';
import { watchEffect } from 'vue';
import message from '@/utils/message';


export class MySocket{
    public static socket:any;
    public static userId:string
    public static funList:((data:any)=>void)[]=[(e)=>{}];
    public static count=0
    public static connecting=false
    
    static init(id?:string){
        console.log('state',store.state.name)
        //    if(MySocket.socket && MySocket.socket.readyState===0) return;
        if(!MySocket.socket || MySocket.socket.readyState===3){
            if(id){
                MySocket.userId=id
            }
            if(MySocket.userId){
                MySocket.socket = userSocket(MySocket.userId,MySocket.callback)
                MySocket.count++
            }
        }
    }                                                                                                                                                            
    //指定消息类型
    static sendMessage(message:string){
        MySocket.send(WsMsgType.MESSAGE,message)
    }
    //心跳
    static liveHeart(){
        if(!MySocket.connecting && MySocket.socket.readyState===1){
            setInterval(()=>{
                MySocket.send(WsMsgType.TEST,'心跳')
            },10000)
        }
    }
    //调用者重新指定消息类型
    static send(event:WsMsgType,data:any){
        if(MySocket.socket&& MySocket.socket.readyState===1 && MySocket.connecting){
            MySocket.connecting=false
        }
        if(MySocket.connecting) return;
        if(MySocket.count>5){
            message.warning('[聊天功能]:超过最大连接次数') 
            return
        }
        if(!MySocket.socket || MySocket.socket.readyState!==1){
            MySocket.connecting=true
            MySocket.init()
            MySocket.send(event,data)
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
        MySocket.socket.close()
        MySocket.socket=null
    }
    static addFun(fun:(data:any)=>void){
        if(MySocket.funList){
            MySocket.funList.push(fun)
        }
    }
}