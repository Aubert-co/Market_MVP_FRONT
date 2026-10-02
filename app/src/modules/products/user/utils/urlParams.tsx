import type {   SetURLSearchParams } from "react-router-dom"
export const setUrlParams = (setSearchParams:SetURLSearchParams,param:string)=>{
  return (value:string)=>{
    setSearchParams((prev)=>{
      const url = new URLSearchParams(prev)
      url.set(param,value)
      return url
    })
  }
}

export const deleteUrlParams = (setSearchParams:SetURLSearchParams)=>{
    return (params:string[])=>{
        setSearchParams((prev) => {
            const url = new URLSearchParams(prev)
            params.forEach((val)=>{
                url.delete(val)
            })
            return url
        })
    }
}
