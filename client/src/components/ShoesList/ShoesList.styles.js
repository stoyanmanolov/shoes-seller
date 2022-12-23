import styled from "styled-components";
import { Dropdown as SemanticDropdown } from "semantic-ui-react";
import { Pagination as MUIPagination } from "@material-ui/lab";

export const ShoesList = styled.div`
  padding: 10px;
  @media (min-width: 768px) {
    margin-left: 20px;
    margin-right: 20px;
    padding: 10px 0 10px 10px;
    .dropdown-list {
      width: initial;
    }
  }
`;

export const Dropdown = styled(SemanticDropdown)`
  width: 100%;
`;

export const List = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
  @media (min-width: 576px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (min-width: 1200px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

export const Pagination = styled(MUIPagination)`
  display: flex;
  justify-content: center;
`;
