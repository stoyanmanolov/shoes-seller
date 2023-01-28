import React, { useState } from "react";
import KidsImage from "./images/KidsImage.jpg";
import MenImage from "./images/MenImage.jpg";
import WomenImage from "./images/WomenImage.jpg";
import {
  Carousel,
  CarouselItem,
  CarouselIndicators,
  CarouselCaption,
} from "reactstrap";
import { Button } from "semantic-ui-react";
import * as Styled from "./HeaderCarousel.styles";
import { Link } from "react-router-dom";

const HeaderCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const items = [
    {
      src: MenImage,
      altText: "Men",
      caption: "",
      header: "Men's Latest",
      buttonText: "SHOP MEN'S",
      route: "/men",
    },
    {
      src: WomenImage,
      altText: "Women",
      caption: "",
      header: "Women's Latest",
      buttonText: "SHOP WOMEN'S",
      route: "/women",
    },
    {
      src: KidsImage,
      altText: "Kids",
      caption: "",
      header: "Kids' Latest",
      buttonText: "SHOP KIDS'",
      route: "/kids",
    },
  ];

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

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slides = items.map((item) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.altText}
      >
        <Styled.Image src={item.src} alt={item.altText} />
        <Styled.TextOverlay>
          <h1>{item.header}</h1>
          <Link to={item.route}>
            <Button>{item.buttonText}</Button>
          </Link>
        </Styled.TextOverlay>
        <CarouselCaption
          captionText={item.caption}
          captionHeader={item.caption}
        />
      </CarouselItem>
    );
  });

  return (
    <Carousel activeIndex={activeIndex} next={next} previous={previous}>
      <CarouselIndicators
        items={items}
        activeIndex={activeIndex}
        onClickHandler={goToIndex}
      />
      {slides}
    </Carousel>
  );
};

export default HeaderCarousel;
