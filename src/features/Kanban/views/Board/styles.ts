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
  boxWrapper: {
    flex: "1 1 66%",
    position: "relative",
    overflow: "hidden",
    marginTop: 1,
  },
  menu: {
    backgroundColor: grey.light,
    marginTop: "30px",
  },
};
