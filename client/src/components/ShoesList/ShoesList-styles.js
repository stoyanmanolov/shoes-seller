import styled from "styled-components";

export const StyledShoesList = styled.div`
  padding: 10px;
  .dropdown-list {
    width: 100%;
  }
  @media (min-width: 768px) {
    margin-left: 20px;
    padding: 10px 0 10px 10px;
    .dropdown-list {
      width: initial;
    }
  }
`;

export const List = styled.div`
  margin-top: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  .card-image {
    object-fit: cover;
    height: 300px;
    width: 100%;
  }
  @media (min-width: 768px) {
    margin-right: 20px;
  }
  @media (min-width: 1200px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;
