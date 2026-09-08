import styled from "styled-components";

export const SelectInput = styled.select`

height: 42px;
padding: 0 36px 0 12px;
border: 1px solid #cbd5e1;
border-radius: 8px;
font-size: 0.875rem;
color: #334155;
font-weight: 500;
background-color: #ffffff;
cursor: pointer;
outline: none;
transition: all 0.2s ease;

appearance: none;
background-repeat: no-repeat;
background-position: right 10px center;
background-size: 16px;

&:hover {
    border-color: #94a3b8;
}

&:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
}
  
`