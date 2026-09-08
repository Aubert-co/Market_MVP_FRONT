import styled from "styled-components";

export const StoreDashboard = styled.div<{ $open: boolean }>`
  min-height: 97vh;
  background-color: white;
  box-sizing: border-box;
  display: grid;
  grid-template-areas: "main";
  transition: all 0.3s ease;
  background-color:rgb(248 250 252);
  main {
    display: flex;
    flex-direction:column;
    grid-area: main;
    transition: margin-left 0.3s ease;
    margin-left: ${({ $open }) => ($open ? "240px" : "0")};
    padding: 20px;
    align-items:center;
  }

}



`;





export const Box = styled.div`
  display:flex;
  background: linear-gradient(
    180deg,
    #ffffff 0%,
    #f8fafc 100%
  );

  border-radius: 18px;
  padding: 20px;

  margin: 24px 0;

  border: 1px solid rgba(15, 23, 42, 0.06);

  box-shadow:
    0 1px 2px rgba(0, 0, 0, 0.04),
    0 8px 24px rgba(0, 0, 0, 0.06);

  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    border-color 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow:
      0 4px 12px rgba(0, 0, 0, 0.08),
      0 16px 32px rgba(0, 0, 0, 0.08);
    border-color: rgba(37, 99, 235, 0.25);
  }
`;









export const Controls = styled.div`
  display: flex;
  align-items: flex-end; 
  gap: 16px;
  margin-bottom: 24px;
  width: 100%;
  flex-wrap: wrap;
  background: #ffffff;
  padding: 16px 20px;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);

  
  .field-group {
    display: flex;
    flex-direction: column;
    gap: 6px;

    label {
      font-size: 0.75rem;
      font-weight: 600;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
  }


  .search-field {
    flex: 2;
    min-width: 260px;
  }

  
  .action-field {
    margin-left: auto; 
  }

  
  .search-items {
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;
  }

  .btn_search {
    background-color: #3b82f6;

    &hover{
    background-color: #2563eb;
    }
  }






  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;

    .field-group {
      width: 100%;
    }

    .action-field {
      margin-left: 0;
    }

  }
`;