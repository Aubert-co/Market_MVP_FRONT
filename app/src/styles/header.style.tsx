import styled from 'styled-components'

const brandColor = '#ff6347'

export const Header = styled.header`
  grid-area: header;
  width: 95%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #2a2a2a;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border-radius: 12px;
  justify-self: center;
  margin-top: 1%;

  @media (max-width: 580px) {
    display: grid;
    grid-template-areas:
      'logo nav'
      'search search';
    box-sizing: border-box;
    padding: 8px;
    padding-bottom: 14px;
    width: 95%;
  }
`

export const HeaderLogo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  cursor: pointer;

  @media (max-width: 580px) {
    grid-area: logo;
  }
`

export const HeaderLogoImage = styled.img`
  max-width: 50px;
  height: auto;
`

export const HeaderLogoLink = styled.a`
  a{
  text-decoration: none;
  font-weight: bold;
  font-size: 28px;
  color: ${brandColor};
  }
`

export const HeaderNav = styled.nav`
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 20px;

  @media (max-width: 580px) {
    grid-area: nav;
  }
`

export const HeaderNavLink = styled.a`
  margin-left: 10%;
  color: #b0b0b0;
  text-decoration: none;
  font-size: 16px;
  font-weight: bold;
  padding: 10px 15px;
  white-space: nowrap;
  text-transform: uppercase;
  transition: background-color 0.3s ease, color 0.3s ease;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #b0b0b0;
    color: #2a2a2a;
  }
`

export const HeaderSearch = styled.form`
  display: flex;
  width: 50%;
  height: 42px;
  justify-content: center;
  align-items: center;

  @media (max-width: 580px) {
    grid-area: search;
    width: 100%;
    margin-top: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
  }
`

export const HeaderSearchItems = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  transition: border-color 0.2s, box-shadow 0.2s;

  &:focus-within {
    border-color: ${brandColor};
    box-shadow: 0 0 5px rgba(255, 102, 0, 0.5);
  }
`

export const HeaderSearchInput = styled.input`
  width: 70%;
  height: 100%;
  padding: 0 12px;
  text-align: left;
  border: none;
  font-size: 15px;
  color: #333;

  &:focus {
    outline: none;
  }
`

export const HeaderSearchButton = styled.button`
  height: 100%;
  background-color: ${brandColor};
  cursor: pointer;
  padding: 0 12px;
  width: 30%;
  border: none;
  color: white;
  font-weight: bold;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #df472b;
  }
`

export const HeaderActionIcon = styled.i`
  cursor: pointer;
  margin: 0 15px;
  font-size: 1.5em;
  color: #f5f5f5;

  &:hover {
    color: ${brandColor};
    transition: color 0.3s ease-in-out;
  }

  &.cart-icon {
    position: relative;
  }

  &.profile-icon {
    position: relative;
  }

  &.active {
    color: #ffd700;
  }
`

export const BtnClean = styled.button`
 background: transparent;
  border: none;
  outline: none;
  cursor: pointer;

  font-size: 14px;
  font-weight: 600;
  color: #666;

  padding: 0;
  margin-right: 8px;

  line-height: 1;
  
`