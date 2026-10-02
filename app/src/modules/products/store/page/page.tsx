import { ContainerDashboard } from "@/components/layouts/containerDashboard"
import { usePagination } from "@/hooks/usePagination"
import {  ProductTable } from "../components/table"
import { SearchBar } from "@/components/header/seachBar"
import { Controls } from "@/styles/store/dashboard.style"
import {  useState } from "react"
import type { Product } from "@/modules/products/user/types"
import { selectMenuItem } from "@/constants/menuItems"
import { useModal } from "@/hooks/useModal"

import { useSideBarOrDrawer } from "@/hooks/useSidebarOrDrawer"
import Sidebar from "@/components/shared/sidebar"
import { Drawer } from "@/components/shared/drawer"
import { DashboardHeader } from "@/modules/store/components/dashboardHeader"
import { useStoreProducts } from "@/modules/products/store/hooks/useProducts"
import { useSearch } from "@/hooks/useSearch"
import { useProductDrawer } from "@/modules/products/store/hooks/useProductDrawer"
import { useUrlParams } from "@/modules/products/store/hooks/useUrlParams"
import {  useSelectCategory, useSelectProductOptions, useSelectStockOptions } from "@/modules/products/store/hooks/useSelectFilters"
import { getStorageStore } from "@/modules/store/user/storage/store.storage"
import { categorySelectOptions, PRODUCT_SORT_OPTIONS, STOCK_SORT_OPTIONS } from "@/constants/filters"
import { Select } from "@/components/shared/select"
import type { CategoryOption, OrderBy } from "@/types/filters.types"
import { PrimaryButton } from "@/styles/shared.style"
import { ProductDetailModal } from "../components/productDetailModal"
import { HandlerFormUpsetProduct } from "../components/formUpsertProduct"



export const StoreProducts = ()=>{  

    const {changePage,searchQuery,urlPage} = useUrlParams()

    const {onChangeProductOrderBy,orderProductBy} = useSelectProductOptions()
    const  {onChangeStockOrderBy,stockSort} = useSelectStockOptions()
    const {categories,onChangeCategory} = useSelectCategory()
  
    const [productModal,setProductModal] = useState<{datas:Product[]}>({
        datas:[]
    })
    const {setIsOpen:setSidebarOrDrawer,isOpen:sidebarOrDrawer}=useSideBarOrDrawer()
   

    const {Pagination,setPagesInfos,pageInfos} = usePagination(changePage,urlPage)

    const {searchEvent,searchProduct} = useSearch({mode:'update',initialValue:searchQuery})
   
    const {products} = useStoreProducts({
        nextPage:pageInfos,category:categories,searchProduct,
        setPagesInfos,priceOrder:orderProductBy,stockOrder:stockSort
    })
    
    const {closeModal:closeModalProduct,openModal:modalProduct,Modal:ModalListProduct} = useModal({modalLocation:"center"})
    
    const {drawerType,openCreateProductDrawer,openUpdateProductDrawer,upsertProduct} = useProductDrawer({
        closeModalProduct,
        setSidebarOrDrawer
    })
   
    const showProductModal = (product:Product[])=>{
        setProductModal({datas:product})
        modalProduct()
    }
    const storeInfo = getStorageStore()
    const titleDrawer = drawerType === "create" ? "Criar produto" : "Editar produto"

    const isDrawerOpen = sidebarOrDrawer === "drawer";
    const isSidebarOpen = sidebarOrDrawer === "sidebar";
    return (
        <ContainerDashboard 
            isSidebarOpen={isSidebarOpen}
            >
                <Sidebar storeName={storeInfo.name} 
                    setOpen={setSidebarOrDrawer} 
                    items={selectMenuItem("Produtos")} 
                    isOpen={sidebarOrDrawer==="sidebar"}/>

                <Drawer title={titleDrawer} onClose={setSidebarOrDrawer} isOpen={isDrawerOpen} >
                        <HandlerFormUpsetProduct 
                            editRefs={upsertProduct}
                            type={drawerType}
                            onCancel={setSidebarOrDrawer}
                        />
                </Drawer>
            <main>
                <DashboardHeader 
                    title="Produtos"
                    subTitle="Gerencie seu catálogo, atualize informações 
                    e acompanhe o desempenho dos seus itens."

                    />
                <Controls>
                    <SearchBar searchEvent={searchEvent} initialValue={searchQuery} />
                    <div className="field-group">
                        <label>Categoria</label>
                        <Select<CategoryOption>
                        datas={categorySelectOptions}
                        name="select-category"
                        text="Selecione uma categoria"
                        onChange={onChangeCategory}
                        selected={categories}
                        />
                    </div>

                    <div className="field-group">
                        <label>Preço</label>
                        <Select<OrderBy>
                        datas={PRODUCT_SORT_OPTIONS}
                        name="select-filter"
                        text="Ordenar por preço"
                        selected={orderProductBy}
                        onChange={onChangeProductOrderBy}
                        />
                    </div>

                    <div className="field-group">
                        <label>Estoque</label>
                        <Select<OrderBy>
                        datas={STOCK_SORT_OPTIONS}
                        name="select-filter-stock"
                        text="Ordenar por estoque"
                        selected={stockSort}
                        onChange={onChangeStockOrderBy}
                        />
                    </div>

                    {!isDrawerOpen && (
                        <div className="field-group ">
                            <PrimaryButton onClick={openCreateProductDrawer}>Criar Produto</PrimaryButton>
                        </div>
                    )}
                    </Controls>
                
                <ProductTable openModal={showProductModal} products={products.datas}/>
                <Pagination/>
                
                <ModalListProduct title="Detalhes do produto">
                    <ProductDetailModal showEditModal={openUpdateProductDrawer} products={productModal.datas}/>
                </ModalListProduct>
            </main>
        </ContainerDashboard>
    )
}