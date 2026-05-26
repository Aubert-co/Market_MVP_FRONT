import { useSearchParams } from "react-router-dom"
import { checkIsAValidNumber, containsValues } from "@/utils/checkIsValid"
import { createUrlUpdater } from "@/utils"
import type { Category, CategoryOption, OrderBy } from "@/types/filters.types"
import type { OrderStatus } from "@/types/storeDashboard.types"
import { allCategoriesOption, SORT_OPTIONS } from "@/constants/filters"

export const useUrlParams = ()=>{
    const [searchParams,setSearchParams] = useSearchParams()
    
    const searchQuery = searchParams.get("q") ?? undefined;
    const rawStockOrderBy = searchParams.get("stock_order")
    const stockOrderBy = containsValues<OrderBy>(rawStockOrderBy,SORT_OPTIONS) ? rawStockOrderBy : "asc"
    const rawCategory = searchParams.get("categoria") 
    const urlCategory = containsValues<CategoryOption>(rawCategory,allCategoriesOption) ? rawCategory : "Todas"
    const rawOrderby = searchParams.get('orderby')
    const urlOrderby = containsValues<OrderBy>(rawOrderby,SORT_OPTIONS) ? rawOrderby : "asc" 
    const rawPage = searchParams.get('page') ?? undefined
    const urlPage = checkIsAValidNumber(rawPage) ? Number(rawPage) : undefined
    const updateUrlParams = createUrlUpdater(setSearchParams)

    const changePage = (newPage: number) => {
        updateUrlParams('page',newPage.toString());
    };
    const changeUrlCategory = (category:Category)=>{
        updateUrlParams('categoria',category)
    }
    const changeUrlOrderby = (orderby:OrderBy)=>{
        updateUrlParams('price_order',orderby)
    }
    const changeUrlOrderStatus = (orderStatus:OrderStatus)=>{
        updateUrlParams('status',orderStatus)
    }
    const changeStockOrderBy = (orderBy:OrderBy)=>{
        updateUrlParams("stock_order",orderBy)
    }
    return {
        urlCategory,urlOrderby,searchQuery,stockOrderBy,
        changePage,changeUrlCategory,changeUrlOrderby,
        urlPage,changeUrlOrderStatus,changeStockOrderBy
    }
}