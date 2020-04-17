import styled from "styled-components";

export const StyledFilterMenu = styled.div`
  .button-wrapper {
    margin: 10px;
  }
  .filter-button {
    margin: 0px;
    width: 100%;
  }
  @media (min-width: 768px) {
    .filter-button {
      display: none;
    }
  }
`;

export const FilterList = styled.ul`
  display: none;
  height: 100%;
  width: 200px;
  margin-left: 20px;
  padding: 10px;
  li {
    list-style-type: none;
  }
  @media (min-width: 768px) {
    display: inherit;
  }
  @media (min-width: 992px) {
    width: 300px;
  }
`;

export const FilterSection = styled.li`
  display: grid;
  align-items: center;
  justify-content: space-between;
  grid-template-areas:
    "title icon"
    "info info";
  padding: 15px 0;
  width: 100%;
  border-bottom: ${({ clicked }) => !clicked && "1px solid lightgrey"};
  cursor: pointer;
  .title {
    margin: 0;
    grid-area: title;
    font-size: 16px;
    font-weight: 700;
  }
  .chevron {
    grid-area: icon;
  }
  :last-child {
    border: 0;
  }
`;

export const FilterOption = styled.li`
  display: flex;
  .title {
    margin: 0 10px;
  }
  .count {
    color: #575757;
  }
`;
