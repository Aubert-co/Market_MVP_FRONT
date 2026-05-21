import styled from "styled-components";
export const CouponCard = styled.div`
text-align: center;
box-sizing: border-box;


.coupon-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  
  align-items:center;
  max-width:100%;
}
.coupon-item {
  margin: 12px;
  width: 300px;
  min-width: 260px;
  flex-shrink: 0;

  padding: 16px;

  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.08);

  background-color: #ffffff;

  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);

  text-align: start;

  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.coupon-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.12);
}

.coupon-image {
  width: 100%;
  height: 180px;
  object-fit: cover;

  border-top-left-radius: 12px;
  border-top-right-radius: 12px;

  display: block;
}
.coupon-details {
  display: flex;
  flex-direction: column;
  padding: 12px 16px;
  gap: 10px;
}

.coupon-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.label {
  font-size: 0.85rem;
  color: #777;
}

.value {
  font-size: 0.95rem;
  font-weight: 500;
  color: #222;
}

.value.code {
  font-family: monospace;
  background: #f5f5f5;
  padding: 2px 6px;
  border-radius: 6px;
}

.value.highlight {
  color: #2e7d32;
  font-weight: 600;
}
  
button {
  background: linear-gradient(135deg, #ff4d4d, #ff6b6b);
  color: #fff;
  font-weight: 600;
  font-size: 15px;
  border: none;
  border-radius: 10px;
  padding: 10px 16px;
  cursor: pointer;
  transition: all 0.25s ease;
  width: 100%;
  box-shadow: 0 4px 10px rgba(255, 77, 77, 0.3);
  margin-top:1%;
}

button:hover {
  background: linear-gradient(135deg, #ff3333, #ff5050);
  box-shadow: 0 6px 14px rgba(255, 77, 77, 0.4);
  transform: translateY(-2px);
}

button:active {
  transform: scale(0.97);
  box-shadow: 0 3px 8px rgba(255, 77, 77, 0.3);
}

`;