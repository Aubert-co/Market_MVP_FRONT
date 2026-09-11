import {   Header } from "@/styles/header.style"
import { ContainerStyle,Main } from "@/styles/index.style"
import { TopBar, type NavigateMode } from "../header/topBar"
import type React from "react"
import { MessageProvider } from "@/context/message.context"

type Props={
    children:React.ReactNode
    navigateMode?: NavigateMode
}
export const Container = ({children,navigateMode}:Props)=>{
    return(
    <ContainerStyle>
        <Header>
            <TopBar navigationMode={navigateMode}/>
        </Header>
     
        <Main>
            <MessageProvider >
                {children}
            </MessageProvider>
        </Main>
        
    </ContainerStyle>
    )
}