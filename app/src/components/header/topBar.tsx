import { Link, useNavigate } from "react-router-dom"
import { SearchBar } from "./seachBar"
import { FaShoppingCart, FaUser } from "react-icons/fa"
import { useSearch } from "@/hooks/useSearch"
import { HeaderActionIcon, HeaderLogo, HeaderLogoLink, HeaderNav } from "@/styles/header.style"

export type NavigateMode = "navigate" | "update"
type Props = {
    navigationMode?:NavigateMode
}
export const TopBar = ({navigationMode}:Props)=>{
    const navigate = useNavigate()
    const {searchEvent,searchProduct} = useSearch({mode:navigationMode ?? 'navigate'})
    return(
        <>
            <HeaderLogo className="logo">
                <HeaderLogoLink>
                   <Link to={"/"}>SUPERSTORE</Link>
                </HeaderLogoLink>
            </HeaderLogo>
            <SearchBar searchEvent={searchEvent} initialValue={searchProduct}/>
            <HeaderNav>
                <HeaderActionIcon>
                    <FaShoppingCart data-testid="profile-cart" onClick={()=>navigate("/perfil/carrinho")}/>
                </HeaderActionIcon>

                <HeaderActionIcon>
                  <FaUser data-testid="profile-orders" onClick={()=>navigate("/perfil/ordens")}/>
                </HeaderActionIcon>
            </HeaderNav>
        </>
    )
}