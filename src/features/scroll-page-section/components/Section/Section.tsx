import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperEvent from "swiper";
import { Mousewheel } from "swiper/modules";

import { ISectionProp } from "./Section.types";
import CardComponent from "../CardComponent";

import "swiper/css";

const Section: React.FC<ISectionProp> = ({
  sections,
  scrollType,
  onSlideChange,
  activeSection,
}) => {
  const handleSectionSlideChange = (event: SwiperEvent) => {
    if (onSlideChange) onSlideChange(event.activeIndex);
  };

  return (
    <Swiper
      nested
      direction={scrollType}
      speed={900}
      slidesPerView={1}
      initialSlide={activeSection}
      mousewheel={true}
      modules={[Mousewheel]}
      onSlideChange={handleSectionSlideChange}
    >
      {sections.map((section, index) => (
        <SwiperSlide key={index}>
          <CardComponent section={section} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Section;
