import styled from "styled-components";

export const CouponContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 24px;
  max-width: 100%;
  padding: 20px;
`;

export const CouponItem = styled.div`
  width: 300px;
  background: #ffffff;
  border-radius: 16px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  border: 1px solid #f0f0f0;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 16px 36px rgba(0, 0, 0, 0.1);
  }

  
  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 68%;
    width: 18px;
    height: 18px;
    background-color: #f8f9fa; 
    border-radius: 50%;
    z-index: 2;
  }

  &::before {
    left: -9px;
    box-shadow: inset -2px 0 3px rgba(0, 0, 0, 0.05);
  }

  &::after {
    right: -9px;
    box-shadow: inset 2px 0 3px rgba(0, 0, 0, 0.05);
  }
`;

export const CouponHeader = styled.div`
  padding: 20px 20px 12px;
  text-align: center;
  background: linear-gradient(180deg, #fff5f5 0%, #ffffff 100%);

  .coupon-image {
    width: 80px;
    height: 80px;
    object-fit: contain;
    margin: 0 auto 12px;
  }

  .discount-badge {
    font-size: 1.8rem;
    font-weight: 800;
    color: #ff4757;
    letter-spacing: -0.5px;

  }
`;

export const CouponDetails = styled.div`
  padding: 12px 20px 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const CouponRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Label = styled.span`
  font-size: 0.8rem;
  color: #8c8c8c;
  font-weight: 500;
`;

export const Value = styled.span`
  font-size: 0.85rem;
  font-weight: 600;
  color: #262626;

  &.code {
    font-family: 'JetBrains Mono', monospace, sans-serif;
    background: #fff0f0;
    color: #ff4757;
    border: 1px dashed #ff4757;
    padding: 4px 10px;
    border-radius: 8px;
    letter-spacing: 1px;
  
    transition: background 0.2s;

    &:hover {
      background: #ffe0e0;
    }
  }
`;

export const Divider = styled.div`
  border-bottom: 2px dashed #f0f0f0;
  margin: 4px 0 12px;
`;

