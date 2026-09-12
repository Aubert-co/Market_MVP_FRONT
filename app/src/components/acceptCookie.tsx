import { PrimaryButton } from '@/styles/shared.style'
import styled from 'styled-components'

type Props = {
    closeModal:()=>void
}
export const AcceptCookie = ({closeModal}:Props) => {
    
    return (
        <Container> 
    
            <Description>
                Utilizamos cookies para melhorar sua experiência,
                manter o site funcionando e entender como ele é utilizado.
            </Description>

            <CookieList>
                <CookieItem>
                    <Icon>✓</Icon>
                    <span>Manter sua sessão enquanto você estiver conectado</span>
                </CookieItem>

                <CookieItem>
                    <Icon>✓</Icon>
                    <span>Permitir o acesso seguro à sua conta</span>
                </CookieItem>

                <CookieItem>
                    <Icon>✓</Icon>
                    <span>Manter o funcionamento da autenticação</span>
                </CookieItem>

                <CookieItem>
                    <Icon>✓</Icon>
                    <span>Proteger sua sessão durante a navegação</span>
                </CookieItem>
            </CookieList>
            <Actions>
                <PrimaryButton onClick={closeModal}>Entendi</PrimaryButton>
            </Actions>
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    max-width: 480px;
    padding: 28px;
    border-radius: 16px;
    background: #ffffff;
    color: #0e1420;
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.18);
`



const Description = styled.p`
    margin: 0 0 20px;
    color: #667085;
    font-size: 14px;
    line-height: 1.6;
`

const CookieList = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 12px;

    margin: 0 0 24px;
    padding: 0;
    list-style: none;
`

const CookieItem = styled.li`
    display: flex;
    align-items: center;
    gap: 10px;

    color: #344054;
    font-size: 14px;
    line-height: 1.4;
`

const Icon = styled.span`
    display: flex;
    align-items: center;
    justify-content: center;

    width: 20px;
    height: 20px;
    flex-shrink: 0;

    border-radius: 50%;
    background: #e8f7ee;
    color: #16a34a;
    font-size: 12px;
    font-weight: 700;
`

const Actions = styled.div`
    display: flex;
    justify-content: center;
    gap: 10px;
`

