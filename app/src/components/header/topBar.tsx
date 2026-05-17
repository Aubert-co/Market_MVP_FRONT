import { Link, useNavigate } from "react-router-dom"
import { SearchBar } from "./seachBar"
import { FaShoppingCart, FaUser } from "react-icons/fa"
import { useSearch } from "@/hooks/useSearch"

export type NavigateMode = "navigate" | "update"
type Props = {
    navigationMode?:NavigateMode
}
export const TopBar = ({navigationMode}:Props)=>{
    const navigate = useNavigate()
    const {searchEvent} = useSearch({mode:navigationMode ?? 'navigate'})
    return(
        <>
            <div className="logo">
                <Link to={"/"}>SUPERSTORE</Link>
            </div>
            <SearchBar searchEvent={searchEvent}/>
            <nav>
                <i>
                    <FaShoppingCart data-testid="profile-cart" onClick={()=>navigate("/perfil/carrinho")}/>
                </i>

                <i>
                  <FaUser data-testid="profile-orders" onClick={()=>navigate("/perfil/ordens")}/>
                </i>
            </nav>
        </>
    )
}