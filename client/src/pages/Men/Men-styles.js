import styled from "styled-components";

export const StyledMen = styled.div`
  display: grid;
  grid-template-areas:
    "navbar navbar navbar"
    "topbar topbar topbar"
    "filter-menu shoes-list shoes-list";
  grid-template-columns: min-content;

  #navbar {
    grid-area: navbar;
  }

  #topbar {
    grid-area: topbar;
  }

  #filter-menu {
    grid-area: filter-menu;
  }

  #shoes-list {
    grid-area: shoes-list;
  }
`;
