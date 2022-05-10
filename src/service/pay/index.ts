import zzlRequest from "../index";

import {IDataType,IPay} from './type'

enum Pay{
  wxNativePay="/test/h5Pay",
  aliNativePay="/pay/nativeAliPay"
}
export function aliPay(data:IPay){
  return zzlRequest.post<IDataType>({
    url:Pay.aliNativePay,
    data
  })
}
export function wxPay(data:IPay){
  return zzlRequest.post<IDataType>({
    url:Pay.wxNativePay,
    data
  })
}

