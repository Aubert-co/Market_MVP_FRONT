import type {  OrderBy } from "@/types/filters.types"


import { checkIsAValidCategory, checkIsAValidNumber } from "@/utils/checkIsValid"
export const filterParams = (searchParams:URLSearchParams)=>{
  const category = searchParams.get("category")
  const maxPrice = searchParams.get("maxPrice")
  const minPrice =  searchParams.get("minPrice")
  const orderBy = searchParams.get("orderBy")
  const productName = searchParams.get("q")
  const maxPriceNm = checkIsAValidNumber(maxPrice) ? Number(maxPrice) : ""
  const minPriceNm = checkIsAValidNumber(minPrice) ? Number(minPrice) : ""
  const od:OrderBy = orderBy === "asc" ? "asc" : "desc"
  const matchCategories = checkIsAValidCategory(category) ? category : undefined
  
  return {
    category:matchCategories ?? "Todas",
    orderBy:od,productName,
    maxPrice:maxPriceNm ?? 0,
    minPrice:minPriceNm ?? 0
  }
}