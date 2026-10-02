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


