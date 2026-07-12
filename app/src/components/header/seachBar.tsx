import {  useState } from "react"
import styled from "styled-components"


type Props = {
    searchEvent:SearchEvent
    initialValue?:string
}

type SearchEvent = (params:string,redirect?:boolean)=>void

const BtnClean = styled.button`
 background: transparent;
  border: none;
  outline: none;
  cursor: pointer;

  font-size: 14px;
  font-weight: 600;
  color: #666;

  padding: 0;
  margin-right: 8px;

  line-height: 1;
  
`
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
        <form onSubmit={(e)=>onClick(e)} className="search" name="form_search">
            <div className="search-items">
                <input value={searchValue} 
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
                <button className="btn_search" name="btn_search" type="submit" >BUSCAR</button>
            </div>
        </form>
    )
}