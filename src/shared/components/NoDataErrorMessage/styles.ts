// eslint-disable-next-line import/named
import { Theme } from "@mui/material";

export const style = {
  icon: { display: "flex", justifyContent: "center", pb: "20px" },
  backdropError: { zIndex: (theme: Theme) => theme.zIndex.drawer + 1 },
};
