import type { OpenSideBarOuDrawer } from "@/modules/store/types/storeDashboard.types"
import { useState } from "react"

export const useSideBarOrDrawer = ()=>{
    const [isOpen,setIsOpen] = useState<OpenSideBarOuDrawer>(null)
    return {
        isOpen,
        setIsOpen
    }
}