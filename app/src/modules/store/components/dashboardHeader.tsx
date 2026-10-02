import styled from "styled-components"


const Header = styled.div` 
  width: 100%;
  padding: 20px 24px;
  margin-bottom: 24px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
  display: flex;
  flex-direction: column;
  gap: 6px;
  
 h1 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0;
  letter-spacing: -0.3px;
}

 p {
  font-size: 0.875rem;
  color: #64748b;
  margin: 0;
  line-height: 1.5;
}

`
type Props = {
    title:string
    subTitle:string
}


export const DashboardHeader = ({title,subTitle}:Props)=>{
    return (
        <Header>
            <h1>{title }</h1>
            <p>{subTitle }</p>
        </Header>
    )
}