import { SelectInput } from "@/styles/store/index.style";
import type { DatasSelect } from "@/types/filters.types";

export type Props<T extends string | number> = {
    datas: DatasSelect<T>[];
    text?: string;
    className?:string,
    name:string,
    onChange:(e: React.ChangeEvent<HTMLSelectElement>)=>void
    selected:T
};

export const Select = <T extends string,>({datas,text,className,onChange,name,selected}:Props<T>)=>{
    return <SelectInput
        name={name}
        className={className}
        value={selected ?? ""}
        onChange={onChange}
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
    
        
}