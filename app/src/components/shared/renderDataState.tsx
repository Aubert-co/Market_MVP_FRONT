import { Link } from "react-router-dom"
import styled from "styled-components"


export type DataState<T> ={
    datas:T[],
    status:number,
    children:React.ReactNode,
    emptyMessage:React.ReactNode,
    errorMessage:string
    skeleton:React.ReactNode
}
export const RenderDataState = <T,>({
    datas,status,
    emptyMessage,
    errorMessage,
    children,
    skeleton
    }:DataState<T>)=>{
    const isEmpty = datas.length === 0 && status < 204;
    const hasError = datas.length ===0 && status > 410;
    const isLoading = status === 0;
    const isNotLogged = status === 401;

    if (isLoading) {
        return <>{skeleton}</>
    }

    if (isNotLogged) {
        return (
            <div className="text">
            <h1 data-testid="render-logged">
                Você não está logado.{" "}
                <Link to="/login">Faça login</Link>.
            </h1>
            </div>
        );
    }

    if (hasError) {
        return (
            <MessageContainer className="text error">
                <h1 data-testid="render-error">{errorMessage}</h1>
            </MessageContainer>
        );
    }

    if (isEmpty) {
        return (
            <MessageContainer className="text error">
                <h1 data-testid="render-empty">{emptyMessage}</h1>
            </MessageContainer>
        );
    }


    return <>{children}</>;
}

export const MessageContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 200px;
    padding: 24px;
    text-align: center;

    h1 {
        margin: 0;
        font-size: 1.2rem;
        font-weight: 500;
        color: #666;
    }

    &.error h1 {
        color: #d32f2f;
    }
`;