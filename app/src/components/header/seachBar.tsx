import { HeaderSearch, HeaderSearchButton, HeaderSearchInput, HeaderSearchItems ,BtnClean} from "@/styles/header.style"
import {  useState } from "react"


type Props = {
    searchEvent:SearchEvent
    initialValue?:string
}

type SearchEvent = (params:string,redirect?:boolean)=>void


export const SearchBar = ({searchEvent,initialValue}:Props)=>{
    const [searchValue,setSearchValue] = useState<string>( initialValue ?? "")
    const onClick = (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
      
        if(searchValue.length ===0)return;

        searchEvent( searchValue ,true)
        
    }
   const clear = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        searchEvent('')
        setSearchValue('')
    }
    return (
        <HeaderSearch onSubmit={(e)=>onClick(e)} className="search" name="form_search">
            <HeaderSearchItems className="search-items">
                <HeaderSearchInput value={searchValue} 
                    onChange={(e)=>setSearchValue(e.target.value)}
                    name="input_search"  minLength={2} maxLength={20}
                    className="input_search"
                    placeholder="FAÇA UMA BUSCA"/>
                 {searchValue && (
                    <BtnClean 
                    onMouseDown={(e) => e.preventDefault()}
                    className="btn_clear_search"
                     type="button" onClick={clear}>
                        X
                    </BtnClean>
                    )}
                <HeaderSearchButton 
                    className="btn_search" 
                    name="btn_search" 
                    type="submit" >
                        BUSCAR
                </HeaderSearchButton>
            </HeaderSearchItems>
        </HeaderSearch>
    )
}