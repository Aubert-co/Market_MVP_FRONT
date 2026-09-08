import styled from "styled-components";

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  background-color: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  border: 1px solid #e2e8f0;

  th,
  td {
    padding: 14px 16px;
    border-bottom: 1px solid #e2e8f0;
    text-align: left;
    color: #334155;
    vertical-align: middle;
  }

  th {
    background-color: #f8fafc;
    color: #475569;
    font-weight: 600;
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  tr:last-child td {
    border-bottom: none;
  }

  tr:hover {
    background-color: #f8fafc;
  }

 
  td:first-child {
    display: flex;
    align-items: center;
    gap: 12px;
    font-weight: 500;
    color: #0f172a;
  }

  img {
    border-radius: 8px;
    border: 1px solid #e2e8f0;
    width: 44px;
    height: 44px;
    object-fit: cover;
    flex-shrink: 0;
  }

  
  
  @media (max-width: 768px) {
    thead {
      display: none;
    }

    tr {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 0 auto 20px auto;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      padding: 16px;
      width: 100%; 
      background: #ffffff;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
    }

    td {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      padding: 8px 0;
      border: none;
      width: 100%;
    }

    td:first-child {
      flex-direction: column;
      gap: 8px;
    }

    td::before {
      content: attr(data-label);
      font-weight: 600;
      font-size: 0.75rem;
      color: #64748b;
      text-transform: uppercase;
      margin-bottom: 4px;
    }

    td img {
      width: 120px;
      height: 120px;
      margin: 0 0 8px 0;
    }
  }
`;