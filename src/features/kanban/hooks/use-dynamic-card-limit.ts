import { useState, useEffect } from "react";
import useResponsive from "shared/hooks/use-responsive";

const useWindowHeight = () => {
  const [height, setHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return height;
};

export const useDynamicCardLimit = () => {
  const { isMobileOrTablet } = useResponsive();
  const height = useWindowHeight();

  const getLimit = () => {
    if (height >= 3840) return 9;
    if (height >= 2160) return 7;
    if (height >= 1440) return 6;
    if (height >= 1080) return 5;
    return isMobileOrTablet ? 6 : 5;
  };

  const [limit, setLimit] = useState(getLimit());

  useEffect(() => {
    setLimit(getLimit());
  }, [height]);

  return limit;
};
