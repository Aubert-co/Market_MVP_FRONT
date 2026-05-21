import styled from "styled-components";


type PropsUserForm = {
  $minHeight?:string
}
export const UserFormStyles = styled.div<PropsUserForm>`

display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
min-height: ${({ $minHeight }) => $minHeight || '100vh'};
background-color: #f7f7f7;


form {
  display: flex;
  flex-direction: column;

  gap: 1.2rem;

  width: 70%;
  max-width: 420px;

  margin-top: 1.5rem;

  padding: 2rem;

  background: #ffffff;

  border-radius: 12px;

  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}


.type_form {
  font-size: 1.4rem;
  font-weight: 700;
  color: #0e1420;
  text-align: center;
  margin-bottom: 0.5rem;
}


.input-with-label {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.input-with-label label {
  font-size: 0.85rem;
  font-weight: 500;
  color: #444;
}


input,
textarea,
select {
  width: 100%;

  padding: 0.65rem 0.8rem;

  font-size: 0.9rem;

  border: 1px solid #ddd;
  border-radius: 8px;

  transition: all 0.2s ease;
  outline: none;
}

input:focus,
textarea:focus,
select:focus {
  border-color: #0e1420;
  box-shadow: 0 0 0 2px rgba(14, 20, 32, 0.1);
}

/* FILE INPUT */
input[type="file"] {
  font-size: 0.85rem;
  border-radius: 8px;
  padding: 0.4rem;
  background-color: #fafafa;
  cursor: pointer;
}

input[type="file"]::file-selector-button {
  padding: 0.4rem 0.8rem;

  background-color: #0e1420;
  color: #fff;

  border: none;
  border-radius: 6px;

  font-size: 0.8rem;
  font-weight: 500;

  cursor: pointer;
  transition: background 0.2s ease;
}

input[type="file"]::file-selector-button:hover {
  background-color: #1c2536;
}
`

