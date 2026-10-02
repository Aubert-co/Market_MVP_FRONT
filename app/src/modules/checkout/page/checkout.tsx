import { ListCheckoutItems } from "@/modules/checkout/components/listCheckoutItems"
import { SelectCoupon } from "@/modules/checkout/components/selectCoupon"
import { Container } from "@/components/layouts/container"
import { getItemsCheckout } from "@/modules/checkout/storage/checkout.storage"
import { useEffect,useState } from "react"
import type { BaseCoupon } from "@/modules/coupons/types/coupons.types"
import { ProductsCheckout } from "@/modules/checkout/styles"
import { FinishCheckout } from "@/modules/checkout/components/finishCheckout"
import type { ItemsCheckout } from "@/modules/checkout/types/checkout.types"
import { brlCurrency, getUserTotally } from "@/utils"

type StateCoupon = {
  item:BaseCoupon<number>
}


export const Checkout = ()=>{
  
    const [datas,setDatas] = useState({
      items:[] as ItemsCheckout[]
    })
    const [totally,setTotally] = useState( 0 )
    const [updateItems,setUpdate] = useState( true )
    const [coupon,setCoupon] = useState<StateCoupon> ({
      item:{} as BaseCoupon<number>
    })
    useEffect(()=>{
      
      const items = getItemsCheckout()
      setDatas({items})
      
      const sumTotally = getUserTotally({
        items,
        discount:coupon.item.discount,
        discountType:coupon.item.discountType
      })
      setTotally( sumTotally  )
      return()=>{
        setUpdate(false)
      }
    },[ updateItems ,coupon])

   
    return (
        <Container>
          
          <ProductsCheckout>
              <div className="list-buy">
                  <ListCheckoutItems setUpdate={setUpdate} datas={datas.items}/>
              </div>
            
          <SelectCoupon setCoupon={setCoupon}/>
          
          <div className="overview">
              <p > Total {brlCurrency(totally)}</p>
              <FinishCheckout  couponId={coupon.item?.id}/>
          </div>
          </ProductsCheckout>
       
        </Container>
    )
}