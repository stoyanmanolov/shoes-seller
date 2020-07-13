import styled from "styled-components";

let lightgrey = "#f3f3f3";
let darkgrey = "#575757";

export const Nav = styled.nav`
  height: 60px;
  width: 100%;
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-areas: "toggler logo grouped";
  background-color: white;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${lightgrey};
  i {
    font-size: 20px;
    color: black;
  }
  @media (min-width: 992px) {
    height: 100px;
    grid-template-columns: 1fr 2fr 1fr;
    grid-template-areas:
      ". logo grouped"
      "navigation navigation navigation";
    justify-content: initial;
  }
`;

export const GroupedButtons = styled.div`
  grid-area: grouped;
  justify-self: flex-end;
  margin-right: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  button {
    display: inherit;
    border: 0;
    background: none;
    outline: none;
  }
  .search {
    outline: none;
    margin-right: 10px;
  }
  .cart {
    outline: none;
    margin-left: 10px;
  }
`;

export const Logo = styled.div`
  grid-area: logo;
  justify-self: center;
`;

export const MenuList = styled.ul`
  display: flex;
  flex-direction: column;
  list-style-type: none;
  @media (min-width: 992px) {
    flex-direction: row;
    justify-content: center;
  }
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
  @media (min-width: 992px) {
    width: initial;
    p {
      padding: 0;
    }
    a {
      p {
        border: 0;
      }
    }
  }
`;

export const SearchForm = styled.form`
  display: none;
`;
