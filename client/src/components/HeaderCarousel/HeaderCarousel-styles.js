import styled from "styled-components";

export const StyledCarousel = styled.div`
  .overlay {
    background-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.25),
      rgba(0, 0, 0, 0.25) calc(100% - 150px),
      rgba(0, 0, 0, 0.38) calc(100% - 60px),
      rgba(0, 0, 0, 0.5)
    );
  }
  .carousel-item > img {
    height: 600px;
    width: 100%;
    object-fit: cover;
  }
`;

export const TextOverlay = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  height: 100%;
  width: 100%;
  background-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.25),
    rgba(0, 0, 0, 0.25) calc(100% - 150px),
    rgba(0, 0, 0, 0.38) calc(100% - 60px),
    rgba(0, 0, 0, 0.5)
  );
  h1 {
    text-align: center;
    font-size: 42px;
    color: white;
  }
`;
