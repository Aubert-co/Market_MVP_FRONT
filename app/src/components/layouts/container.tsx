import {   Header } from "@/styles/header.style"
import { ContainerStyle,Main } from "@/styles/index.style"
import { TopBar, type NavigateMode } from "../header/topBar"
import type React from "react"
import { MessageProvider } from "@/context/message.context"
import { useModal } from "@/hooks/useModal"
import { useEffect } from "react"
import { AcceptCookie } from "../acceptCookie"
import { hasSeenCookieNotice, setCookieNoticeSeen } from "@/storage/cookies.storage"

type Props={
    children:React.ReactNode
    navigateMode?: NavigateMode
}
export const Container = ({children,navigateMode}:Props)=>{
    const {Modal,openModal,closeModal} = useModal({modalLocation:'center',cbClose:setCookieNoticeSeen})
    useEffect(()=>{
        if(!hasSeenCookieNotice()){
            openModal()
        }
        
    },[])
    
    return(
    <ContainerStyle>
        <Header>
            <TopBar navigationMode={navigateMode}/>
        </Header>
     
        <Main>
            <MessageProvider >
                <Modal title="Uso de cookies"> 
                    <AcceptCookie closeModal={closeModal}/>
                </Modal>
                {children}
            </MessageProvider>

        </Main>
        
    </ContainerStyle>
    )
}