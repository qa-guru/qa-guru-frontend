import { useMediaQuery, useTheme } from "@mui/material";

const useResponsive = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.only("xs"));
  const isMobileOrTablet = useMediaQuery(theme.breakpoints.down("md"));
  const isTablet = useMediaQuery(theme.breakpoints.only("sm"));
  const isDownDesktop = useMediaQuery(theme.breakpoints.down("lg"));
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const isLargeDesktop = useMediaQuery(theme.breakpoints.up(1475));

  return {
    isMobile,
    isMobileOrTablet,
    isTablet,
    isDownDesktop,
    isDesktop,
    isLargeDesktop,
  };
};

export default useResponsive;
