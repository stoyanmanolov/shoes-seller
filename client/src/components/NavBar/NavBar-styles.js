import styled, { css } from "styled-components";

let lightgrey = "#f3f3f3";
let darkgrey = "#575757";

export const Nav = styled.nav`
  height: 60px;
  width: 100%;
  position: relative;
  display: flex;
  background-color: white;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${lightgrey};
  button {
    display: inherit;
    border: 0;
    background: none;
  }
  i {
    font-size: 20px;
    color: black;
  }
`;

export const SearchCart = styled.div`
  margin-right: 20px;
  display: flex;
  flex-direction: row;
  .search {
    margin-right: 10px;
  }
  .cart {
    margin-left: 10px;
  }
`;

export const Logo = styled.div`
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
`;

export const DrawerToggler = styled.button`
  display: inline-block;
  margin-left: 20px;
`;

export const Drawer = styled.div`
  position: absolute;
  top: 100%;
  background-color: white;
  z-index: 1;
  ${props =>
    props.open
      ? css`
          width: 100%;
          border-top: 1px solid ${lightgrey};
        `
      : css`
          display: none;
          width: 100%;
        `}
`;

export const MenuList = styled.ul`
  display: flex;
  flex-direction: column;
  list-style-type: none;
`;

export const ListItem = styled.li`
  width: 100%;
  a:hover {
    text-decoration: none;
  }
  a {
    cursor: pointer;
    text-decoration: none;
    p {
      color: ${darkgrey};
      font-size: 16px;
      padding: 10px 20px;
      border-bottom: 1px solid ${lightgrey};
    }
  }
`;

export const SearchForm = styled.form`
  display: none;
`;
