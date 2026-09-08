import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { PROMO_ARRAY } from '@/constants';
import { useMemo } from 'react';




export const PromoContainer = styled.div`
  display: flex;
  gap: 20px;
  padding: 16px 20px;
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;

  

  .promo-box {
    flex: 1;
    padding: 24px 28px;
    border-radius: 18px;
    position: relative;
    overflow: hidden;
    cursor: pointer;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: center;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    
   
    background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
    border: 1px solid rgba(255, 255, 255, 0.08);
    box-shadow: 0 4px 20px rgba(15, 23, 42, 0.08);


    &::before {
      content: "";
      position: absolute;
      top: -40px;
      right: -40px;
      width: 120px;
      height: 120px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(255, 107, 0, 0.35) 0%, rgba(255, 255, 255, 0) 70%);
      pointer-events: none;
      transition: all 0.3s ease;
    }

  
    &:nth-child(2)::before {
      background: radial-gradient(circle, rgba(59, 130, 246, 0.35) 0%, rgba(255, 255, 255, 0) 70%);
    }
  }

  .promo-box:hover {
    transform: translateY(-4px);
    border-color: rgba(255, 255, 255, 0.2);
    box-shadow: 0 12px 30px rgba(15, 23, 42, 0.22);

    &::before {
      transform: scale(1.3);
      opacity: 0.8;
    }
  }

  .promo-box h2 {
    margin: 0 0 6px 0;
    font-size: 1.25rem;
    font-weight: 700;
    color: #ffffff;
    letter-spacing: -0.3px;
    z-index: 1;
  }

  .promo-box p {
    margin: 0;
    font-size: 0.875rem;
    color: #94a3b8;
    line-height: 1.4;
    font-weight: 400;
    z-index: 1;
  }

  @media (max-width: 640px) {
    flex-direction: column;
    gap: 12px;
    padding: 12px 16px;

    .promo-box {
      padding: 20px;
    }
  }
`;

export const RandomPromoBox: React.FC = () => {
  const navigate = useNavigate();


  const randomPromo = useMemo(() => {
    if (!PROMO_ARRAY || PROMO_ARRAY.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * PROMO_ARRAY.length);
    return PROMO_ARRAY[randomIndex];
  }, []);

  if (!randomPromo) return null;

  return (
    <div
      key={randomPromo.id || randomPromo.search}
      className="promo-box"
      onClick={() => navigate(`/buscas?${randomPromo.search}`)}
    >
      <h2>{randomPromo.title}</h2>
      <p>{randomPromo.content}</p>
    </div>
  );
};

export const PromoBox = ()=> {
  const navigate = useNavigate();

  return (
    <PromoContainer >
         <div className="promo-box" onClick={()=>navigate('/cupons')}>
            <h2>Dezenas de Cupons</h2>
            <p>Pegue agora seu cupom!</p>
        </div>
        <RandomPromoBox/>
    </PromoContainer>
  );
}