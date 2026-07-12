import type { NavigateMode } from "@/components/header/topBar";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom"
type Params = {
    mode:NavigateMode
    initialValue?:string
}
export const useSearch = ({mode,initialValue}:Params)=>{

   
    const [searchParams, setSearchParams] = useSearchParams();
    if(!initialValue && mode ==="update"){
        const newParams = new URLSearchParams(searchParams)
        const q = newParams.get("q")
    
        initialValue = q ?? ""
    }
    const [searchProduct,setSearchProduct] = useState<string>(initialValue ?? "")

    const navigate = useNavigate()
    const searchEvent = (search:string,redirect?:boolean)=>{

        if(mode === "navigate" && redirect){
            navigate({
                pathname: "/buscas",
                search: new URLSearchParams({ q: search }).toString()
            });
            
        }
        if(mode === "update"){
            const newParams = new URLSearchParams(searchParams);
            newParams.set("q", search);
            
            setSearchParams(newParams);
            setSearchProduct(search)
        }
    }
    return {
        searchProduct,setSearchProduct,
        searchEvent
    }
}