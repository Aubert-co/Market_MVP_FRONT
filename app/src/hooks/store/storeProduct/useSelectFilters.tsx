import { useSelect } from "@/hooks/useSelect";
import type {  CategoryOption, OrderBy } from "@/types/filters.types";
import { useUrlParams } from "./useUrlParams";
import { PRODUCT_SORT_OPTIONS } from "@/constants/filters";
import { useState } from "react";

export const useSelectFilters = ()=>{
    const {urlOrderby,changeUrlOrderby} = useUrlParams()

        
    const {Select:SelectOrderBy,selected:filterBy} = useSelect<OrderBy>({
        datas:PRODUCT_SORT_OPTIONS,text:'Selecione um filtro',
        name:"select-filter",cbSelected:changeUrlOrderby,
        initialValue:urlOrderby
    })
    return {
        SelectOrderBy,
        filterBy
     
    }
}
export const useSelectProductOptions = ()=>{
    const {urlOrderby,changeUrlOrderby} = useUrlParams()
    const [orderProductBy,setOrderProductBy] = useState<OrderBy>( urlOrderby ?? "asc")
    
    const onChangeProductOrderBy = (e: React.ChangeEvent<HTMLSelectElement>)=>{
        const value = e.target.value as OrderBy
        changeUrlOrderby(value)
        setOrderProductBy(value)
    }
    return {
        onChangeProductOrderBy,orderProductBy
    }
}
export const useSelectStockOptions = ()=>{
    const {changeStockOrderBy,stockOrderBy} = useUrlParams()
    const [stockSort,setStockSort] = useState<OrderBy>( stockOrderBy ?? "asc")
    
    const onChangeStockOrderBy = (e: React.ChangeEvent<HTMLSelectElement>)=>{
        const value = e.target.value as OrderBy
        changeStockOrderBy(value)
        setStockSort(value)
    }
    return {
        onChangeStockOrderBy,stockSort
    }
}
export const useSelectCategory = ()=>{
    const {urlCategory,changeUrlCategory} = useUrlParams()
    const [categories,setCategories] = useState<CategoryOption>(urlCategory ?? "Todas")

    const onChangeCategory = (e: React.ChangeEvent<HTMLSelectElement>)=>{
        const value = e.target.value as CategoryOption 
        changeUrlCategory(value)
        setCategories( value )
    }
    return {
        onChangeCategory,categories
    }
}