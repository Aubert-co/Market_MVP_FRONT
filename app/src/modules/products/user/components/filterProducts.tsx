import { InputWithLabel } from "@/components/forms/inputWithLabel"
import { useSelect } from "@/hooks/useSelect"
import {  categorySelectOptions } from "@/constants/filters"
import type { Filter, OrderBy,CategoryOption,DatasSelect } from "@/types/filters.types"
import {   useState, type SetStateAction } from "react"
import { useSearchParams } from "react-router-dom"
import { deleteUrlParams, setUrlParams } from "@/modules/products/user/utils/urlParams"
import { FilterProductsContainer } from "../styles/index.styles"



type Props = {
  setValues:React.Dispatch<SetStateAction<Filter>>,
  values:Filter
}
const DATASORDERBY = [{value:'asc',text:'menor preço'},{value:'desc',text:'maior preço'}] as DatasSelect<OrderBy>[];



export const FilterProducts = ({setValues,values}:Props)=>{
    const [,setSearchParams] = useSearchParams()
   
    const setCategoryParams = setUrlParams(setSearchParams,"category")
    const setOrderByParams = setUrlParams(setSearchParams,"orderBy")
    const setMaxPriceParams = setUrlParams(setSearchParams,"maxPrice")
    const setMinPriceParams = setUrlParams(setSearchParams,"minPrice")
    const deleteSearchParams = deleteUrlParams(setSearchParams)
    const {Select:SelectCategory,selected:category,setSelected:setCategory} = useSelect<CategoryOption>(
        {datas:categorySelectOptions,text:'Selecione uma categoria',className:"select-category",
          name:"filter-category",initialValue:values.category,
          cbSelected:setCategoryParams
    });

    const {Select:SelectOrderBy,selected:orderBy,setSelected:setOrder} = useSelect<OrderBy>(
        {datas:DATASORDERBY,text:'Ordene por',className:"order-by",name:"filter-orderby"
          ,cbSelected:setOrderByParams
        });
  
    const [minPrice,setMinPrice] = useState<number | string>(values.minPrice ?? "")
    const [maxPrice,setMaxPrice] = useState<number | string >(values.maxPrice ?? "")

    const onChangeMaxPrice = (value:string)=>{
        setMaxPrice(value)
        setMaxPriceParams(value)
    }
    const onChangeMinPrice = (value:string)=>{
      setMinPrice(value)
      setMinPriceParams(value)
    }
   
    const onClick = (e:React.FormEvent<HTMLFormElement>)=>{
      e.preventDefault()
      
      setValues({
        category,
        orderBy,
        maxPrice:Number(maxPrice) , 
        minPrice:Number(minPrice) 
      })
      
    }
    const onClean = ()=>{
      setCategory("Todas")

      deleteSearchParams(["category","maxPrice","orderBy","minPrice"])
     
      setOrder("asc")
      setMinPrice("")
      setMaxPrice("")
     
    }
    return(
        <FilterProductsContainer onSubmit={onClick} className="filter-products">
           
            <InputWithLabel textLabel="ordernar por:" inputName="checkboxes">
                <SelectOrderBy/>
            </InputWithLabel>
            <InputWithLabel textLabel="Preço minimo:" inputName="min-price">
                <input  placeholder="0" data-testid="min-price" type="number"
                onChange={(e)=>onChangeMinPrice(e.target.value)} name="min-price"
                value={minPrice}
                />
            </InputWithLabel>

            <InputWithLabel textLabel="Preço maximo:" inputName="max-price">
                <input placeholder="0" 
                  data-testid="max-price" 
                  name="max-price" 
                  type="number" 
                  onChange={(e)=>onChangeMaxPrice(e.target.value)}
                  value={maxPrice}
                  />
            </InputWithLabel>
            <InputWithLabel textLabel="Selecione uma categoria:" inputName="">
                <SelectCategory/>
            </InputWithLabel>
            <div className="btn-actions">
                <button type="submit">Enviar</button>
                <button type="button" onClick={onClean}>Limpar</button>
            </div>
        </FilterProductsContainer>
    )
}