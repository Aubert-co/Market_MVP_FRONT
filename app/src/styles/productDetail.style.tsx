import styled from "styled-components";

export const ProductStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: auto;
  padding: 24px 16px;


  .product-detail {
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: #ffffff;
    max-width: 850px;
    width: 100%;
    margin: 0 auto;
    padding: 24px;
    border-radius: 20px;
    gap: 32px;
    border: 1px solid #e2e8f0;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
  }

  .product-image {
    width: 320px;
    height: 320px;
    min-width: 320px;
    background-color: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 14px;
    overflow: hidden;
    flex-shrink: 0;

    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
      object-position: center;
    }
  }

  .product-infos {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 16px;

    .name {
      text-align: left;
      font-size: 1.5rem;
      font-weight: 700;
      color: #0f172a;
      margin: 0;
      letter-spacing: -0.3px;
      line-height: 1.25;
    }

    .price {
      font-size: 1.75rem;
      font-weight: 800;
      color: #0f172a;
      letter-spacing: -0.5px;
      margin: 0;
    }
  }

  .product-stocks {
    display: flex;
    flex-direction: column;
    gap: 4px;
    font-size: 0.875rem;
    color: #059669;
    font-weight: 600;
  }

  .actions {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: 8px;

    button {
      width: 100%;
      padding: 12px 20px;
      border-radius: 10px;
      font-size: 0.95rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      border: none;

      &:first-child {
        background-color: #2563eb;
        color: #ffffff;
        box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);

        &:hover {
          background-color: #1d4ed8;
          box-shadow: 0 6px 16px rgba(37, 99, 235, 0.3);
          transform: translateY(-1px);
        }
      }


      &:nth-child(2) {
        background-color: #f1f5f9;
        color: #0f172a;
        border: 1px solid #cbd5e1;

        &:hover {
          background-color: #e2e8f0;
          border-color: #94a3b8;
        }
      }
    }
  }

.desctipions {
    width: 100%;
    max-width: 850px;
    margin: 24px auto 0 auto;
    border-radius: 16px;
    background-color: #ffffff;
    border: 1px solid #e2e8f0;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
    overflow: hidden;
  }

  .description-content {
    padding: 24px;
    line-height: 1.65;
    color: #475569;
    font-size: 0.95rem;

    p {
      margin: 0;
      word-break: break-word;
    }
  }

  .message_success,
  .message_error,
  .message_info {
    position: fixed;
    top: 24px;  
    right: 24px;
    padding: 14px 20px;
    border-radius: 12px;
    color: #ffffff;
    font-size: 0.875rem;
    font-weight: 600;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.12);
    z-index: 9999; 
    animation: fadeIn 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .message_success {
    background-color: #10b981; 
  }

  .message_error {
    background-color: #ef4444; 
  }

  .message_info {
    background-color: #3b82f6; 
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px) scale(0.96);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @media (max-width: 700px) {
    .product-detail {
      flex-direction: column;
      width: 100%;
      padding: 16px;
      gap: 20px;
    }

    .product-image {
      width: 100%;
      min-width: 100%;
      height: 260px;
    }

    .product-infos .name {
      text-align: center;
    }

    .message_success,
    .message_error,
    .message_info {
      top: 12px;
      right: 12px;
      left: 12px;
      text-align: center;
      justify-content: center;
    }
  }
`;

export const CommentsStyle = styled.div`
  width: 100%;
  max-width: 850px;
  margin-top: 24px;
  padding: 24px;
  background-color: #ffffff;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
  justify-self: center;


  .comments h3 {
    margin: 0 0 20px 0;
    font-size: 1.1rem;
    font-weight: 700;
    color: #0f172a;
    letter-spacing: -0.2px;
  }

  .comment-item {
    display: flex;
    flex-direction: column;
    gap: 6px;
    padding: 16px 0;
    border-bottom: 1px solid #f1f5f9;

    &:first-child {
      padding-top: 0;
    }

    &:last-child {
      border-bottom: none;
      padding-bottom: 0;
    }
  }

  .comment-author {
    font-size: 0.875rem;
    font-weight: 700;
    color: #0f172a;
    font-style: normal;
    letter-spacing: -0.2px;
  }

  .comment-content {
    font-size: 0.925rem;
    color: #475569;
    line-height: 1.5;
    margin: 0;
  }

  
  .stars, .rating {
    color: #f59e0b;
    font-size: 0.9rem;
    letter-spacing: 2px;
  }
`;