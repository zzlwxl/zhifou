export function checkPhone(value:string){
    if(value.charAt(0)==='+'){
      return value
    }else{
      return '+86'+value
    }
  }