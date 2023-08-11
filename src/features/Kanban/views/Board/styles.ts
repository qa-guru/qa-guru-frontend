import { primary, secondary, grey } from "../../../../theme/colors";

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
  menu: {
    backgroundColor: grey.light,
    boxShadow: "0 1px 3px rgba(0, 0, 0, .2)",
    marginTop: 2.5,
  },
};
