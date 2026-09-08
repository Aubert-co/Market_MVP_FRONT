import styled from "styled-components";
export const SiderStyle = styled.aside<{ $open: boolean }>`
    position: fixed;
    top: 0;
    left: 0;
    transform: ${({ $open }) => ($open ? "translateX(0)" : "translateX(-100%)")};
    width: 260px;
    height: 100vh;
    background-color: #1e293b;
    color: #f8fafc;
    display: flex;
    flex-direction: column;
    border-right: 1px solid #334155;
    border-radius: 0 16px 16px 0;
    padding: 24px 16px;
    box-shadow: 4px 0 20px rgba(0, 0, 0, 0.25);
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 1000;
    box-sizing: border-box;

 
  .store-logo {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 0 8px;
    margin-bottom: 32px;
    font-size: 1.35rem;
    font-weight: 700;
    letter-spacing: -0.3px;
    color: #60a5fa;
  }


  .items-sidebar {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;
  }

  .menu {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .menu-item {
    display: flex;
    align-items: center;
    padding: 12px 14px;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.2s ease;
    color: #94a3b8;

    &:hover {
      background-color: #334155/60;
      color: #f8fafc;
      transform: translateX(4px);

      .icon-wraper {
        color: #f8fafc;
      }
    }

    &.active {
      background-color: #2563eb;
      color: #ffffff;
      font-weight: 600;

      .icon-wraper {
        color: #ffffff;
      }

      .item-label {
        color: #ffffff;
        font-weight: 600;
      }
    }
  }

  .icon-wraper {
    margin-right: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
    color: #94a3b8;
    transition: color 0.2s ease;
  }

  .item-label {
    font-size: 0.95rem;
    font-weight: 500;
    color: #cbd5e1;
    transition: color 0.2s ease;
  }


  .logout-item {
    margin-top: auto;
    border-top: 1px solid #334155;
    padding-top: 16px;
  }
`;
