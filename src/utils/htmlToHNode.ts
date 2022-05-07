let hMap={
    'H1': 'heading-1-1',
    'H2': 'heading-2-1',
    'H3': 'heading-3-1',
    'H4': 'heading-4-1',
    'H5': 'heading-5-1',
}
//创建标题节点
class CreateCataMap{
    hName:string;
    label:string;
    hType:string;
    children:[]
    constructor(hName:string,label:string,hType:string,children:[]){
        this.hName = hName
        this.label = label
        this.hType = hType
        this.children = children
    }
}
export interface Idata{
    cataList:any[],
    domStr:string
}
export interface IResponse{
    data:Idata,
    success:boolean,
    msg:string
}
//返回数据
class ResponseData{
    data:Idata={
        cataList:[],
        domStr:''
    }
    success:boolean
    msg:string
    constructor(success:boolean,msg:string,parData:Idata){
        this.success = success
        this.msg = msg
        this.data.cataList= parData.cataList
        this.data.domStr=parData.domStr
    }
}
function searchParent(cataList:any[],cataItemMap:CreateCataMap,insertIndex:number):ResponseData{
    let tmpInsertIndex=0
    let tmpCataList:any[]=cataList
    while(tmpCataList && tmpInsertIndex <= insertIndex){
        if(tmpCataList.length > 1){
            tmpCataList=[tmpCataList[tmpCataList.length-1]]
        }else if(tmpCataList.length===1){
            tmpCataList=tmpCataList[0].children
            tmpInsertIndex++
        }else{
            return new ResponseData(false, `${cataItemMap.hType}-${cataItemMap.label}位置有错,没有遵守标题的顺序/包含关系.`,{cataList,domStr:''})
        }
    }
    tmpCataList.push(cataItemMap)
    return new ResponseData(true,'搜索成功',{cataList,domStr:''})
}
export function htmlToHNode(data:string):IResponse{
    let objElement=document.createElement('div')
    objElement.innerHTML=data
    let docChildren=objElement.childNodes
    let count = 0
    //平铺后的目录数据
    let strList = []
    let cataList:any[] = []
    let len = 0
    let isHaveError=false
    let dataError:ResponseData={
        success:true,
        msg:'操作成功',
        data:{
            cataList:[],
            domStr:''
        }
    }
    // debugger
    Array.from(docChildren).forEach(item=>{
        if(prop(hMap,item.nodeName as 'H1')){
            strList=String(hMap[item.nodeName as 'H1']).split('-')
            //递增标签值
            count=Number(strList[2])+1;
            (item as HTMLHeadingElement).setAttribute('id',hMap[item.nodeName as 'H1'])
            switch(item.nodeName){
                case 'H1':
                    const cataItem1Map=new CreateCataMap(hMap[item.nodeName as 'H1'],(item as HTMLHeadingElement).innerText as string,item.nodeName as string,[])
                    cataList.push(cataItem1Map)
                    break
                case 'H2':
                    const cataItem2Map=new CreateCataMap(hMap[item.nodeName as 'H2'],(item as HTMLHeadingElement).innerText as string,item.nodeName as string,[])
                    const data2= searchParent(cataList,cataItem2Map,0)
                    if(!data2.success){
                        isHaveError=true
                        dataError= data2
                    }
                    break
                case 'H3':
                    const cataItem3Map=new CreateCataMap(hMap[item.nodeName as 'H3'],(item as HTMLHeadingElement).innerText as string,item.nodeName as string,[])
                    const data3= searchParent(cataList,cataItem3Map,1)
                    if(!data3.success){
                        isHaveError=true
                        dataError= data3
                    }
                    break
                case 'H4':
                    const cataItem4Map=new CreateCataMap(hMap[item.nodeName as 'H4'],(item as HTMLHeadingElement).innerText as string,item.nodeName as string,[])
                    const data4= searchParent(cataList,cataItem4Map,2)
                    if(!data4.success){
                        isHaveError=true
                        dataError= data4
                    }
                    break
                case 'H5':
                    const cataItem5Map=new CreateCataMap(hMap[item.nodeName as 'H5'],(item as HTMLHeadingElement).innerText as string,item.nodeName as string,[])
                    const data5= searchParent(cataList,cataItem5Map,3)
                    if(!data5.success){
                        isHaveError=true
                        dataError= data5
                    }
                    break
                default:
                    return new ResponseData(false, '操作失败',{cataList,domStr:''})
            }
            //更新map里的标签值,方便下次使用
            hMap[item.nodeName as 'H1']=strList[0] + '-' + strList[1] + '-' + count
        }
        
    })
    //至少有一处错误,则返回报错对象
    if(isHaveError){
        return dataError
    }else{
        //返回正常的对象
        return new ResponseData(true, '操作成功',{cataList,domStr:domToStr(objElement)})
    }
}
function domToStr(node:HTMLDivElement):string{
     return node.innerHTML
}
function prop<T extends object,k extends keyof T>(obj:T,key:k){
    return obj[key]
}