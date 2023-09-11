import { primary, secondary } from "../../../../theme/colors";

export const style = {
  pagination: {
    "& .MuiPaginationItem-root": {
      margin: "0 6px",
      color: "transparent",
    },
    "& .MuiPaginationItem-root.MuiPaginationItem-circular": {
      backgroundColor: secondary.main,
    },
    "& .MuiPaginationItem-root.MuiPaginationItem-circular.Mui-selected": {
      backgroundColor: primary.main,
      color: "transparent",
    },
  },
};
