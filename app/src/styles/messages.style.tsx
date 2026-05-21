import styled from "styled-components"



export const ToastMessage = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;

  display: flex;
  flex-direction: column;
  gap: 10px;

  z-index: 9999;

  .message_success,
  .message_error,
  .message_info {
    padding: 12px 18px;
    border-radius: 8px;
    color: #fff;
    font-size: 14px;
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.25);

    animation: slideIn 0.4s cubic-bezier(0.22, 1, 0.36, 1),
               fadeOut 0.4s ease-in forwards;
    animation-delay: 0s, 2.6s;
  }

  .message_success {
    background-color: #4caf50;
  }

  .message_error {
    background-color: #f44336;
  }

  .message_info {
    background-color: #2196f3;
  }

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(-20px) scale(0.95);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @keyframes fadeOut {
    to {
      opacity: 0;
      transform: translateY(-10px);
    }
  }
`
export const NormalMessage = styled.div`
  text-align:center;
  .message {
    margin-top: 0.6rem;
    padding: 10px 12px;

    font-size: 0.9rem;
    font-weight: 500;

    border-radius: 8px;

    display: flex;
    

    gap: 8px;

    animation: fadeIn 0.2s ease;
  }

  .message_success {
    color: #1e7e34;
    background: #e6f4ea;
    border: 1px solid #b7e1c1;
  }

  .message_error {
    color: #a71d2a;
    background: #fdecea;
    border: 1px solid #f5c6cb;
  }

  .message_info {
   color: #1e7e34;
    background: #e6f4ea;
    border: 1px solid #b7e1c1;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-4px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`