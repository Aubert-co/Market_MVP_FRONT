import { BrowserRouter as Router ,Routes,Route } from "react-router-dom"
import { Register } from "../modules/auth/pages/register"
import { Login } from "../modules/auth/pages/login"
import { Index } from "../modules/products/user/pages"
import { ProductDetail } from "../modules/products/user/pages/productDetail"
import { Profile } from "./profile/profile"
import { CreateStore } from "../modules/store/user/pages/createStore"
import { StoreHome } from "../modules/store/page/storeHome"
import { StoreProducts } from "../modules/products/store/page/page"
import { StoreCoupons } from "../modules/coupons/store/page/coupon"
import { StoreOrders } from "../modules/orders/store/components/storeOrders"
import { Coupon } from "../modules/coupons/user/page/coupon"
import { NotFound } from "./not_found"
import { Search } from "../modules/products/user/pages/search"
import { Checkout } from "../modules/checkout/page/checkout"
import { ProtectedStoreRoutes } from "@/modules/store/components/protectedStoreRoute"
import TermsPage from "./terms"
import { Orders } from "../modules/orders/user/pages/orders"
import { OrderDetails } from "../modules/orders/user/pages/orderDetails"


export const App = ()=>{
    return(
    <Router>
        <Routes>
            <Route>
                <Route path="/registro" element={<Register/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/" element={<Index/>}/>
                <Route path="/produtos/pagina/:page" element={<Index/>}/>
                <Route path="/perfil/:action" element={<Profile/>}/>
                <Route path="/produto/:productid" element={<ProductDetail/>}/>
                <Route path="/abrir-loja" element={<CreateStore/>}/>
                <Route path="/cupons" element={<Coupon/>} />
                <Route path="*" element={<NotFound/>}/>
                <Route path="/buscas/*" element={<Search/>}/>
                <Route path="/pagamento" element={<Checkout/>}/>
                <Route path="/termos" element={<TermsPage/>}/>
                
                <Route path="/minhas-compras" element={<Orders/>}/>
                <Route path="/minhas-compra/detalhes/:orderId" element={<OrderDetails/>}/>
                <Route element={<ProtectedStoreRoutes/>}>
                    <Route path="/loja" element={<StoreHome/>}/>
                    <Route path="/loja/produtos" element={<StoreProducts/>}/>
                    <Route path="/loja/cupons" element={<StoreCoupons/>}/>
                    <Route path="/loja/pedidos" element={<StoreOrders/>}/>
                </Route>

                
                <Route/>
           
            </Route>
        </Routes>
    </Router>
  
    )
}