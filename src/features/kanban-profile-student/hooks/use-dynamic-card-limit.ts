import { useState, useEffect } from "react";

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
  const height = useWindowHeight();

  const getLimit = () => {
    if (height >= 3840) return 9;
    if (height >= 2160) return 8;
    if (height >= 1440) return 7;
    if (height >= 1080) return 6;
    return 6;
  };

  const [limit, setLimit] = useState(getLimit());

  useEffect(() => {
    setLimit(getLimit());
  }, [height]);

  return limit;
};
