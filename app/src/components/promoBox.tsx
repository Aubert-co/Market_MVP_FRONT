import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { PROMO_ARRAY } from '@/constants';


export const PromoContainer = styled.div`
  display: flex;
  gap: 16px;
  padding: 20px;

  .promo-box {
    flex: 1;
    padding: 20px;

    border-radius: 12px;

    background: linear-gradient(135deg, #ff7a18, #ff3d3d);
    color: #fff;

    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);

    text-align: left;

    cursor: pointer;
    transition: all 0.25s ease;

    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .promo-box:hover {
    transform: translateY(-5px) scale(1.02);
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.18);
  }

  .promo-box h2 {
    margin-bottom: 8px;
    font-size: 1.2rem;
    font-weight: 600;
  }

  .promo-box p {
    font-size: 0.9rem;
    opacity: 0.9;
  }
`

export const RandonPromoBox = ()=>{
  const navigate = useNavigate()
  return PROMO_ARRAY
    .sort(() => 0.5 - Math.random()).slice(0, 1)
    .map((val)=>{
      return (
        <div className="promo-box" onClick={()=>navigate(`/buscas?${val.search}`)}>
          <h2>{val.title}</h2>
          <p>{val.content}</p>
        </div>
      )
    })
}

export const PromoBox = ()=> {
  const navigate = useNavigate();

  return (
    <PromoContainer >
         <div className="promo-box" onClick={()=>navigate('/cupons')}>
            <h2>Dezenas de Cupons</h2>
            <p>Pegue agora seu cupom!</p>
        </div>
        <RandonPromoBox/>
    </PromoContainer>
  );
}