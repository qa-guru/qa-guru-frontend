import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperEvent from "swiper";
import { Mousewheel } from "swiper/modules";

import { ISectionProp } from "./section.types";
import CardComponent from "../card-component";

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
        <SwiperSlide key={index} style={{ padding: "0 10px" }}>
          <CardComponent section={section} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Section;
