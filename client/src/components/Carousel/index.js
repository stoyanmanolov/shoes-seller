import React, { useState } from "react";
import MainImage from "./images/MainImage.jpg";
import MenImage from "./images/MenImage.jpg";
import WomenImage from "./images/WomenImage.jpg";
import {
  Carousel,
  CarouselItem,
  CarouselIndicators,
  CarouselCaption
} from "reactstrap";
import { Button } from "semantic-ui-react";
import { StyledCarousel, TextOverlay } from "./Carousel-styles";

const items = [
  {
    src: MainImage,
    altText: "Main",
    caption: "",
    header: "Featured Collection",
    buttonText: "SHOP"
  },
  {
    src: MenImage,
    altText: "Men",
    caption: "",
    header: "Men's Featured",
    buttonText: "SHOP MEN'S"
  },
  {
    src: WomenImage,
    altText: "Women",
    caption: "",
    header: "Women's Featured",
    buttonText: "SHOP WOMEN'S"
  }
];

const HeaderCarousel = props => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = newIndex => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slides = items.map(item => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
      >
        <img src={item.src} alt={item.altText} />
        <TextOverlay>
          <h1>{item.header}</h1>
          <Button id="header-button">{item.buttonText}</Button>
        </TextOverlay>
        <CarouselCaption
          captionText={item.caption}
          captionHeader={item.caption}
        />
      </CarouselItem>
    );
  });

  return (
    <StyledCarousel>
      <Carousel activeIndex={activeIndex} next={next} previous={previous}>
        <CarouselIndicators
          items={items}
          activeIndex={activeIndex}
          onClickHandler={goToIndex}
        />
        {slides}
      </Carousel>
    </StyledCarousel>
  );
};

export default HeaderCarousel;
