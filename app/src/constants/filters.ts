import type { CategoryOption ,DatasSelect, FilterCoupons, OrderBy,  SelectOrderStatus} from "@/types/filters.types";

export const categories = [
  "Roupas",
  "Eletrônicos",
  "Livros",
  "Brinquedos",
  "Beleza",
  "Esporte",
  "Automotivo",
  "Cozinha",
  "Celulares",
  "Informática",
  "Jardim",
  "Petshop",
  "Mercearia",
  "Moda",
  "Acessórios"
];

export const allCategoriesOption = ['Todas',...categories] satisfies CategoryOption[]

export const categorySelectOptions = allCategoriesOption.map((val)=>{
  return { text:val,value:val}
}) as DatasSelect<CategoryOption>[]

export const SORT_OPTIONS = [
"asc","desc"
] satisfies OrderBy[];

export const PRODUCT_SORT_OPTIONS: DatasSelect<OrderBy>[] = [
  { value: "asc", text: "Menor preço" },
  { value: "desc", text: "Maior preço" },
  
];

export const STOCK_SORT_OPTIONS: DatasSelect<OrderBy>[]=[
  { value: "asc", text: "Menor estoque" },
  { value: "desc", text: "Maior estoque" },
]

export const ORDER_STATUS_OPTIONS:SelectOrderStatus[] = [
  {text:'completo',value:'completed'},
  {text:'pendente',value:'pending'},
  {text:'cancelado',value:'cancelled'}
]
export const COUPON_STATUS_ARRAY:FilterCoupons[] = [
  "active","expired","all"
]
export const ORDER_COUPON_STATUS:DatasSelect<FilterCoupons>[] = [
  {text:"cupons ativos",value:"active"},
  {text:"cupons expirados",value:"expired"},
  {text:"Todas",value:"all"}
]