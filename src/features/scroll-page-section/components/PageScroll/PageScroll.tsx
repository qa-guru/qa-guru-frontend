import { Box } from "@mui/material";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper/modules";
import SwiperEvent from "swiper";

import { IDataIconsStack } from "./PageScroll.types";
import { style } from "./styles";
import IconsRenderer from "../IconsRenderer";
import Section from "../Section";
import Steps from "../Steps";
import { useLoadedImages } from "../../hooks/useLoadedImages";

const iconImports = import.meta.glob("../../assets/icons/*.svg");

const PageScroll: React.FC<IDataIconsStack> = ({ pages }) => {
  const [activePageIndex, setActivePageIndex] = useState(0);
  const [activeSection, setActiveSection] = useState(0);
  const loadedIcons = useLoadedImages(iconImports);

  const allSteps = pages.map((page) =>
    page.sections.map((section) => section.step)
  );

  const handleSectionSlideChange = (index: number) => {
    setActiveSection(index);
  };

  const handlePageSlideChange = (event: SwiperEvent) => {
    setActivePageIndex(event.activeIndex);

    if (event.activeIndex < activePageIndex) {
      setActiveSection(pages[event.activeIndex].sections.length - 1);
    } else {
      setActiveSection(0);
    }
  };

  return (
    <Box sx={style.container}>
      <Box sx={style.fixedIcons}>
        <IconsRenderer
          icons={pages[activePageIndex].sections[activeSection].icons}
          loadedIcons={loadedIcons}
        />
        <Steps
          steps={allSteps}
          activePage={activePageIndex}
          activeStep={activeSection}
          loadedIcons={loadedIcons}
        />
      </Box>
      <Swiper
        nested
        direction="vertical"
        slidesPerView={1}
        initialSlide={activePageIndex}
        speed={900}
        mousewheel={true}
        modules={[Mousewheel]}
        onSlideChange={handlePageSlideChange}
      >
        {pages.map((page, pageIndex) => (
          <SwiperSlide key={pageIndex}>
            <Box sx={style.sectionContainer}>
              <Section
                sections={page.sections}
                scrollType={page.scrollType}
                activeSection={activeSection}
                onSlideChange={handleSectionSlideChange}
              />
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default PageScroll;
