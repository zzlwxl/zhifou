export enum WsMsgType{
    MESSAGE='MESSAGE',
    BROADCAST_MESSAGE="BROADCAST_MESSAGE",
    TEST="TEST",
}
export interface IWsMsg<T=any>{
    event:WsMsgType,
    data:T,
    time:Date,
    userId:string
}