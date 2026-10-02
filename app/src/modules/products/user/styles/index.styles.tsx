import styled from "styled-components";


export const ProductSection = styled.div`
  text-align: center;
  width: 100%;




  .product-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: stretch;
    gap: 20px;
    width: 100%;
    max-width: 1100px;
    margin: 0 auto;
    padding: 16px 0;
  }

  .product {
    margin: 0;
    width: 250px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border: 1px solid #e2e8f0;
    border-radius: 16px;
    text-align: left;
    background-color: #ffffff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    text-decoration: none;
    cursor: pointer;
    overflow: hidden;

    &:hover {
      transform: translateY(-4px);
      border-color: #3b82f6;
      box-shadow: 0 10px 24px rgba(59, 130, 246, 0.12);
    }
  }

  .img {
    background-color: #f8fafc;
    width: 100%;
    height: 220px;
    border-radius: 16px 16px 0 0;
    overflow: hidden;
    border-bottom: 1px solid #f1f5f9;
  }

  .img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .content {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 18px;
    text-align: left;
    flex: 1;
    justify-content: space-between;
  }

  .product p {
    margin: 0;
  }

  .item_name {
    font-size: 0.95rem;
    font-weight: 700;
    color: #0f172a;
    line-height: 1.35;

    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    min-height: 2.7em;
  }

  .description {
    color: #64748b;
    font-size: 0.85rem;
    line-height: 1.45;

    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    min-height: 2.5em;
  }

  .rating {
    margin-top: 2px;
    font-size: 0.9rem;
    color: #f59e0b; 
  }

  .price {
    margin-top: 6px;
    font-size: 1.35rem;
    font-weight: 800;
    color: #0f172a;
    letter-spacing: -0.3px;
    text-decoration: none;
  }


`;

export const FilterProductsContainer = styled.form`
  width: 100%;                
  max-width: 900px;         

  
  display: flex;
  flex-direction:column;
  gap: 16px;
  
  justify-self:center;
  border-radius: 12px;
 


  .input-with-label {
    display: flex;
    flex-direction: column;
    gap: 6px;
    min-width: 150px;
  }


  .input-with-label label {
    font-size: 14px;
    font-weight: 500;
  }



  .btn-actions {
    display: flex;
    gap: 10px;
  }

  .btn-actions button {
    padding: 8px 14px;
    border-radius: 6px;
    border: none;
    cursor: pointer;
    font-size: 14px;
    background: #165eeeff;
    color: #fff;
    transition: 0.2s;
  }

  .btn-actions button:nth-child(2) {
    background: #777;
  }

  .btn-actions button:hover {
    opacity: 0.85;
  }


  @media (max-width: 768px) {
    width: 95%;       
    flex-direction: column;
    align-items: stretch;

    .input-with-label {
      width: 100%;
    }

    .btn-actions {
      width: 100%;
      justify-content: space-between;
    }
  }
`;

export const SearchBox = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr; 
  width: 95%;
  height: 100%;
  gap : 20px;
  .filtered{
    margin-left:15%;
  }
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    .collapse-container {
      width: 70%;
      background: #ffffff; 
      border-radius: 12px;
      border: 1px solid rgba(0,0,0,0.08);
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0,0,0,0.10);
      transition: all 0.3s ease;
      justify-self:start;
    }
    .filtered{
      width:100%;
      margin-left:5%
    }
  }
`;