export enum WsMsgType{
    MESSAGE='MESSAGE',
    BROADCAST_MESSAGE="BROADCAST_MESSAGE"
}
export interface IWsMsg<T=any>{
    event:WsMsgType,
    data:T,
    time:Date,
    userId:string
}