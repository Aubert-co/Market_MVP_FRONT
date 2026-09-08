import styled,{createGlobalStyle} from "styled-components";


export const GlobalStyles = createGlobalStyle`

  *, *::before, *::after {
    box-sizing: border-box;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji" !important;
  }


  input, button, select, textarea {
    font-family: inherit !important;
  }


  body {
    margin: 0;
    padding: 0;
    background-color: #f8fafc;
    color: #0f172a;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif !important;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;
export const ContainerStyle = styled.div`
display: grid;
grid-template-areas:
  "header header header header"
  "main main main main"
  "footer footer footer footer";
grid-template-columns: 10% 70% 5%;
grid-template-rows: auto 1fr auto; 
column-gap: 1%;
background-color: white;
min-height:97vh;
box-sizing: border-box; 

`



export const Main = styled.main`
  grid-area: main;


  margin-bottom:1%;
  margin-top:5%;
  .error{
    color:red;
    text-align:center;
  }
`;


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
