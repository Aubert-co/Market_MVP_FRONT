import {   useState } from "react"
import type { DatasSelect } from "@/types/filters.types";
import { SelectInput } from "@/styles/store/index.style";


export type Props<T extends string | number> = {
    datas: DatasSelect<T>[];
    text?: string;
    className?:string,
    name:string,
    initialValue ?:T
    cbSelected?:(value:T)=>void
};
export const useSelect = <T extends string,>({datas,text,className,name,initialValue,cbSelected}:Props<T>)=>{
    const [selected,setSelected] = useState<T >(initialValue ?? datas[0].value)
   
    const onChange = (value:T)=>{
        setSelected(value)
        cbSelected?.(value)
     
    }
    const Select = ()=>{
        return (
       <SelectInput
            name={name}
            className={className}
            value={selected ?? ""}
            onChange={(e) => onChange(e.target.value as T)}
            aria-label={text}
            >
            <option value="" disabled>
                {text}
            </option>

            {datas.map((val, index) => (
                <option value={val.value} key={index}>
                {val.text}
                </option>
            ))}
        </SelectInput>
        )
    }
    return {selected,setSelected,Select}
}