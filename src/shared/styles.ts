// eslint-disable-next-line import/named
import { Theme } from "@mui/material";

export const style = {
  backdrop: {
    color: "#fff",
    zIndex: (theme: Theme) => theme.zIndex.drawer + 1,
  },
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  content: {
    flexGrow: 1,
  },
  icon: { display: "flex", justifyContent: "center", pb: "20px" },
  backdropError: { zIndex: (theme: Theme) => theme.zIndex.drawer + 1 },
  gridSpinner: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
};
