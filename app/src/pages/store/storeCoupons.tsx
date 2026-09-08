import { FormCreateCoupon } from "@/components/forms/formCreateCoupon"
import { ContainerDashboard } from "@/components/layouts/containerDashboard"
import { Drawer } from "@/components/shared/drawer"
import Sidebar from "@/components/shared/sidebar"
import { CouponTable } from "@/components/store/couponTable"
import { DashboardHeader } from "@/components/store/dashboardHeader"
import { selectMenuItem } from "@/constants/menuItems"
import { useCouponDatas } from "@/hooks/store/storeCoupons/useCouponDatas"
import { useSideBarOrDrawer } from "@/hooks/useSidebarOrDrawer"
import {  Controls } from "@/styles/store/dashboard.style"
import { PrimaryButton } from "@/styles/shared.style"
import { Select } from "@/components/shared/select"
import type { FilterCoupons } from "@/types/filters.types"
import { ORDER_COUPON_STATUS } from "@/constants/filters"
import  { useCouponSelect, useCouponsFilters } from "@/hooks/store/storeCoupons/useCouponsFilters"
import  { usePagination } from "@/hooks/usePagination"
import { useState } from "react"
import { getStorageStore } from "@/storage/store.storage"

export const StoreCoupons = ()=>{

  const {setIsOpen,isOpen} = useSideBarOrDrawer()
  const [refresh,setRefresh] = useState(0)
  const {changePage,couponStatus} = useCouponsFilters()
  const {Pagination,setPagesInfos,pageInfos}= usePagination(changePage);

   const {coupons,status}  = useCouponDatas({
    setPagesInfos,couponStatus,nextPage:pageInfos,refresh
   })
  const {onChange,selectOption}= useCouponSelect()
  const titleDrawer = "Criar cupom"
  const storeInfo = getStorageStore()
  
  const isDrawerOpen = isOpen === "drawer";
  const isSidebarOpen = isOpen === "sidebar";
  const createCoupon = ()=>{
    setIsOpen('drawer')
  }

  return (
      <ContainerDashboard isSidebarOpen={ isSidebarOpen} >
        <Sidebar 
          items={selectMenuItem("Cupons")}
          setOpen={setIsOpen}
          storeName={storeInfo.name}
          isOpen={ isSidebarOpen }/>

          <Drawer
            isOpen={ isDrawerOpen }
            title={titleDrawer}
            onClose={setIsOpen}
            >
              <FormCreateCoupon setRefreshDatas={setRefresh} setCloseDrawer={setIsOpen}/>
          </Drawer>

        <main>
            <DashboardHeader
              title="Gerenciamento de Cupons"
              subTitle="Crie e acompanhe os cupons promocionais da sua loja"
            />
            <Controls>
                <div className="field-group">
                <label>Status do Cupom </label>
                <Select<FilterCoupons>
                  datas={ORDER_COUPON_STATUS}
                  text="Filtrar por status"
                  name="coupon-status"
                  onChange={onChange}
                  selected={selectOption}
                />
              </div>
              { !isDrawerOpen && (
                <PrimaryButton onClick={createCoupon}>Criar Cupom</PrimaryButton>
              )
              }
 
            </Controls>
            <CouponTable status={status} coupons={coupons}/>
            <Pagination/>
        </main>
      </ContainerDashboard>
    )
}
