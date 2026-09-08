import styled, { css } from "styled-components";

export const ListContainer = styled.div`
  width: 100%;



  .text {
    display: flex;
    justify-content: center;
    text-align: center;
    margin-bottom: 20px;
  }

  .text h1 {
    font-size: 1.5rem;
    font-weight: 700;
    color: #0f172a;
    margin: 0;
    letter-spacing: -0.3px;
  }

  .list-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 16px;
    padding: 24px;
    margin: 0 auto;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 960px;
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 20px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
  }

  .list-item {
    background-color: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 16px;
    padding: 16px;
    display: flex;
    align-items: center;
    gap: 16px;
    width: 100%;
    max-width: 290px; 
    color: #0f172a;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.02);
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;

    &:hover {
      transform: translateY(-4px);
      border-color: #3b82f6;
      box-shadow: 0 8px 20px rgba(59, 130, 246, 0.1);
    }
  }

 
  .list-image {
    width: 68px;
    height: 68px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #cbd5e1;
    border-radius: 12px;
    overflow: hidden;
    background-color: #f8fafc;
    flex-shrink: 0;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }
  }

  .list-info {
    display: flex;
    flex-direction: column;
    gap: 4px;
    overflow: hidden;
    flex: 1;

    h3 {
      margin: 0;
      font-size: 1rem;
      font-weight: 700;
      color: #0f172a;
      line-height: 1.25;
    }

    p {
      margin: 0;
      font-size: 0.875rem;
      color: #64748b;
      line-height: 1.4;
    }

    .name {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 170px;
    }
  }

  @media (max-width: 640px) {
    .list-container {
      padding: 16px;
      gap: 12px;
    }

    .list-item {
      max-width: 100%;
    }

    .list-image {
      width: 60px;
      height: 60px;
    }
  }
`;

type ListItemsProps = {
  size?: "small" | "medium" | "big";
};

export const ListItems = styled.div<ListItemsProps>`
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 20px;
  color: #0f172a;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.02);
  transition: all 0.2s ease;

  display: flex;
  flex-direction: column;
  gap: 12px;
  justify-content: space-between;

  width: 280px;
  min-height: 140px;

  ${(props) =>
    props.size === "small" &&
    css`
      width: 180px;
      min-height: 100px;
      padding: 12px;

      .list-info {
        h3 {
          font-size: 0.875rem;
        }
        p {
          font-size: 0.8rem;
        }
      }
    `}

  ${(props) =>
    props.size === "big" &&
    css`
      width: 380px;
      min-height: 180px;
      padding: 28px;

      .list-info {
        h3 {
          font-size: 1.25rem;
        }
        p {
          font-size: 1.1rem;
        }
      }
    `}

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);
    border-color: #cbd5e1;
  }
`;

export const ListInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  text-align: center;

  h3 {
    font-size: 0.9rem;
    color: #64748b;
    font-weight: 600;
    margin: 0;
    text-transform: uppercase;
    letter-spacing: 0.4px;
  }

  p {
    font-size: 2rem;
    color: #10b981;
    font-weight: 800;
    margin: 0;
    line-height: 1.1;
  }
`;

export const ProfileStyle = styled.div`
  text-align: center;
  width: 100%;


  &, * {

    box-sizing: border-box;
  }

  h1, h2, h3 {
    font-size: 1.75rem;
    font-weight: 700;
    color: #0f172a;
    margin-bottom: 8px;
    letter-spacing: -0.3px;
  }

  .boxes {
    margin: 24px auto;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 16px;
    padding: 32px 24px;
    width: 90%;
    max-width: 900px;
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 20px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  }

  .box {
    background: #ffffff;
    border-radius: 16px;
    padding: 20px 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    width: 160px;
    height: 170px;
    margin: 0;
    border: 1px solid #e2e8f0;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
  }

  .box:hover {
    transform: translateY(-6px);
    border-color: #3b82f6;
    box-shadow: 0 12px 24px rgba(59, 130, 246, 0.12);
  }

  .box:hover img {
    transform: scale(1.08);
  }

  .box:hover p {
    color: #2563eb;
  }

  .box img {
    width: 72px;
    height: 72px;
    object-fit: contain;
    margin-bottom: 12px;
    transition: transform 0.25s ease;
  }

  .box p {
    font-size: 0.875rem;
    font-weight: 600;
    color: #334155;
    margin: 0;
    line-height: 1.3;
    transition: color 0.2s ease;
  }

  @media (max-width: 640px) {
    .boxes {
      width: 100%;
      padding: 16px;
      gap: 12px;
    }

    .box {
      width: calc(50% - 6px);
      height: 150px;
      padding: 16px 8px;
    }

    .box img {
      width: 56px;
      height: 56px;
    }
  }
`;